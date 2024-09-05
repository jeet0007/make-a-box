import { useState, useEffect } from "react";
// import Draggable from "react-draggable";
// import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

// Vertical Scale Component
function VerticalScale({ height, width }: { height: number; width: number }) {
  const scaleStep = 10; // Every 10px for scale lines

  // Generate scale lines based on height
  const scaleLines = [];
  for (let i = 0; i <= height; i += scaleStep) {
    scaleLines.push(i);
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "#ddd",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {scaleLines.map((line, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            bottom: `${line}px`,
            width: "100%",
            borderBottom: "1px solid #000",
            transform: "translateY(50%)",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          textAlign: "center",
          fontSize: "12px",
          color: "#333",
        }}
      >
        {height}px
      </div>
    </div>
  );
}

function App() {
  const [boxWidth, setBoxWidth] = useState(100);
  const [boxHeight, setBoxHeight] = useState(100);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const width = urlParams.get("width");
    const height = urlParams.get("height");

    if (width) setBoxWidth(Number(width));
    if (height) setBoxHeight(Number(height));
  }, []);

  return <VerticalScale height={boxHeight} width={boxWidth} />;
}

export default App;
