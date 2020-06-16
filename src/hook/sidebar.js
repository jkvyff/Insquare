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
  showLines,
  setShowLines,
  showWings,
  setShowWings,
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
      showWings,
    },
  });

  const onSubmit = (value) => {
    value.dPath && value.dPath.length > 0 && setDPath(value.dPath);
    value.sampleCount && setSampleCount(Number(value.sampleCount));
    value.precision && setprecision(Number(value.precision));
    typeof value.showLines && setShowLines(value.showLines);
    typeof value.showWings && setShowWings(value.showWings);
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
            <div>
              <label htmlFor="dPath">SVG Path: </label>
              <input
                id="dPath"
                type="text"
                name="dPath"
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
              <label htmlFor="precision">precision: </label>
              <input
                id="precision"
                type="text"
                name="precision"
                ref={register({
                  validate: (value) =>
                    (0 <= value && value <= 1) || "Please stay between 0 and 1",
                })}
              />
              <p className="error-message">
                {errors.precision && errors.precision.message}
              </p>
            </div>

            <div>{"Node: " + scanPos}</div>

            <Slider
              axis="x"
              xstep={1}
              xmin={0}
              xmax={sampleCount - 2}
              x={scanPos}
              onChange={(res) => setScanPos(res.x)}
            />

            <h3>Show Features</h3>

            <div>
              <label className="checkLabel" htmlFor="showLines">
                <div>
                  <input
                    id="showLines"
                    type="checkbox"
                    className="checkbox"
                    name="showLines"
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
              <label className="checkLabel" htmlFor="showWings">
                <div>
                  <input
                    id="showWings"
                    type="checkbox"
                    className="checkbox"
                    name="showWings"
                    ref={register}
                  />
                  Wings
                </div>
              </label>
              <p className="error-message">
                {errors.showWings && errors.showWings.message}
              </p>
            </div>

            <div className="submit-area">
              <button className="submit-button" type="submit">
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
