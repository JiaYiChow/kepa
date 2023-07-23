import React, { useEffect, useState } from "react";
import "./Ellipse.css";

export default function Ellipse({ id, activeNotes, cx, cy, rx, ry }) {
  const [className, setClassName] = useState("notPressed");

  const handleMouseOver = () => {
    setClassName("pressed");
  };

  const handleMouseLeave = () => {
    setClassName("notPressed");
  };

  useEffect(() => {
    const name = activeNotes.includes(id) ? "pressed" : "notPressed";
    setClassName(name);
  }, [activeNotes]);

  return (
    <ellipse
      id={id}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={className}
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
    />
  );
}
