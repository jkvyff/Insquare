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
  wingsScores,
  squares,
  showLines,
  showLWings,
  showRWings,
  showSquares,
}) => {
  const [matrix, setMatrix] = useState([2, 0, 0, 2, 200, 200]);
  const [pointScale, setPointScale] = useState(0.5);
  const [lineScale, setLineScale] = useState(0.1);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const visualSamplesCount = 3444; // number choosen to limit patterns in common sample counts
  const [timer, setTimer] = useState(null);

  const timesup = (ev) => {
    setTimer(null);
    zoom(0.6);
  };

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
    setPointScale(pointScale / scale);
    setLineScale(lineScale / scale);
  };

  const onDragStart = (e) => {
    const event = { ...e };
    const timeoutId = window.setTimeout(timesup.bind(null, event), 500);
    setTimer(timeoutId);

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
    if (timer) {
      // Stop zoomout on move
      window.clearTimeout(timer);
      setTimer(null);
    }
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

    console.log(x, y);
    const dx = x - startX;
    const dy = y - startY;

    pan(dx, dy);

    setStartX(x);
    setStartY(y);
  };

  const onDragEnd = (e) => {
    if (timer) {
      window.clearTimeout(timer);
      setTimer(null);
    }
    setDragging(false);
  };

  const onWheel = (e) => {
    if (e.deltaY < 0) {
      zoom(1.05);
    } else {
      zoom(0.95);
    }
  };

  const visualfeatures = (items, n) => {
    let result = [items[0]];
    const totalItems = items.length - 2;
    const interval = ~~(totalItems / (n - 2));
    for (let i = 1; i < items.length; i += interval) {
      result.push(items[i]);
    }
    result.push(items[items.length - 1]);
    return result;
  };

  return (
    <>
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
        onDoubleClick={(e) => zoom(1.5)}
      >
        <g transform={`matrix(${matrix.join(" ")})`}>
          <Jordan dPath={dPath} />
          {nodes.length < 1000 &&
            nodes.map((node, i) => (
              <SampleDot
                key={i + "a"}
                cx={node.x}
                cy={node.y}
                pointScale={pointScale}
              />
            ))}
          {nodes.length >= 1000 &&
            visualfeatures(nodes, 1000).map((node, i) => (
              <SampleDot
                key={i + "a"}
                cx={node.x}
                cy={node.y}
                pointScale={pointScale}
              />
            ))}
          {showLines &&
            lines.length < visualSamplesCount &&
            lines.map((line, i) => (
              <Line key={i} line={line} lineScale={lineScale} />
            ))}
          {showLines &&
            lines.length >= visualSamplesCount &&
            visualfeatures(lines, visualSamplesCount).map((line, i) => (
              <Line key={i} line={line} lineScale={lineScale} />
            ))}
          {(showLWings || showRWings) &&
            wings.length < visualSamplesCount &&
            wings.map((wing, i) => (
              <Wings
                key={i}
                line={lines[i]}
                wings={wing}
                showLWings={showLWings}
                showRWings={showRWings}
                pointScale={pointScale}
                lineScale={lineScale}
              />
            ))}
          {(showLWings || showRWings) &&
            wings.length >= visualSamplesCount &&
            visualfeatures(wings, visualSamplesCount).map((wing, i) => (
              <Wings
                key={i}
                line={lines[i]}
                wings={wing}
                showLWings={showLWings}
                showRWings={showRWings}
                pointScale={pointScale}
                lineScale={lineScale}
              />
            ))}
          {showSquares &&
            squares.map((square, i) => (
              <Square key={i} square={square} lineScale={pointScale} />
            ))}
        </g>
      </svg>
    </>
  );
};

export default SVGMap;
