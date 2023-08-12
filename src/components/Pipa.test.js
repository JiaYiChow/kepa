import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "../components/Pipa.css";
import Pipa from "./Pipa";

describe("page is rendered", () => {
  it("Pipa icon should appear", () => {
    render(<Pipa />);
    const pointer = screen.getByTestId("image");
    expect(pointer).toBeVisible();
    screen.debug();
  });

  it("On hover, the notes should be visible", () => {
    render(<Pipa />);
    const pointer = screen.getByTestId("pointer");
    userEvent.hover(pointer);
    expect(pointer).toHaveClass("pressed");
    expect(pointer).toHaveStyle(`fill: #241c1c`);
  });
});
