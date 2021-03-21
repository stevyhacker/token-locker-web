import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders deposit button", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Deposit/i);
  expect(linkElement).toBeInTheDocument();
});
