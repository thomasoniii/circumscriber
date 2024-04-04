import { useState } from "react";
import "./App.css";

import { Circumscriber } from "./Circumscriber";

function App() {
  const [numCircles, setNumCircles] = useState(0);
  const [radius, setRadius] = useState(495);
  const [angleOffset, setAngleOffset] = useState(-90);
  const [rotationalSpeed, setRotationalSpeed] = useState(1);
  const [recursive, setRecursive] = useState(false);
  const [doubleRecursive, setDoubleRecursive] = useState(false);

  return (
    <div className="ui">
      <Circumscriber
        radius={radius}
        circles={numCircles}
        recursive={recursive}
        doubleRecursive={doubleRecursive}
        angleOffset={angleOffset}
        rotationalSpeed={rotationalSpeed}
        width={1000}
        height={1000}
      />
      <div className="toolbox">
        <div className="toolbox-item">
          <span>Num circles :</span>
          <input
            type="number"
            value={numCircles}
            onChange={(e) => setNumCircles(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="toolbox-item">
          <span>Radius :</span>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="toolbox-item">
          <span>Angle offset :</span>
          <input
            type="number"
            value={angleOffset}
            onChange={(e) => setAngleOffset(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="toolbox-item">
          <span>Rotataional speed :</span>
          <input
            type="number"
            value={rotationalSpeed}
            onChange={(e) => setRotationalSpeed(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="toolbox-item">
          <span>Recursive :</span>
          <input
            type="checkbox"
            checked={recursive}
            onChange={() => setRecursive(!recursive)}
          />
        </div>
        <div className="toolbox-item">
          <span>Double Recursive :</span>
          <input
            type="checkbox"
            checked={doubleRecursive}
            onChange={() => setDoubleRecursive(!doubleRecursive)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
