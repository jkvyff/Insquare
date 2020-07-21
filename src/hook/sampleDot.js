import React from "react";

const Jordan = ({ id, cx, cy, transform, pointScale }) => {
  return (
    <>
      <circle
        id={id}
        cx={cx}
        cy={cy}
        r={pointScale}
        fill="blue"
        transform={transform}
      />
    </>
  );
};

export default Jordan;
