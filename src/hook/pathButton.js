import React from "react";

const PathButton = ({ viewbox, path, setDPath, setDPathTemp }) => {
  return (
    <>
      <div
        className="s-button"
        onClick={() => {
          setDPath(path);
          setDPathTemp(path);
        }}
      >
        <svg viewBox={viewbox} width="38" height="38">
          <path fill="#FF0066" d={path} />
        </svg>
      </div>
    </>
  );
};

export default PathButton;
