import React, { useRef } from "react";
import "./CameraCapture.css";

function CameraCapture({ isCameraOpen, capturePhoto, setIsCameraOpen }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  if (isCameraOpen) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(err => console.error("Error accessing camera: ", err));
  }

  const stopCamera = () => {
    setIsCameraOpen(false);
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
  };

  return (
    <div className="camera-container">
      {isCameraOpen && (
        <>
          <video ref={videoRef} className="video-feed"></video>
          <button onClick={() => capturePhoto(canvasRef)} className="capture-button">Capture</button>
          <button onClick={stopCamera} className="stop-button">Stop</button>
        </>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
}

export default CameraCapture;