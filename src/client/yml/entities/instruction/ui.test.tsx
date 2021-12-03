import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
 
import { YmlInstructions } from ".";

test("should render headers", async () => {
  const { getByText } = render(<YmlInstructions />);

  expect(getByText("Как это работает:")).toBeInTheDocument();
});
