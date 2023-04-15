import { useEffect, useState } from "react";
import "./Position.css";

export default function Position({
  id,
  position,
  onPositionChange,
  width,
  height,
  x,
  y,
}) {
  const [className, setClassName] = useState("nonActive");
  useEffect(() => {
    const className = onPositionChange === position ? "active" : "nonActive";
    setClassName(className);
  }, [onPositionChange]);

  return (
    <rect
      id={id}
      position={position}
      className={className}
      width={width}
      height={height}
      x={x}
      y={y}
    />
  );
}
