import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import YmlInstructions from "src/client/yml/YmlInstructions";

test("should render headers", async () => {
  const { getByText } = render(<YmlInstructions />)

  expect(getByText("Как это работает:")).toBeInTheDocument();
});


