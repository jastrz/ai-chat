import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ImageContent from "./ImageContent";
import { screen } from "@testing-library/react";

describe("ImageContent", () => {
  test("renders hidden content", () => {
    const imageData = "sampleImageData";
    render(<ImageContent index={1} data={imageData} />);

    // Check if image is rendered
    const imageElement = screen.getByAltText("");
    expect(imageElement).toBeInTheDocument();

    // Simulate mouseover to show hidden item
    fireEvent.mouseOver(imageElement);
    const hiddenItem = screen.getByTestId("hidden");
    expect(hiddenItem).toBeVisible();
  });
});
