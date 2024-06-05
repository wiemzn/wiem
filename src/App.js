import React, { useState, useRef } from 'react';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import ComparisonTable from './components/ComparisonTable';
import ImageContainerRow from './components/ImageContainerRow';
import CameraCapture from './components/CameraCapture';
import './App.css';

function App() {
  const data = [
    { fullName: 'Maryem', idNumber: '128 273 43', birthday: '14 janv 2002', address: 'Sousse' },
  ];
  
  const [images, setImages] = useState([null, null]);
  const [showComparison, setShowComparison] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const openCamera = () => {
    setIsCameraOpen(true);
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasRef.current.toBlob(blob => {
      const newFile = new File([blob], "camera-photo.png", {
        type: "image/png",
        lastModified: Date.now(),
      });
      setImages(prevImages => [newFile, ...prevImages.slice(1)]);
      setIsCameraOpen(false);
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }, "image/png");
  };

  return (
    <div className="image-upload-container">
      <Header />
      <h1>Facial recognition system</h1>
      <p>Max image size after processing: 25 megapixels</p>
      <ImageUpload images={images} setImages={setImages} openCamera={openCamera} />
      <button
        className="comp"
        onClick={() => setShowComparison(true)}
      >
        comparer
      </button>
      {showComparison && (
        <>
          <ComparisonTable data={data} />
          <ImageContainerRow />
        </>
      )}
      {isCameraOpen && (
        <CameraCapture
          isCameraOpen={isCameraOpen}
          capturePhoto={capturePhoto}
          setIsCameraOpen={setIsCameraOpen}
          videoRef={videoRef}
          canvasRef={canvasRef}
        />
      )}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
}

export default App;
