import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import YmlForm from "src/client/yml/YmlForm";
import { YmlFormProps } from "src/declarations";
import { resolve } from "path";

jest.mock("axios");

const mockYmlProps: YmlFormProps = {
  parseCsv: jest.fn().mockResolvedValue([
    {
      externalId: "1",
      name: "Санкт-Петербург",
      url: "myLink",
    },
  ]),
  sendData: jest.fn(),
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const inValidCsvString = `region_id;name;xml
1;Санкт-Петербург;myLink`;

const validCsvString = `externalId;name;url
1;Санкт-Петербург;myLink`;

const setUpYmlForm = (props: YmlFormProps = mockYmlProps) => {
  const { parseCsv, sendData } = props;

  let component!: RenderResult;
  act(() => {
    component = render(<YmlForm parseCsv={parseCsv} sendData={sendData} />);
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

describe("Rendering of form inputs", () => {
  test("should render fileInput", async () => {
    const { queryByLabelText } = setUpYmlForm();

    expect(queryByLabelText("Файл с фидами")).toBeInTheDocument();
  });

  test("should call parseCsv on file update", async () => {
    const csvFile = new File([validCsvString], "table.csv", {
      type: "text/csv",
    });

    const { queryByLabelText } = setUpYmlForm();

    const fileInput = queryByLabelText("Файл с фидами");

    if (fileInput) {
      changeInput(fileInput, csvFile);
    }

    expect(mockYmlProps.parseCsv.mock.calls[0][0].name).toBe("table.csv");
  });

  test("should render brandInput", async () => {
    const { queryByLabelText } = setUpYmlForm();

    expect(queryByLabelText("Системное имя бренда")).toBeInTheDocument();
  });

  test("should change value of brandInput", async () => {
    const { queryByLabelText } = setUpYmlForm();

    const brand = queryByLabelText("Системное имя бренда");

    if (brand) {
      changeInput(brand, "newBrand");
    }

    expect(brand).toHaveValue("newBrand");
  });

  test("should render externalSystemInput", async () => {
    const { queryByLabelText } = setUpYmlForm();

    expect(
      queryByLabelText("Индетификатор внешней системы")
    ).toBeInTheDocument();
  });

  test("should render externalSystemInput with default value", async () => {
    const { queryByLabelText } = setUpYmlForm();

    expect(queryByLabelText("Индетификатор внешней системы")).toHaveValue(
      "Website"
    );
  });

  test("should change value of externalSystemInput", async () => {
    const { queryByLabelText } = setUpYmlForm();

    const input = queryByLabelText("Индетификатор внешней системы");

    if (input) {
      changeInput(input, "backend");
    }

    expect(input).toHaveValue("backend");
  });

  test("should render launchPeriodInput", async () => {
    const { queryByLabelText } = setUpYmlForm();

    expect(queryByLabelText("Период загрузки")).toBeInTheDocument();
  });

  test("should change value of launchPeriodInput", async () => {
    const { queryByLabelText } = setUpYmlForm();

    const input = queryByLabelText("Период загрузки");

    if (input) {
      changeInput(input, 3);
    }

    expect(input).toHaveValue(3);
  });

  test("should render launchPeriodInput with default value", async () => {
    const { queryByLabelText } = setUpYmlForm();

    expect(queryByLabelText("Период загрузки")).toHaveValue(2);
  });
});

describe("On form submit", () => {
  test("should call sendData", async () => {
    const csvFile = new File([validCsvString], "table.csv", {
      type: "text/csv",
    });

    const { queryByLabelText, queryByText, component } = setUpYmlForm();

    const fileInput = queryByLabelText("Файл с фидами");
    const brand = queryByLabelText("Системное имя бренда");
    const btn = queryByText("Загрузить фиды");

    if (fileInput && brand) {
      changeInput(fileInput, csvFile);
      changeInput(brand, "myBrand");
    }

    await delay(500);
    
    if (btn) {
      fireEvent.click(btn);
    }

    expect(mockYmlProps.sendData).toHaveBeenCalledWith({
      authParams: undefined,
      links: [{ externalId: "1", name: "Санкт-Петербург", url: "myLink" }],
      settings: {
        brand: "myBrand",
        externalSystem: "Website",
        launchPeriod: 2,
      },
    });
  });
  //  test("should render error message if csv incorrect", async () => {
  //    const csvFile = new File([inValidCsvString], "table.csv", {
  //      type: "text/csv",
  //    });

  //    const { queryByLabelText, queryByText } = setUpYmlForm();

  //    const fileInput = queryByLabelText("Файл с фидами");
  //    const btn = queryByText("Загрузить фиды");

  //    if (fileInput) {
  //      changeInput(fileInput, csvFile);
  //    }

  //    if (btn) {
  //      fireEvent.click(btn)
  //    }

  //    expect(queryByText("Загружен некорректный файл")).toBeInTheDocument();
  //  });
});
