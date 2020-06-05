import React from "react";

const Jordan = ({ id, cx, cy }) => {
  return (
    <>
      <circle
        id={id}
        cx={cx}
        cy={cy}
        r=".5"
        fill="blue"
        transform="translate(200 100)"
      />
    </>
  );
};

export default Jordan;
