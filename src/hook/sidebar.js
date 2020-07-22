import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Slider from "react-input-slider";
import PathButton from "./pathButton";

const Sidebar = ({
  width,
  height,
  dPath,
  setDPath,
  sampleCount,
  setSampleCount,
  precision,
  setprecision,
  view,
  setView,
  showLines,
  setShowLines,
  showLWings,
  setShowLWings,
  showRWings,
  setShowRWings,
  showSquares,
  setShowSquares,
  scanPos,
  setScanPos,
}) => {
  const [xPosition, setX] = useState(-width);
  const [dPathTemp, setDPathTemp] = useState(
    "M25.1,-46.5C31.3,-40,33.9,-30.6,43.3,-22.3C52.7,-14.1,68.8,-7,76.2,4.2C83.5,15.5,82.1,31.1,68.2,31.5C54.4,32,28,17.4,14.5,17.2C1.1000000000000014,17,0.5,31.1,-8,45C-16.6,58.9,-33.1,72.5,-42.5,70.3C-51.9,68.2,-54.1,50.3,-62,36C-69.9,21.7,-83.6,10.8,-75,5C-66.4,-0.9000000000000004,-35.6,-1.8000000000000007,-21.4,-5.300000000000001C-7.200000000000003,-8.799999999999997,-9.7,-14.899999999999999,-8.899999999999999,-24.5C-8.1,-34,-4,-47,2.7,-51.7C9.5,-56.4,19,-53,25.1,-46.5Z"
  );
  const buttonPaths = [
    [
      "-70 -70 150 150",
      "M25.1,-46.5C31.3,-40,33.9,-30.6,43.3,-22.3C52.7,-14.1,68.8,-7,76.2,4.2C83.5,15.5,82.1,31.1,68.2,31.5C54.4,32,28,17.4,14.5,17.2C1.1000000000000014,17,0.5,31.1,-8,45C-16.6,58.9,-33.1,72.5,-42.5,70.3C-51.9,68.2,-54.1,50.3,-62,36C-69.9,21.7,-83.6,10.8,-75,5C-66.4,-0.9000000000000004,-35.6,-1.8000000000000007,-21.4,-5.300000000000001C-7.200000000000003,-8.799999999999997,-9.7,-14.899999999999999,-8.899999999999999,-24.5C-8.1,-34,-4,-47,2.7,-51.7C9.5,-56.4,19,-53,25.1,-46.5Z",
    ],
    [
      "20 0 150 150",
      "M 80,10 c -9.722415999999999,0.21530200000000002 -15.898272,6.404308 -20,10 -3.873288,3.395436 -5.810168,4.75774 -10,10 -4.189832,5.24226 -11.911896,15.447572 -10.985772,24.215302 C 39.701128,60.718272 56.312886000000006,66.625554 60,70 c 3.4286920000000003,3.137938 3.28162,7.71661 0,10 -3.28162,2.28339 -26.141934,2.043232 -30,8 -3.7891559999999997,5.850374 -2.27515,17.112934000000003 0,22 3.2703180000000005,7.024704 24.960514,28.200904 30,30 5.052058000000001,1.803584 8.093247999999999,2.811872 15.660134,0.798926 C 83.17622,138.799494 104.88153199999999,132.471404 110,130 115.11846800000001,127.528596 116.76675,124.235788 112,120 105.605802,114.31804199999999 97.165412,113.838992 90,110 82.834588,106.161008 76.020686,95.73202 82.275,91.725 88.529314,87.71798 93.85216,85.69384199999999 102,90 c 8.147839999999999,4.306158 30.574126,20.681052 40,20 9.425874,-0.6810539999999999 5.640588,-11.545822 2,-18 -3.6405900000000004,-6.454178000000001 -5.96779,-8.548008 -12,-12 -6.03221,-3.4519919999999997 -14.664240000000001,-2.35001 -22,-10 -7.335762,-7.64999 2.6820340000000003,-9.150182 9.9375,-10.275 C 127.192966,58.60018 134.111104,58.405282 130,50 125.888896,41.594718 117.564336,25.432944 110,20 102.435664,14.567056 89.722416,9.784698 80,10 Z",
    ],
    ["15 15 70 70", "M 25, 50 a 25,25 0 1,1 50,0 a 25,25 0 1,1 -50,0 Z"],
    [
      "0 -100 175 175",
      "M 0.51,-7.232 0.51,-10.872 c -0.47,-2.924 4.01,-3.888 5.62,-5.358 0.8,-0.729 2.11,-2.218 3.34,-2.142 1.08,0.07 1.32,-1.547 2.73,-1.82 2.3,-0.445 3.47,1.779 4.85,-1.26 0.43,-0.941 1.86,-0.547 2.68,-0.655 1.48,-0.196 2.97,-0.397 4.36,-0.913 2.8,-1.036 2.92,-4.046 5.31,-5.308 0.98,-0.521 2.27,-0.578 3.31,-0.962 1.28,-0.474 2.12,-1.908 3.44,-2.173 0.48,-0.1 3.08,-0.309 2.02,-1.679 -0.69,-0.885 -1.78,-1.207 -0.37,-2.496 -2.02,-0.554 -0.2,-2.668 1.28,-2.544 1.96,0.164 3.77,-0.534 4.46,-2.367 1.33,-3.511 10.39,-0.401 12.98,-1.065 -2.97,-1.338 2.16,-2.972 0.55,-4.213 -0.76,-0.587 -1.61,-1.104 -2.23,-1.854 -0.71,-0.867 -0.34,-2.11 -1.04,-3.172 -0.74,-1.11 -0.33,-2.024 -0.12,-3.129 0.2,-1.036 -0.6,-1.048 -0.49,-2.053 0.11,-0.939 0.1,-2.071 0.1,-3.006 0,-1.255 -0.81,-2.262 0.43,-3.236 -1.29,-0.528 -0.77,-1.249 -0.96,-2.216 -0.25,-1.288 -2.48,-1.706 -2.97,-3.031 2.4,0 3.42,-0.587 5.45,-1.627 0.89,-0.453 1.45,-0.454 1.98,-1.388 0.48,-0.827 0.83,-1.521 1.71,-1.991 0.5,-0.266 1.46,-1.038 1.98,-0.624 0.68,0.537 1.54,-0.396 1.99,-0.81 1.18,-1.073 2.79,1.628 3.99,-0.84 1.61,-3.307 7.15,-4.738 10.4,-5.112 2.31,-0.266 4.65,-0.902 6.98,-0.745 1.74,0.117 2.93,-2.099 4.44,-1.246 0.66,0.371 0.51,0.163 0.76,-0.25 0,-0.09 2.66,-0.05 3.05,-0.206 2.25,-0.893 4.52,-0.556 6.89,-0.622 1.98,-0.05 2.44,0.354 3.95,1.487 1.92,1.447 2.58,-0.693 4.25,-0.897 0.53,-0.06 3.85,-0.209 3.67,-1.192 -0.33,-1.77 2.09,-0.68 2.66,-0.294 1.2,0.805 3.01,1.212 4.24,0.228 0.68,-0.541 0.24,-1.245 1.52,-0.924 0.92,0.228 1.63,0.9 2.63,0.847 -0.84,1.391 1.24,0.904 1.9,0.732 1.32,-0.343 2.74,-0.02 4.01,-0.445 0.1,1.794 -2.18,2.673 -3.17,3.816 2.7,0.582 0.11,4.377 0.65,6.116 0.95,3.021 0.56,5.304 -0.1,8.284 -0.53,2.452 -3.25,4.362 -5.08,5.971 -1.06,0.938 -0.54,3.388 0.1,4.427 1,1.681 0.54,3.513 2.61,4.299 2.83,1.072 2,4.651 4.28,6.355 1.05,0.791 2.3,1.363 3.19,2.356 1.21,1.343 1.39,3.544 1.67,5.248 0.58,3.52 2.25,7.431 2.25,10.98 0,0.958 -2.02,0.591 -0.72,2.323 1.26,1.679 2.3,3.653 2.72,5.719 1.43,7.11 -0.68,7.066 0.4,10.712 0.51,1.739 0.53,3.01 -0.14,4.703 -0.76,1.911 -0.1,3.698 0.35,5.605 0.62,2.883 -0.66,2.929 -2.71,4.477 -2.33,1.766 1.55,5.196 2.56,6.754 1.9,2.912 0.76,6.369 3.28,9.088 0.96,1.044 2.07,-0.208 3.11,-0.13 1.3,0.1 2.72,1.084 3.95,1.529 2.79,1.016 3.73,3.364 4.77,6.022 0.49,1.259 0.98,1.411 -0.38,2.185 -14.2,9.052 -28.52,18.11 -40.61,29.885 -0.7,1.012 -2.95,3.544 -4.69,4.51 -1.33,0.733 -3.28,0.8 -4.74,1.103 -1.99,0.411 -3.98,0.801 -5.97,1.222 -0.99,0.211 -9.72,3.21 -9.35,0.121 0.13,-1.089 0.91,-1.511 0.81,-2.717 0,-0.463 0.1,-2.895 -0.39,-3.136 -1.47,-0.734 -3.3,-1.07 -4.92,-1.381 -0.8,-0.154 -1.87,-2.184 -2.48,-2.034 -3.49,0.858 -4.04,-2.627 -4.67,-3.148 -0.75,-0.616 -2.03,-0.672 -2.71,-1.189 -0.76,-0.581 -0.1,-2.025 -0.56,-2.805 -0.58,-0.981 -1.58,-1.834 -2.53,-2.391 -1.61,-0.954 -3.12,-2.087 -4.59,-3.234 -3.67,-2.849 -7.28,-5.783 -10.93,-8.654 -14.09,-11.076 -28.16,-22.111 -42.9,-32.316 -3.52,-2.44 -7.05,-4.845 -10.6,-7.232Z",
    ],
  ];

  const { handleSubmit, register, errors } = useForm({
    defaultValues: {
      dPath,
      sampleCount,
      precision,
      showLines,
      showLWings,
      showRWings,
    },
  });

  const onSubmit = (value) => {
    value.dPath && value.dPath.length > 0 && setDPath(value.dPath);
    value.sampleCount && setSampleCount(Number(value.sampleCount));
    value.precision && setprecision(Number(value.precision));
    value.selectView && setView(Number(value.selectView));
    typeof value.showLines && setShowLines(value.showLines);
    typeof value.showLWings && setShowLWings(value.showLWings);
    typeof value.showRWings && setShowRWings(value.showRWings);
    typeof value.showSquares && setShowSquares(value.showSquares);
  };

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  useEffect(() => {
    setX(0);
  }, []);

  return (
    <>
      <div
        className="side-bar"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width - 30,
          minHeight: height,
        }}
      >
        <button
          onClick={() => toggleMenu()}
          className="toggle-menu"
          style={{
            transform: `translate(${width - 30}px, 2vh)`,
          }}
        ></button>
        <div className="content">
          <label>Sample Shapes: </label>
          <div className="shape-buttons">
            {buttonPaths.map((path, i) => (
              <PathButton
                key={i}
                viewbox={path[0]}
                path={path[1]}
                setDPath={setDPath}
                setDPathTemp={setDPathTemp}
              />
            ))}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <br />
            <div>
              <label htmlFor="dPath">SVG Path: </label>
              <input
                id="dPath"
                type="text"
                name="dPath"
                className="field"
                value={dPathTemp}
                onChange={(ev) => setDPathTemp(ev.target.value)}
                ref={register({
                  required: false,
                  validate: (str) =>
                    (str &&
                      str[0].toLowerCase() === "m" &&
                      str[str.length - 1].toLowerCase() === "z") ||
                    "Please format SVG Path correctly, beginning with M and closing with Z",
                })}
              />
              <p className="error-message">
                {errors.dPath && errors.dPath.message}
              </p>
            </div>

            <div>
              <label htmlFor="sampleCount">Sample Count: </label>
              <input
                id="sampleCount"
                type="text"
                name="sampleCount"
                className="field"
                ref={register({
                  validate: (value) =>
                    (0 <= value && value <= 1000) ||
                    "Samples only go up to 1000",
                })}
              />
              <p className="error-message">
                {errors.sampleCount && errors.sampleCount.message}
              </p>
            </div>

            <div>
              <label htmlFor="precision">Precision: </label>
              <input
                id="precision"
                type="text"
                name="precision"
                className="field"
                ref={register({
                  validate: (value) =>
                    (0 <= value && value <= 1) || "Please stay between 0 and 1",
                })}
              />
              <p className="error-message">
                {errors.precision && errors.precision.message}
              </p>
            </div>

            <hr />
            <h3>Display View</h3>

            <div>
              <label htmlFor="selectView">Select View:</label>
              <div>
                <select
                  id="selectView"
                  name="selectView"
                  className="select-field field"
                  defaultValue={view}
                  ref={register({
                    validate: (value) =>
                      (0 <= value && value < 3) ||
                      "Please select a valuid value",
                  })}
                >
                  <option value={0}>Full</option>
                  <option value={1}>Point</option>
                  <option value={2}>Ring</option>
                </select>
              </div>
              <p className="error-message">
                {errors.selectView && errors.selectView.message}
              </p>
            </div>

            <div className={view === 0 ? "disabled" : ""}>
              {"Node: " + scanPos}
            </div>
            <Slider
              className="slider"
              axis="x"
              xstep={1}
              xmin={0}
              xmax={sampleCount - 2}
              x={scanPos}
              disabled={view === 0}
              onChange={(res) => setScanPos(res.x)}
            />

            <hr />
            <h3>Show Features</h3>

            <div>
              <label className="checkLabel" htmlFor="showLines">
                <div>
                  <input
                    id="showLines"
                    type="checkbox"
                    className="checkbox"
                    name="showLines"
                    defaultChecked={showLines}
                    ref={register}
                  />
                  Lines
                </div>
              </label>
              <p className="error-message">
                {errors.showLines && errors.showLines.message}
              </p>
            </div>

            <div>
              <label className="checkLabel" htmlFor="showLWings">
                <div>
                  <input
                    id="showLWings"
                    type="checkbox"
                    className="checkbox"
                    name="showLWings"
                    defaultChecked={showLWings}
                    ref={register}
                  />
                  Left Wings
                </div>
              </label>
              <p className="error-message">
                {errors.showLWings && errors.showLWings.message}
              </p>
            </div>

            <div>
              <label className="checkLabel" htmlFor="showRWings">
                <div>
                  <input
                    id="showRWings"
                    type="checkbox"
                    className="checkbox"
                    name="showRWings"
                    defaultChecked={showRWings}
                    ref={register}
                  />
                  Right Wings
                </div>
              </label>
              <p className="error-message">
                {errors.showRWings && errors.showRWings.message}
              </p>
            </div>

            <div>
              <label className="checkLabel" htmlFor="showSquares">
                <div>
                  <input
                    id="showSquares"
                    type="checkbox"
                    className="checkbox"
                    name="showSquares"
                    defaultChecked={showSquares}
                    ref={register}
                  />
                  Squares
                </div>
              </label>
              <p className="error-message">
                {errors.showSquares && errors.showSquares.message}
              </p>
            </div>

            <div className="submit-area">
              <button className="submit-button content-button" type="submit">
                Generate
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
