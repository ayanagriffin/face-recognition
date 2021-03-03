import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        {imageUrl ? (
     
            <img
              id="inputimage"
              src={imageUrl}
              alt="your picture"
              width="500px"
              height="auto"
              onError={(event) => {
                event.target.style = "display: none";
              }}
              onLoad={(event) => {
                event.target.style = "display: block";
              }}
            />

        ) : (
          ""
        )}

        {boxes.map((box, i) => {
          return (
            <div
              className="bounding-box"
              key={i.toString()}
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
