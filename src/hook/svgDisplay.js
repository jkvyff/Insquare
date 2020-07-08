import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./sidebar";
import SVGMap from "./svgMap";

import { svgPathProperties } from "svg-path-properties";

const SVGDisplay = () => {
  const svgGeom = useRef(null);

  const [dPath, setDPath] = useState(
    "M25.1,-46.5C31.3,-40,33.9,-30.6,43.3,-22.3C52.7,-14.1,68.8,-7,76.2,4.2C83.5,15.5,82.1,31.1,68.2,31.5C54.4,32,28,17.4,14.5,17.2C1.1000000000000014,17,0.5,31.1,-8,45C-16.6,58.9,-33.1,72.5,-42.5,70.3C-51.9,68.2,-54.1,50.3,-62,36C-69.9,21.7,-83.6,10.8,-75,5C-66.4,-0.9000000000000004,-35.6,-1.8000000000000007,-21.4,-5.300000000000001C-7.200000000000003,-8.799999999999997,-9.7,-14.899999999999999,-8.899999999999999,-24.5C-8.1,-34,-4,-47,2.7,-51.7C9.5,-56.4,19,-53,25.1,-46.5Z"
  );
  // M25.1,-46.5C31.3,-40,33.9,-30.6,43.3,-22.3C52.7,-14.1,68.8,-7,76.2,4.2C83.5,15.5,82.1,31.1,68.2,31.5C54.4,32,28,17.4,14.5,17.2C1.1000000000000014,17,0.5,31.1,-8,45C-16.6,58.9,-33.1,72.5,-42.5,70.3C-51.9,68.2,-54.1,50.3,-62,36C-69.9,21.7,-83.6,10.8,-75,5C-66.4,-0.9000000000000004,-35.6,-1.8000000000000007,-21.4,-5.300000000000001C-7.200000000000003,-8.799999999999997,-9.7,-14.899999999999999,-8.899999999999999,-24.5C-8.1,-34,-4,-47,2.7,-51.7C9.5,-56.4,19,-53,25.1,-46.5Z

  // Circle M 25, 50 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0 Z
  // Wikipedia Shape m 400,50 c -48.61208,1.07651 -79.49136,32.02154 -100,50 -19.36644,16.97718 -29.05084,23.7887 -50,50 -20.94916,26.2113 -59.55948,77.23786 -54.92886,121.07651 C 198.50564,303.59136 281.56443,333.12777 300,350 c 17.14346,15.68969 16.4081,38.58305 0,50 -16.4081,11.41695 -130.70967,10.21616 -150,40 -18.94578,29.25187 -11.37575,85.56467 0,110 16.35159,35.12352 124.80257,141.00452 150,150 25.26029,9.01792 40.46624,14.05936 78.30067,3.99463 C 415.8811,693.99747 524.40766,662.35702 550,650 575.59234,637.64298 583.83375,621.17894 560,600 528.02901,571.59021 485.82706,569.19496 450,550 414.17294,530.80504 380.10343,478.6601 411.375,458.625 442.64657,438.5899 469.2608,428.46921 510,450 c 40.7392,21.53079 152.87063,103.40526 200,100 47.12937,-3.40527 28.20294,-57.72911 10,-90 -18.20295,-32.27089 -29.83895,-42.74004 -60,-60 -30.16105,-17.25996 -73.3212,-11.75005 -110,-50 -36.67881,-38.24995 13.41017,-45.75091 49.6875,-51.375 C 635.96483,293.0009 670.55552,292.02641 650,250 629.44448,207.97359 587.82168,127.16472 550,100 512.17832,72.83528 448.61208,48.92349 400,50 z
  // M0 0 Q50 30 100 0 70 50 100 100 50 70 0 100 30 50 0 0Z
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
      const target = smallestDist + precision;

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
