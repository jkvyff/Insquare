import React from "react";

const Line = ({ line, transform }) => {
  const { a, b } = line;
  return (
    <>
      <line
        x1={a[0]}
        y1={a[1]}
        x2={b[0]}
        y2={b[1]}
        strokeWidth=".1"
        stroke="cyan"
        transform={transform}
      />
    </>
  );
};

export default Line;
