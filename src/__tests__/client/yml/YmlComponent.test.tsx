import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import YmlComponent from "src/client/yml/YmlComponent";
import { YmlFormProps } from "src/declarations";

jest.mock("axios");

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const inValidCsvString = `region_id;name;xml
1;Санкт-Петербург;myLink`;

const validCsvString = `externalId;name;url
1;Санкт-Петербург;myLink`;

const setUpComponent = () => {
  let component!: RenderResult;

  act(() => {
    component = render(<YmlComponent />);
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

test("should render info message", () => {
  const { queryByText } = setUpComponent();

  expect(queryByText("Проверьте данные")).toBeInTheDocument();
});

test("should render header of table", () => {
  const { component } = setUpComponent();

  expect(component.queryAllByText("externalId")).toHaveLength(2);
});

test("should render imported file", async () => {
  const csvFile = new File([validCsvString], "table.csv", {
    type: "text/csv",
  });

  const { queryByText, queryByLabelText } = setUpComponent();

  const fileInput = queryByLabelText("Файл с фидами");

  if (fileInput) {
    changeInput(fileInput, csvFile);
  }

  await delay(500);

  expect(queryByText("myLink")).toBeInTheDocument();
});
