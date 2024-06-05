import React, { useRef } from 'react';
import './ImageUpload.css';

function ImageUpload({ images, setImages, openCamera, handleExtraFileChange }) {
  const hiddenFileInput = useRef(null);
  const hiddenFileInput2 = useRef(null);
  const hiddenFileInput3 = useRef(null);

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            if (!blob) return;
            const newFile = new File([blob], file.name, {
              type: "image/png",
              lastModified: Date.now(),
            });
            const updatedImages = [...images];
            updatedImages[index] = newFile;
            setImages(updatedImages);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const handleAddFileClick = () => {
    hiddenFileInput3.current.click();
  };

  const handleClick = (index) => {
    if (index === 0) {
      hiddenFileInput.current.click();
    } else {
      hiddenFileInput2.current.click();
    }
  };

  const handleMultipleFileChange = (event) => {
    const files = Array.from(event.target.files).slice(0, 2);
    const newImages = [...images];

    files.forEach((file, idx) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxSize = Math.max(img.width, img.height);
          canvas.width = maxSize;
          canvas.height = maxSize;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(
            img,
            (maxSize - img.width) / 2,
            (maxSize - img.height) / 2
          );
          canvas.toBlob(
            (blob) => {
              if (!blob) return;
              const newFile = new File([blob], file.name, {
                type: "image/png",
                lastModified: Date.now(),
              });
              if (!newImages[0]) {
                newImages[0] = newFile;
              } else if (!newImages[1]) {
                newImages[1] = newFile;
              }
              setImages(newImages);
            },
            "image/jpeg",
            0.8
          );
        };
      };
    });
  };

  return (
    <div className="box-decoration">
      <div className="head">
        <div className="image-container" onClick={() => handleClick(0)}>
          <img src="file-plus (1) 1.png" alt="Upload" className="icon" />
          <div className="text1">Upload</div>
        </div>
        <div className="image-container" onClick={openCamera}>
          <img src="camera (1) 1.png" alt="Camera" className="icon" />
          <div className="text">Camera</div>
        </div>
      </div>
      <div className="cadre">
        <label htmlFor="image-upload-input" className="image-upload-label"></label>
        <div onClick={() => handleClick(0)} style={{ cursor: "pointer" }}>
          <div className="images-preview">
            {images[0] ? (
              <img src={URL.createObjectURL(images[0])} alt="first upload" className="img-display" />
            ) : (
              <img src="up.png" alt="first upload" className="img" id="img1" />
            )}
          </div>
          {images[0] ? (
            ""
          ) : (
            <span className="white-text">drag and drop your image</span>
          )}
          <input
            id="image-upload-input"
            type="file"
            onChange={(e) => handleImageChange(e, 0)}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </div>

        {images[0] && (
          <>
            <label htmlFor="image-upload-input-2" className="image-upload-label"></label>
            <div onClick={() => handleClick(1)} style={{ cursor: "pointer" }}>
              <div className="images-preview">
                {images[1] ? (
                  <img src={URL.createObjectURL(images[1])} alt="second upload" className="img-display" />
                ) : (
                  <img src="./up.png" alt="second upload" className="img" id="img2" />
                )}
              </div>
              <input
                id="image-upload-input-2"
                type="file"
                onChange={(e) => handleImageChange(e, 1)}
                ref={hiddenFileInput2}
                style={{ display: "none" }}
              />
            </div>
          </>
        )}

        {images[0] && images[1] ? null : (
          <button
            className="image-upload-button"
            onClick={handleAddFileClick}
          >
            browse your files
          </button>
        )}

        <input
          id="extra-image-upload-input"
          type="file"
          multiple
          onChange={handleMultipleFileChange}
          ref={hiddenFileInput3}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
}

export default ImageUpload;
