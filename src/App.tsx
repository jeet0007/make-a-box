import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css"; // Make sure you import the default styles

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
            backgroundColor: boxColor,
            borderRadius: `${borderRadius}px`,
            boxShadow: boxShadow,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "move", // Show hand cursor when dragging
          }}
        >
          <p>Drag me!</p>
        </div>
      </ResizableBox>
    </Draggable>
  );
}

export default App;
