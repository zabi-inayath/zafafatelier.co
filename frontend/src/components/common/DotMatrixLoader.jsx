import React from "react";
import "./DotMatrixLoader.css";

export default function DotMatrixLoader({
  text = "",
}) {
  const dots = [
    [0, 1],
    [0, 2],
    [0, 3],

    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],

    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],

    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],

    [4, 1],
    [4, 2],
    [4, 3],
  ];

  return (
    <div className="aesthetic-loader">
      <div className="aesthetic-grid">
        {dots.map(([row, col], index) => (
          <span
            key={index}
            className="aesthetic-dot"
            style={{
              "--row": row,
              "--col": col,
              "--delay": `${index * 0.055}s`,
            }}
          />
        ))}
      </div>

      {text && <p className="aesthetic-loader-text">{text}</p>}
    </div>
  );
}