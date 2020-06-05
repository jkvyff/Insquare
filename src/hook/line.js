import React from "react";

const Line = ({ line }) => {
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
        transform="translate(200 100)"
      />
    </>
  );
};

export default Line;
