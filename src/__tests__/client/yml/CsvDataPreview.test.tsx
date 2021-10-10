import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import CsvDataPreview from "src/client/yml/CsvDataPreview";
import { Link } from "src/declarations";

const customRender = async (
  ui: any,
  { providerProps, ...renderOptions }: any = {}
) => {
  return await act(async () => {
    render(ui, renderOptions);
  });
};

const mockDataCorrect: Link[] = [
  { name: "Бобруйск", url: "https://link.to", areaExternalId: "babryisk" },
];

test("should render headers", async () => {
  await customRender(<CsvDataPreview ymlTable={mockDataCorrect} />);

  expect(screen.getByText("areaExternalId")).toBeInTheDocument();
  expect(screen.getByText("name")).toBeInTheDocument();
  expect(screen.getByText("url")).toBeInTheDocument();
});

test("should passed elements if passed correct CSV", async () => {
  await customRender(<CsvDataPreview ymlTable={mockDataCorrect} />);

  expect(screen.getByText("Бобруйск")).toBeInTheDocument();
  expect(screen.getByText("https://link.to")).toBeInTheDocument();
  expect(screen.getByText("babryisk")).toBeInTheDocument();
});
