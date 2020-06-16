import React from "react";

const Jordan = ({ id, cx, cy, transform }) => {
  return (
    <>
      <circle
        id={id}
        cx={cx}
        cy={cy}
        r=".5"
        fill="blue"
        transform={transform}
      />
    </>
  );
};

export default Jordan;
