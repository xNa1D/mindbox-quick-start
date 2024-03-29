import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import CsvDataPreview from "./ui";
import { Link } from "../../yml/form";


const customRender = async (
  ui: any,
  { renderOptions }: any = {}
) => {
  return await act(async () => {
    render(ui, renderOptions);
  });
};

const mockDataCorrect: Link[] = [
  { name: "Бобруйск", url: "https://link.to", areaExternalId: "babryisk" },
];

describe("CsvDataPreview", () => {
  test("When render table, should render headers", async () => {
    await customRender(<CsvDataPreview ymlTable={mockDataCorrect} />);

    expect(screen.getByText("areaExternalId")).toBeInTheDocument();
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("url")).toBeInTheDocument();
  });

  test("When pass CSV data, should render passed elements", async () => {
    await customRender(<CsvDataPreview ymlTable={mockDataCorrect} />);

    expect(screen.getByText("Бобруйск")).toBeInTheDocument();
    expect(screen.getByText("https://link.to")).toBeInTheDocument();
    expect(screen.getByText("babryisk")).toBeInTheDocument();
  });
});
