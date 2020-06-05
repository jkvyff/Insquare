import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Jordan from "./jordan";
import SampleDot from "./sampleDot";
import Line from "./line";
import Wings from "./wings";
import Square from "./square";
import { svgPathProperties } from "svg-path-properties";

const SVGDisplay = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (value) => {
    setSampleCount(value.sampleCount);
  };

  const [dPath, setDPath] = useState(
    "M28.3,-37C39,-37.2,51.7,-33.3,57,-25C62.2,-16.8,60.1,-4.2,60.7,10.5C61.3,25.2,64.6,42,57.4,49.1C50.3,56.2,32.6,53.6,20.1,48.1C7.5,42.6,0,34.1,-10.5,32.5C-20.9,30.9,-34.3,36.1,-45.2,33.6C-56,31,-64.4,20.7,-71.6,7C-78.8,-6.8,-84.7,-24.1,-78.2,-34.6C-71.6,-45,-52.6,-48.6,-37.5,-46.4C-22.3,-44.2,-11.2,-36.3,-1.2,-34.4C8.8,-32.6,17.6,-36.8,28.3,-37Z"
  );
  //M25.1,-46.5C31.3,-40,33.9,-30.6,43.3,-22.3C52.7,-14.1,68.8,-7,76.2,4.2C83.5,15.5,82.1,31.1,68.2,31.5C54.4,32,28,17.4,14.5,17.2C1.1000000000000014,17,0.5,31.1,-8,45C-16.6,58.9,-33.1,72.5,-42.5,70.3C-51.9,68.2,-54.1,50.3,-62,36C-69.9,21.7,-83.6,10.8,-75,5C-66.4,-0.9000000000000004,-35.6,-1.8000000000000007,-21.4,-5.300000000000001C-7.200000000000003,-8.799999999999997,-9.7,-14.899999999999999,-8.899999999999999,-24.5C-8.1,-34,-4,-47,2.7,-51.7C9.5,-56.4,19,-53,25.1,-46.5Z
  const [sampleCount, setSampleCount] = useState(3);
  const [nodes, setNodes] = useState([]);
  const [lines, setLines] = useState([]);
  const [wings, setWings] = useState([]);
  const [wingsScores, setWingsScores] = useState([]);
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    const properties = new svgPathProperties(dPath);
    const totalLength = properties.getTotalLength();
    const allNodes = [];
    const allLines = [];
    const allWings = [];
    const allWingsMin = [];
    const allSquares = [];

    for (let i = 1; i <= sampleCount; i++) {
      allNodes.push(
        properties.getPointAtLength((1 / sampleCount) * totalLength * i)
      );
    }
    setNodes(allNodes);

    let posA = 0;
    let offset = 1;
    while (offset < sampleCount / 2) {
      while (posA < sampleCount) {
        const posB = (posA + offset) % sampleCount;
        allLines.push({
          ax: allNodes[posA].x,
          ay: allNodes[posA].y,
          bx: allNodes[posB].x,
          by: allNodes[posB].y,
        });
        posA++;
      }
      posA = 0;
      offset++;
    }
    // for (let i = 0; i < sampleCount - 1; i++) {
    //   for (let j = i + 1; j < sampleCount; j++) {
    //     allLines.push({
    //       ax: allNodes[i].x,
    //       ay: allNodes[i].y,
    //       bx: allNodes[j].x,
    //       by: allNodes[j].y,
    //     });
    //   }
    // }
    setLines(allLines);

    for (let i = 0; i < allLines.length; i++) {
      const hypoDistance = Math.sqrt(
        Math.pow(allLines[i].ax - allLines[i].bx, 2) +
          Math.pow(allLines[i].ay - allLines[i].by, 2)
      );
      const halfHypoDistance = hypoDistance / 2;
      const slope =
        (allLines[i].by - allLines[i].ay) / (allLines[i].bx - allLines[i].ax);
      const invSlope = -(1 / slope);
      const midpoint = [
        (allLines[i].ax + allLines[i].bx) / 2,
        (allLines[i].ay + allLines[i].by) / 2,
      ];
      const left =
        slope > 0
          ? [
              midpoint[0] + halfHypoDistance * Math.sin(Math.atan(slope)),
              midpoint[1] + halfHypoDistance * Math.sin(Math.atan(invSlope)),
            ]
          : [
              midpoint[0] + halfHypoDistance * Math.sin(Math.atan(slope)),
              midpoint[1] - halfHypoDistance * Math.sin(Math.atan(invSlope)),
            ];
      const right =
        slope > 0
          ? [
              midpoint[0] - halfHypoDistance * Math.sin(Math.atan(slope)),
              midpoint[1] - halfHypoDistance * Math.sin(Math.atan(invSlope)),
            ]
          : [
              midpoint[0] - halfHypoDistance * Math.sin(Math.atan(slope)),
              midpoint[1] + halfHypoDistance * Math.sin(Math.atan(invSlope)),
            ];

      allWings.push({
        left: left,
        right: right,
      });
    }
    setWings(allWings);

    let lMinDist = Number.MAX_SAFE_INTEGER;
    let rMinDist = Number.MAX_SAFE_INTEGER;
    let smallestDist = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < allWings.length; i++) {
      for (let j = 0; j < allNodes.length; j++) {
        const lDist = Math.sqrt(
          Math.pow(allWings[i].left[0] - allNodes[j].x, 2) +
            Math.pow(allWings[i].left[1] - allNodes[j].y, 2)
        );
        const rDist = Math.sqrt(
          Math.pow(allWings[i].right[0] - allNodes[j].x, 2) +
            Math.pow(allWings[i].right[1] - allNodes[j].y, 2)
        );
        if (lMinDist < smallestDist && rMinDist < smallestDist) {
          smallestDist = Math.max(lMinDist, rMinDist);
        }
        lMinDist = lDist < lMinDist ? lDist : lMinDist;
        rMinDist = rDist < rMinDist ? rDist : rMinDist;
      }
      allWingsMin.push({ left: lMinDist, right: rMinDist });
      lMinDist = Number.MAX_SAFE_INTEGER;
      rMinDist = Number.MAX_SAFE_INTEGER;
    }

    console.log(smallestDist);
    for (let i = 0; i < allWingsMin.length; i++) {
      if (
        -smallestDist - 0.1 < allWingsMin[i].left &&
        allWingsMin[i].left < smallestDist + 0.01 &&
        -smallestDist - 0.1 < allWingsMin[i].right &&
        allWingsMin[i].right < smallestDist + 0.01
      ) {
        allSquares.push({
          a: allWings[i].left,
          b: [allLines[i].ax, allLines[i].ay],
          c: allWings[i].right,
          d: [allLines[i].bx, allLines[i].by],
        });
      }
    }
    setSquares(allSquares);
    setWingsScores(allWingsMin);
  }, [dPath, sampleCount]);

  return (
    <>
      <form>
        <label>
          SVG Path:
          <input
            onChange={(path) => setDPath(path.target.value)}
            type="text"
            name="dPath"
          />
        </label>
      </form>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Sample Count:
          <input
            type="text"
            name="sampleCount"
            placeholder={sampleCount}
            ref={register({
              validate: (value) => value <= 1000 || "Nice try!",
            })}
          />
          <button type="submit">Submit</button>
          <br />
          {errors.sampleCount && errors.sampleCount.message}
        </label>
      </form>
      {dPath}

      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <Jordan dPath={dPath} />
        {nodes.map((node, i) =>
          lines.length > 1000 && i % 10 === 0 ? (
            <SampleDot key={i + "a"} cx={node.x} cy={node.y} />
          ) : (
            <SampleDot key={i + "a"} cx={node.x} cy={node.y} />
          )
        )}
        {/* {lines.map((line, i) => (
          <Line key={i} line={line} />
        ))} */}
        {wings.map((wing, i) =>
          wings.length > 1000 && i % 2 === 0 ? (
            <Wings key={i} line={lines[i]} wings={wing} strokeWidth=".1" />
          ) : (
            <Wings key={i} line={lines[i]} wings={wing} strokeWidth=".1" />
          )
        )}
        {squares.map((square, i) => (
          <Square key={i} square={square} strokeWidth=".5" />
        ))}
      </svg>
    </>
  );
};

export default SVGDisplay;
