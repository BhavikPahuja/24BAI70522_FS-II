import { useState } from "react";
import "./App.css";
import Writer from "./Components/Writer";

function App() {
  const [cnt, setCnt] = useState(0);

  return (
    <>
      <div className="bg-gray-300 h-screen w-screen flex items-center justify-center">
        <div className="bg-gray-500 w-5/11 h-5/11 rounded-2xl flex justify-center items-center">
          <span
            className="text-4xl p-4 border bg-gray-400 cursor-pointer select-none"
            onClick={() => {
              setCnt(cnt - 1);
            }}
          >
            -
          </span>
          <span className="text-4xl p-4 border bg-gray-400">{cnt}</span>
          <span
            className="text-4xl p-4 border bg-gray-400 cursor-pointer select-none"
            onClick={() => {
              setCnt(cnt + 1);
            }}
          >
            +
          </span>
        </div>
      </div>
      <div>
        <Writer name="GG" />
      </div>
    </>
  );
}

export default App;
