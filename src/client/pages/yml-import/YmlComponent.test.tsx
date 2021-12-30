import React from "react";
import {
  render,
  fireEvent,
  act,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import YmlComponent from "src/client/pages/yml-import/YmlComponent";

jest.mock("axios");

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

//TODO: add test for invalid csv
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const inValidCsvString = `region_id;name;xml
1;Санкт-Петербург;myLink`;

const validCsvString = `areaExternalId;name;url
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

  expect(component.queryAllByText("areaExternalId")).toHaveLength(2);
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
