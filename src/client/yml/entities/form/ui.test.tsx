import React from "react";
import { render, fireEvent, act, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";

import YmlForm from "src/client/yml/entities/form/ui";
import { YmlFormProps } from ".";

jest.mock("axios");

const name = "Санкт-Петербург";

const mockYmlProps: YmlFormProps = {
  parseCsv: jest.fn().mockResolvedValue([
    {
      areaExternalId: "1",
      name,
      url: "myLink",
    },
  ]),
  sendData: jest.fn(),
  setYmlTable: jest.fn(),
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const inValidCsvString = `region_id;name;xml
1;Санкт-Петербург;myLink`;

const validCsvString = `areaExternalId;name;url
1;Санкт-Петербург;myLink`;

const setUpYmlForm = (props: YmlFormProps = mockYmlProps) => {
  const { parseCsv, sendData } = props;

  let component!: RenderResult;

  act(() => {
    component = render(
      <YmlForm parseCsv={parseCsv} sendData={sendData} setYmlTable={jest.fn} />
    );
  });

  const queryByLabelText = (searchString: string) =>
    component.queryByLabelText(searchString);

  const queryByText = (searchString: string) =>
    component.queryByText(searchString);

  return {
    component,
    queryByLabelText,
    queryByText,
  };
};

const changeInput = (input: HTMLElement, value: string | number | File) => {
  const newValueStringOrNumber = {
    target: { value: value },
  };

  const newValueFile = {
    target: { files: [value] },
  };

  act(() => {
    fireEvent.change(
      input,
      value instanceof File ? newValueFile : newValueStringOrNumber
    );
  });
};

const FileInputLabel = "Файл с фидами";
const BrandInputLabel = "Системное имя бренда";
const SubmitBtnText = "Загрузить фиды";
const ExternalSystemLabel = "Индетификатор внешней системы";
const PeriodLabel = "Период загрузки";

describe("Rendering of form inputs", () => {
  test("should render fileInput", async () => {
    const { queryByLabelText } = setUpYmlForm();

    expect(queryByLabelText(FileInputLabel)).toBeInTheDocument();
  });

  test("should call parseCsv on file update", async () => {
    const csvFile = new File([validCsvString], "table.csv", {
      type: "text/csv",
    });

    const { queryByLabelText } = setUpYmlForm();

    const fileInput = queryByLabelText(FileInputLabel);

    if (fileInput) {
      changeInput(fileInput, csvFile);
    }
    expect((mockYmlProps.parseCsv as jest.Mock).mock.calls[0][0].name).toBe(
      "table.csv"
    );
  });

  test("should render brandInput", async () => {
    const { queryByLabelText } = setUpYmlForm();

    expect(queryByLabelText(SubmitBtnText)).toBeInTheDocument();
  });

  test("should change value of brandInput", async () => {
    const { queryByLabelText } = setUpYmlForm();

    const brand = queryByLabelText(SubmitBtnText);

    if (brand) {
      changeInput(brand, "newBrand");
    }

    expect(brand).toHaveValue("newBrand");
  });

  test("should render externalSystemInput", async () => {
    const { queryByLabelText } = setUpYmlForm();

    expect(queryByLabelText(ExternalSystemLabel)).toBeInTheDocument();
  });

  test("should render externalSystemInput with default value", async () => {
    const { queryByLabelText } = setUpYmlForm();

    expect(queryByLabelText(ExternalSystemLabel)).toHaveValue("Website");
  });

  test("should change value of externalSystemInput", async () => {
    const { queryByLabelText } = setUpYmlForm();

    const input = queryByLabelText(ExternalSystemLabel);

    if (input) {
      changeInput(input, "backend");
    }

    expect(input).toHaveValue("backend");
  });

  test("should render launchPeriodInput", async () => {
    const { queryByLabelText } = setUpYmlForm();

    expect(queryByLabelText(PeriodLabel)).toBeInTheDocument();
  });

  test("should change value of launchPeriodInput", async () => {
    const { queryByLabelText } = setUpYmlForm();

    const input = queryByLabelText(PeriodLabel);

    if (input) {
      changeInput(input, 3);
    }

    expect(input).toHaveValue(3);
  });

  test("should render launchPeriodInput with default value", async () => {
    const { queryByLabelText } = setUpYmlForm();

    expect(queryByLabelText(PeriodLabel)).toHaveValue(2);
  });
});

describe("sendData", () => {
  test("When all fields filledin, should pass their data", async () => {
    const csvFile = new File([validCsvString], "table.csv", {
      type: "text/csv",
    });

    const { queryByLabelText, queryByText } = setUpYmlForm();

    const fileInput = queryByLabelText(FileInputLabel);
    const brand = queryByLabelText(BrandInputLabel);
    const btn = queryByText(SubmitBtnText);

    const login = queryByLabelText("Логин");
    const password = queryByLabelText("Пароль");

    if (fileInput && brand && login && password) {
      changeInput(fileInput, csvFile);
      changeInput(brand, "myBrand");
      changeInput(login, "login");
      changeInput(password, "pass");
    }

    await delay(500);

    if (btn) {
      fireEvent.click(btn);
    }

    expect(mockYmlProps.sendData).toHaveBeenCalledWith({
      authParams: {
        password: "pass",
        username: "login",
      },
      links: [{ areaExternalId: "1", name, url: "myLink" }],
      settings: {
        brand: "myBrand",
        externalSystem: "Website",
        launchPeriod: 2,
      },
    });
  });
  test("When filled only required fields, other empty", async () => {
    const csvFile = new File([validCsvString], "table.csv", {
      type: "text/csv",
    });

    const { queryByLabelText, queryByText } = setUpYmlForm();

    const fileInput = queryByLabelText(FileInputLabel);
    const brand = queryByLabelText(BrandInputLabel);
    const btn = queryByText(SubmitBtnText);

    if (fileInput && brand) {
      changeInput(fileInput, csvFile);
      changeInput(brand, "myBrand");
    }

    await delay(500);

    if (btn) {
      fireEvent.click(btn);
    }

    expect(mockYmlProps.sendData).toHaveBeenCalledWith({
      authParams: {
        password: "",
        username: "",
      },
      links: [{ areaExternalId: "1", name, url: "myLink" }],
      settings: {
        brand: "myBrand",
        externalSystem: "Website",
        launchPeriod: 2,
      },
    });
  });
  test("should render error message if csv incorrect", async () => {
    const mockYmlProps: YmlFormProps = {
      parseCsv: jest.fn().mockResolvedValue([
        {
          areaExternalId: undefined,
          name,
          url: undefined,
        },
      ]),
      sendData: jest.fn(),
      setYmlTable: function (): void {
        throw new Error("Function not implemented.");
      },
    };

    const csvFile = new File([inValidCsvString], "table.csv", {
      type: "text/csv",
    });

    const { queryByLabelText, queryByText } = setUpYmlForm(mockYmlProps);

    const fileInput = queryByLabelText(FileInputLabel);
    const brand = queryByLabelText(SubmitBtnText);
    const btn = queryByText("Загрузить фиды");

    if (fileInput && brand) {
      changeInput(fileInput, csvFile);
      changeInput(brand, "myBrand");
    }

    await delay(500);

    if (btn) {
      fireEvent.click(btn);
    }

    expect(queryByText("Загружен некорректный файл")).toBeInTheDocument();
  });
});
