import React, { useState } from "react";
import SVGDisplay from "./hook/svgDisplay.js";
import "./App.css";

const Loaded = ({ wasm }) => {
  return (
    <div>
      <button onClick={wasm.greet}>Click me</button>
    </div>
  );
};
const Unloaded = ({ loading, loadWasm }) => {
  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <button onClick={loadWasm}>Load Wasm</button>
    </>
  );
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [wasm, setWasm] = useState(null);

  const loadWasm = async () => {
    try {
      setLoading(true);
      const wasm = await import("wasm_insquare");
      setWasm(wasm);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {wasm ? (
          <Loaded wasm={wasm} />
        ) : (
          <Unloaded loading={loading} loadWasm={loadWasm} />
        )}
      </header>
      {wasm ? <SVGDisplay /> : <SVGDisplay />}
    </div>
  );
};

export default App;
