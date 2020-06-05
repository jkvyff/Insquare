import React from "react";

const Square = ({ square, strokeWidth }) => {
  const { a, b, c, d } = square;
  console.log(square);

  return (
    <>
      <line
        x1={a[0]}
        y1={a[1]}
        x2={b[0]}
        y2={b[1]}
        strokeWidth={strokeWidth}
        stroke="black"
        transform="translate(200 100)"
      />
      <line
        x1={b[0]}
        y1={b[1]}
        x2={c[0]}
        y2={c[1]}
        strokeWidth={strokeWidth}
        stroke="black"
        transform="translate(200 100)"
      />
      <line
        x1={c[0]}
        y1={c[1]}
        x2={d[0]}
        y2={d[1]}
        strokeWidth={strokeWidth}
        stroke="black"
        transform="translate(200 100)"
      />
      <line
        x1={d[0]}
        y1={d[1]}
        x2={a[0]}
        y2={a[1]}
        strokeWidth={strokeWidth}
        stroke="black"
        transform="translate(200 100)"
      />
    </>
  );
};

export default Square;
