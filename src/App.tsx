import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

// Vertical Scale Component
function VerticalScale({ height }: { height: number }) {
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
        width: "30px",
        height: "100%",
        backgroundColor: "#ddd",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
  const [boxColor, setBoxColor] = useState("red");
  const [borderRadius, setBorderRadius] = useState(0);
  const [boxShadow, setBoxShadow] = useState("none");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const width = urlParams.get("width");
    const height = urlParams.get("height");
    const color = urlParams.get("color");
    const radius = urlParams.get("borderRadius");
    const shadow = urlParams.get("boxShadow");

    if (width) setBoxWidth(Number(width));
    if (height) setBoxHeight(Number(height));
    if (color) setBoxColor(color);
    if (radius) setBorderRadius(Number(radius));
    if (shadow) setBoxShadow(shadow);
  }, []);

  return (
    <Draggable>
      <div
        style={{
          position: "relative",
          width: boxWidth,
          height: boxHeight,
          cursor: "move", // Show hand cursor when dragging
        }}
      >
        <ResizableBox
          width={boxWidth}
          height={boxHeight}
          minConstraints={[50, 50]} // Min size for the box
          maxConstraints={[500, 500]} // Max size for the box
          onResize={(e, data) => {
            setBoxWidth(data.size.width);
            setBoxHeight(data.size.height);
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              backgroundColor: boxColor,
              borderRadius: `${borderRadius}px`,
              boxShadow: boxShadow,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <VerticalScale height={boxHeight} />
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
}

export default App;
