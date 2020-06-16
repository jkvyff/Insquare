import React from "react";

const Line = ({ line, transform }) => {
  const { ax, ay, bx, by } = line;
  return (
    <>
      <line
        x1={ax}
        y1={ay}
        x2={bx}
        y2={by}
        strokeWidth=".1"
        stroke="cyan"
        transform={transform}
      />
    </>
  );
};

export default Line;
