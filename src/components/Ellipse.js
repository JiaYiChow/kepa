import React, { useEffect, useState } from "react";
import "./Ellipse.css";
export default function Ellipse({ id, handlePressed, cx, cy, rx, ry }) {
  const [className, setClassName] = useState("notPressed");

  const handleMouseOver = () => {
    setClassName("pressed");
  };

  const handleMouseLeave = () => {
    setClassName("notPressed");
  };

  useEffect(() => {
    const className = handlePressed.includes(id) ? "pressed" : "notPressed";
    setClassName(className);
  }, [handlePressed]);

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

export function Note() {
  return <div></div>;
}
