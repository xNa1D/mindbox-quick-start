import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import React from "react";
import { CustomFieldObject } from "src/server/custom-fields";
import { column } from "../csv-instruction";
import { CfPreview } from "./ui";

const customRender = async (ui: React.ReactElement) => {
  return await act(async () => {
    render(ui);
  });
};

const columns: column[] = [
  { header: "CustomFieldEntity", description: "Сущность", isRequired: true },
  { header: "CustomFieldName", description: "Название", isRequired: true },
  {
    header: "CustomFieldSystemName",
    description: "Системное имя",
    isRequired: true,
  },
  {
    header: "CustomFieldValueTypes",
    description: "Тип данных",
    isRequired: true,
  },
  {
    header: "isClearable",
    description: "Очищать, если не передано",
    isRequired: true,
  },
  { header: "isMultiple", description: "Множественное", isRequired: true },
  { header: "isPublic", description: "Публичное", isRequired: true },
];

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

    expect(screen.getByText(columns[0].description as string)).toBeInTheDocument();
    expect(
      screen.getByText(columns[1].description as string)
    ).toBeInTheDocument();
    expect(
      screen.getByText(columns[2].description as string)
    ).toBeInTheDocument();
    expect(
      screen.getByText(columns[3].description as string)
    ).toBeInTheDocument();
    expect(
      screen.getByText(columns[4].description as string)
    ).toBeInTheDocument();
    expect(
      screen.getByText(columns[5].description as string)
    ).toBeInTheDocument();
    expect(
      screen.getByText(columns[6].description as string)
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
