import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./sidebar";
import SVGMap from "./svgMap";

import { svgPathProperties } from "svg-path-properties";

const SVGDisplay = () => {
  const svgGeom = useRef(null);

  const [dPath, setDPath] = useState(
    "M25.1,-46.5C31.3,-40,33.9,-30.6,43.3,-22.3C52.7,-14.1,68.8,-7,76.2,4.2C83.5,15.5,82.1,31.1,68.2,31.5C54.4,32,28,17.4,14.5,17.2C1.1000000000000014,17,0.5,31.1,-8,45C-16.6,58.9,-33.1,72.5,-42.5,70.3C-51.9,68.2,-54.1,50.3,-62,36C-69.9,21.7,-83.6,10.8,-75,5C-66.4,-0.9000000000000004,-35.6,-1.8000000000000007,-21.4,-5.300000000000001C-7.200000000000003,-8.799999999999997,-9.7,-14.899999999999999,-8.899999999999999,-24.5C-8.1,-34,-4,-47,2.7,-51.7C9.5,-56.4,19,-53,25.1,-46.5Z"
  );

  const [sampleCount, setSampleCount] = useState(150);
  const [nodes, setNodes] = useState([]);
  const [lines, setLines] = useState([]);
  const [wings, setWings] = useState([]);
  const [wingsScores, setWingsScores] = useState([]);
  const [squares, setSquares] = useState([]);

  const [view, setView] = useState(1);

  const [showLines, setShowLines] = useState(false);
  const [showLWings, setShowLWings] = useState(true);
  const [showRWings, setShowRWings] = useState(true);
  const [showSquares, setShowSquares] = useState(true);

  const [precision, setprecision] = useState(0.08);
  const [scanPos, setScanPos] = useState(0);

  const calcNodes = () => {
    const properties = new svgPathProperties(dPath);
    const totalLength = properties.getTotalLength();

    const allNodes = [];

    if (sampleCount > 1) {
      for (let i = 1; i <= sampleCount; i++) {
        allNodes.push(
          properties.getPointAtLength((1 / sampleCount) * totalLength * i)
        );
      }
    }

    setNodes(allNodes);
    return allNodes;
  };

  const calcLines = (nodes) => {
    let posA = 0;
    const allLines = [];

    if (sampleCount > 1) {
      switch (view) {
        case 1:
          const posD = scanPos < sampleCount ? scanPos : 0;
          let posC = posD + 1;
          while (posC !== posD) {
            allLines.push({
              a: [nodes[posD].x, nodes[posD].y],
              b: [nodes[posC].x, nodes[posC].y],
            });
            posC === sampleCount - 1 ? (posC = 0) : posC++;
          }
          break;

        case 2:
          let offSetB = scanPos + 1;
          while (posA < sampleCount) {
            const nextPos = (posA + offSetB) % sampleCount;
            allLines.push({
              a: [nodes[posA].x, nodes[posA].y],
              b: [nodes[nextPos].x, nodes[nextPos].y],
            });
            posA++;
          }
          break;

        default:
          let offset = posA + 1;
          while (offset < sampleCount / 2 + 1) {
            while (posA < sampleCount) {
              const posB = (posA + offset) % sampleCount;
              allLines.push({
                a: [nodes[posA].x, nodes[posA].y],
                b: [nodes[posB].x, nodes[posB].y],
              });
              posA++;
            }
            posA = 0;
            offset++;
          }
      }
    }

    setLines(allLines);
    return allLines;
  };

  const calcWings = (lines) => {
    const allWings = [];

    for (let i = 0; i < lines.length; i++) {
      const hypoDistance = Math.sqrt(
        Math.pow(lines[i].a[0] - lines[i].b[0], 2) +
          Math.pow(lines[i].a[1] - lines[i].b[1], 2)
      );
      const halfHypoDistance = hypoDistance / 2;
      const yDiff = lines[i].b[1] - lines[i].a[1];
      const xDiff = lines[i].b[0] - lines[i].a[0];
      const slope = yDiff / xDiff;
      const invSlope = -(1 / slope);
      const midpoint = [
        (lines[i].a[0] + lines[i].b[0]) / 2,
        (lines[i].a[1] + lines[i].b[1]) / 2,
      ];

      const slopeChange = halfHypoDistance * Math.sin(Math.atan(slope));
      const invSlopeChange = halfHypoDistance * Math.sin(Math.atan(invSlope));

      const left = [
        xDiff > 0 ? midpoint[0] + slopeChange : midpoint[0] - slopeChange,
        yDiff > 0 ? midpoint[1] + invSlopeChange : midpoint[1] - invSlopeChange,
      ];
      const right = [
        xDiff < 0 ? midpoint[0] + slopeChange : midpoint[0] - slopeChange,
        yDiff < 0 ? midpoint[1] + invSlopeChange : midpoint[1] - invSlopeChange,
      ];

      // index 0: left Wing
      // index 1: right Wing
      allWings.push({
        left: left,
        right: right,
      });
    }
    setWings(allWings);
    return allWings;
  };

  const calcWingsScores = (wings) => {
    const wingsMinDistanceToPath = [];

    let lMinDist = Number.MAX_SAFE_INTEGER;
    let rMinDist = Number.MAX_SAFE_INTEGER;
    let smallestDist = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < wings.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        const lDist = Math.sqrt(
          Math.pow(wings[i].left[0] - nodes[j].x, 2) +
            Math.pow(wings[i].left[1] - nodes[j].y, 2)
        );
        const rDist = Math.sqrt(
          Math.pow(wings[i].right[0] - nodes[j].x, 2) +
            Math.pow(wings[i].right[1] - nodes[j].y, 2)
        );
        if (lMinDist < smallestDist && rMinDist < smallestDist) {
          smallestDist = Math.max(lMinDist, rMinDist);
        }
        if (i + 1 !== j && i - 1 !== j) {
          lMinDist = lDist < lMinDist ? lDist : lMinDist;
          rMinDist = rDist < rMinDist ? rDist : rMinDist;
        }
      }
      wingsMinDistanceToPath.push({ left: lMinDist, right: rMinDist });
      lMinDist = Number.MAX_SAFE_INTEGER;
      rMinDist = Number.MAX_SAFE_INTEGER;
    }

    setWingsScores([wingsMinDistanceToPath, smallestDist]);
    return [wingsMinDistanceToPath, smallestDist];
  };

  const calcSquares = (
    lines,
    wings,
    wingsScores,
    smallestDist,
    requiredDist
  ) => {
    const allSquares = [];

    for (let i = 0; i < wingsScores.length; i++) {
      const target = smallestDist;

      if (
        target < requiredDist &&
        -target <= wingsScores[i].left &&
        wingsScores[i].left <= target &&
        -target <= wingsScores[i].right &&
        wingsScores[i].right <= target
      ) {
        allSquares.push({
          a: lines[i].a,
          b: wings[i].left,
          c: lines[i].b,
          d: wings[i].right,
        });
      }
    }
    setSquares(allSquares);
  };

  useEffect(() => {
    const nodes = calcNodes();
    const lines = calcLines(nodes);
    calcWings(lines);
    scanPos >= sampleCount && setScanPos(0);
    // eslint-disable-next-line
  }, [view, dPath, sampleCount, scanPos]);

  useEffect(() => {
    if (wings.length > 0) {
      calcWingsScores(wings);
    }
    // eslint-disable-next-line
  }, [wings]);

  useEffect(() => {
    /* 
    Minimum required distance to create a square must be greater than distance
    between two first 2 points on divided svg path
    */
    const requiredDist =
      lines && lines.length > 0
        ? Math.sqrt(
            Math.pow(lines[0].b[0] - lines[0].a[0], 2) +
              Math.pow(lines[0].b[1] - lines[0].a[1], 2)
          ) / 2
        : 0;
    if (wingsScores.length > 0) {
      calcSquares(lines, wings, wingsScores[0], wingsScores[1], requiredDist);
    }
    // eslint-disable-next-line
  }, [wingsScores, precision]);

  return (
    <>
      <Sidebar
        width={300}
        height="100vh"
        dPath={dPath}
        setDPath={setDPath}
        sampleCount={sampleCount}
        setSampleCount={setSampleCount}
        precision={precision}
        setprecision={setprecision}
        view={view}
        setView={setView}
        showLines={showLines}
        setShowLines={setShowLines}
        showLWings={showLWings}
        setShowLWings={setShowLWings}
        showRWings={showRWings}
        setShowRWings={setShowRWings}
        showSquares={showSquares}
        setShowSquares={setShowSquares}
        scanPos={scanPos}
        setScanPos={setScanPos}
      />

      <div className="svgWrap">
        <SVGMap
          svgGeom={svgGeom}
          dPath={dPath}
          nodes={nodes}
          lines={lines}
          wings={wings}
          wingsScores={wingsScores}
          squares={squares}
          showLines={showLines}
          showLWings={showLWings}
          showRWings={showRWings}
          showSquares={showSquares}
        />
      </div>
    </>
  );
};

export default SVGDisplay;
