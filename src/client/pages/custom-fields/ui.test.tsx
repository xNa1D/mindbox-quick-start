import React from "react";
import { render, fireEvent, act, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";

import { CustomFields } from ".";

import { startCf } from "client/shared/api/startCF";

jest.mock("axios");
jest.mock("client/shared/api/startCF");

const FileInputLabel = "Файл с доп полями";
const btnText = "Запустить заведение доп полей";

const csvString = `CustomFieldEntity;CustomFieldName;CustomFieldSystemName;CustomFieldValueTypes;isClearable;isMultiple;isPublic
Entity;Name;SystemName;ValueTypes;false;true;false`;

const csvFile = new File([csvString], "table.csv", {
  type: "text/csv",
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const setUp = () => {
  let component!: RenderResult;

  act(() => {
    component = render(<CustomFields />);
  });

  return {
    component,
  };
};

const inputFile = (input: HTMLElement, value: string | number | File) => {
  const file = {
    target: { files: [value] },
  };

  act(() => {
    fireEvent.change(input, file);
  });
};

describe("CustomFields", () => {
  test("should render file input", async () => {
    const { component } = setUp();

    expect(component.queryByLabelText(FileInputLabel)).toBeInTheDocument();
  });

  test("When csv is filled, should render data from file", async () => {
    const { component } = setUp();

    const fileInput = component.getByLabelText(FileInputLabel);

    inputFile(fileInput, csvFile);

    await delay(500);

    expect(component.getByText("SystemName")).toBeInTheDocument();
  });
});

describe("sendData", () => {
  test("When all fields filled, should pass their data", async () => {
    const { component } = setUp();

    const fileInput = component.getByLabelText(FileInputLabel);
    const btn = component.getByText(btnText);

    inputFile(fileInput, csvFile);

    await delay(500);

    if (btn) {
      fireEvent.click(btn);
    }

    expect(startCf).toHaveBeenCalledWith([
      {
        CustomFieldEntity: "Entity",
        CustomFieldName: "Name",
        CustomFieldSystemName: "SystemName",
        CustomFieldValueTypes: "ValueTypes",
        isClearable: "false",
        isMultiple: "true",
        isPublic: "false",
      },
    ]);
  });
});
