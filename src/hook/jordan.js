import React from "react";

const Jordan = ({ dPath, transform }) => {
  return (
    <>
      <path fill="#FF0066" d={dPath} transform={transform} />
    </>
  );
};

export default Jordan;
