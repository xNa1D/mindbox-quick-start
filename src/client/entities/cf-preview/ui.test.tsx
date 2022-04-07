import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import React from "react";
import { columns } from "src/client/pages/custom-fields";
import { CustomFieldObject } from "src/server/custom-fields";
import { CfPreview } from "./ui";

const customRender = async (ui: React.ReactElement) => {
  return await act(async () => {
    render(ui);
  });
};

const data: CustomFieldObject[] = [
  {
    CustomFieldEntity: "Entity",
    CustomFieldName: "Name",
    CustomFieldSystemName: "SystemName",
    CustomFieldValueTypes: "ValueTypes",
    isClearable: "false",
    isMultiple: "true",
    isPublic: "false",
  },
];

describe("CfPreview", () => {
  test("When render table, should render headers", async () => {
    await customRender(<CfPreview columns={columns} data={data} />);

    expect(screen.getByText(columns[0].header as string)).toBeInTheDocument();
    expect(
      screen.getByText(columns[1].header as string)
    ).toBeInTheDocument();
    expect(
      screen.getByText(columns[2].header as string)
    ).toBeInTheDocument();
    expect(
      screen.getByText(columns[3].header as string)
    ).toBeInTheDocument();
    expect(
      screen.getByText(columns[4].header as string)
    ).toBeInTheDocument();
    expect(
      screen.getByText(columns[5].header as string)
    ).toBeInTheDocument();
    expect(
      screen.getByText(columns[6].header as string)
    ).toBeInTheDocument();
  });

  test("When pass CSV data, should render passed elements", async () => {
    await customRender(<CfPreview columns={columns} data={data} />);

    expect(screen.getByText(data[0].CustomFieldEntity)).toBeInTheDocument();
    expect(screen.getByText(data[0].CustomFieldName)).toBeInTheDocument();
    expect(screen.getByText(data[0].CustomFieldSystemName)).toBeInTheDocument();
    expect(screen.getByText(data[0].CustomFieldValueTypes)).toBeInTheDocument();
  });
});
