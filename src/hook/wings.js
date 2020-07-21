import React from "react";

const Wings = ({
  line,
  wings,
  showLWings,
  showRWings,
  transform,
  pointScale,
  lineScale,
}) => {
  const { a, b } = line;
  const { left, right } = wings;
  // const colors = [
  //   "#363f9c",
  //   "#464096",
  //   "#564190",
  //   "#66438a",
  //   "#764483",
  //   "#86457d",
  //   "#954777",
  //   "#a54871",
  //   "#b5496b",
  //   "#c54a64",
  //   "#d54b5e",
  //   "#e54d58",
  //   "#f54e52",
  // ];
  return (
    <>
      {showLWings && (
        <>
          <line
            x1={a[0]}
            y1={a[1]}
            x2={left[0]}
            y2={left[1]}
            strokeWidth={lineScale}
            stroke="purple"
            transform={transform}
          />
          <circle
            cx={left[0]}
            cy={left[1]}
            r={pointScale}
            fill="purple"
            transform={transform}
          />
          {/* <line
        x1={b[0]}
        y1={b[1]}
        x2={left[0]}
        y2={left[1]}
        strokeWidth={lineScale}
        stroke="green"
        transform={transform}
      /> */}
        </>
      )}
      {showRWings && (
        <>
          <line
            x1={a[0]}
            y1={a[1]}
            x2={right[0]}
            y2={right[1]}
            strokeWidth={lineScale}
            stroke="blue"
            transform={transform}
          />
          <circle
            cx={right[0]}
            cy={right[1]}
            r={pointScale}
            fill="blue"
            transform={transform}
          />
          {/* <line
        x1={b[0]}
        y1={b[1]}
        x2={right[0]}
        y2={right[1]}
        strokeWidth={lineScale}
        stroke="green"
        transform={transform}
      /> */}
        </>
      )}
    </>
  );
};

export default Wings;
