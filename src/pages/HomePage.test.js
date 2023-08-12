import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "../components/Pipa.css";
import { PipaNotes } from "../constants/Notes";
import HomePage from "./HomePage";

describe("HomePage is rendered", () => {
  it("Pipa icon should appear", () => {
    render(<HomePage />);
    const pointer = screen.getByTestId("pointer");
    expect(pointer).toBeVisible();
    //TODO another test where when you hover the buttons should appear with the colour
    screen.debug();
  });

  it("On hover, the notes should be visible", () => {
    render(<HomePage />);
    const pointer = screen.getByTestId("pointer");
    userEvent.hover(pointer);
    expect(pointer).toHaveClass("pressed");
    expect(pointer).toHaveStyle(`fill: #241c1c`);
  });
});

describe("Keyboard event is pressed", () => {
  it("Valid keyboard event returns note object", () => {
    expect(PipaNotes.getEnumByEvent("q")).toEqual({
      event: "q",
      soundFile: "assets/sounds/A2.m4a",
    });
  });

  it("Invalid keyboard event should not return anything", () => {
    expect(PipaNotes.getEnumByEvent("Q")).toBeUndefined();
  });
});
