import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Slider from "react-input-slider";

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Generate Path</h3>
            <div>
              <label htmlFor="dPath">SVG Path: </label>
              <input
                id="dPath"
                type="text"
                name="dPath"
                className="field"
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
            <h3>Select View</h3>

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
