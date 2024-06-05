import React from "react";
import "./ImageContainerRow.css";

function ImageContainerRow() {
  return (
    <div className="image-container-row">
      <div className="image-container">
        <img src="Group 26.png" alt="Description de l'image 1" />
        
      </div>
      <div className="image-container">
        <img src="Group 27.png" alt="Description de l'image 2" />
        
      </div>
      <div className="image-container">
        <img src="Frame 4.png" alt="Description de l'image 3" />
        
      </div>
    </div>
  );
}

export default ImageContainerRow;