import React from "react";

const PathButton = ({ viewbox, path, setDPath }) => {
  return (
    <>
      <button onClick={() => setDPath(path)}>
        <svg viewBox={viewbox} width="38" height="38">
          <path fill="#FF0066" d={path} />
        </svg>
      </button>
    </>
  );
};

export default PathButton;
