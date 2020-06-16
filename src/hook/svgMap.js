import React, { useState } from "react";
import Jordan from "./jordan";
import SampleDot from "./sampleDot";
import Line from "./line";
import Wings from "./wings";
import Square from "./square";

const SVGMap = ({
  svgGeom,
  dPath,
  nodes,
  lines,
  wings,
  squares,
  showLines,
  showWings,
}) => {
  const [matrix, setMatrix] = useState([2, 0, 0, 2, 200, 200]);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const pan = (dx, dy) => {
    const m = [...matrix];
    m[4] += dx;
    m[5] += dy;
    setMatrix(m);
  };

  const zoom = (scale) => {
    const m = [...matrix];
    const len = m.length;
    for (let i = 0; i < len; i++) {
      m[i] *= scale;
    }
    m[4] += ((1 - scale) * 400) / 2;
    m[5] += ((1 - scale) * 400) / 2;
    setMatrix(m);
  };

  const onDragStart = (e) => {
    const startPosX =
      typeof e.clientX === "undefined"
        ? e.changedTouches[0].clientX
        : e.clientX;
    const startPosY =
      typeof e.clientY === "undefined"
        ? e.changedTouches[0].clientY
        : e.clientY;

    setDragging(true);
    setStartX(startPosX);
    setStartY(startPosY);
  };

  const onDragMove = (e) => {
    if (!dragging) {
      return;
    }

    const x =
      typeof e.clientX === "undefined"
        ? e.changedTouches[0].clientX
        : e.clientX;
    const y =
      typeof e.clientY === "undefined"
        ? e.changedTouches[0].clientY
        : e.clientY;

    const dx = x - startX;
    const dy = y - startY;

    pan(dx, dy);

    setStartX(x);
    setStartY(y);
  };

  const onDragEnd = () => {
    setDragging(false);
  };

  const onWheel = (e) => {
    if (e.deltaY < 0) {
      zoom(1.05);
    } else {
      zoom(0.95);
    }
  };

  return (
    <svg
      className="svg"
      ref={svgGeom}
      width="100px"
      height="100px"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      onMouseDown={(e) => onDragStart(e)}
      onTouchStart={(e) => onDragStart(e)}
      onMouseMove={(e) => onDragMove(e)}
      onTouchMove={(e) => onDragMove(e)}
      onMouseUp={(e) => onDragEnd(e)}
      onTouchEnd={(e) => onDragEnd(e)}
      onWheel={(e) => onWheel(e)}
    >
      <g transform={`matrix(${matrix.join(" ")})`}>
        <Jordan dPath={dPath} />
        {nodes.map((node, i) =>
          lines.length > 1000 && i % 10 === 0 ? (
            <SampleDot key={i + "a"} cx={node.x} cy={node.y} />
          ) : (
            <SampleDot key={i + "a"} cx={node.x} cy={node.y} />
          )
        )}
        {showLines &&
          lines.length < 10000 &&
          lines.map((line, i) => <Line key={i} line={line} />)}
        {showWings &&
          wings.length < 10000 &&
          wings.map((wing, i) =>
            wings.length > 1000 && i % 2 === 0 ? (
              <Wings key={i} line={lines[i]} wings={wing} strokeWidth=".1" />
            ) : (
              <Wings key={i} line={lines[i]} wings={wing} strokeWidth=".1" />
            )
          )}
        {squares.map((square, i) => (
          <Square key={i} square={square} strokeWidth=".5" />
        ))}
      </g>
    </svg>
  );
};

export default SVGMap;
