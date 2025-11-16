import React, { useRef, useState } from 'react';
import './ImageUpload.css';

interface ImageUploadProps {
  photo: string;
  onPhotoChange: (photo: string) => void;
  onError: (error: string) => void;
  compressImage: (file: File) => Promise<string>;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  photo,
  onPhotoChange,
  onError,
  compressImage,
  disabled = false,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const commonInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    onError('');

    try {
      const compressedImage = await compressImage(file);
      onPhotoChange(compressedImage);
    } catch (err) {
      onError('Failed to process image. Please try another image.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  const handleGalleryClick = () => {
    galleryInputRef.current?.click();
  };

  const handleCommonClick = () => {
    commonInputRef.current?.click();
  };

  return (
    <div className="image-upload">
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageSelect}
        style={{ display: 'none' }}
        disabled={disabled || isProcessing}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        style={{ display: 'none' }}
        disabled={disabled || isProcessing}
      />
      <input
        ref={commonInputRef}
        type="file"
        accept="image/*"
        capture
        onChange={handleImageSelect}
        style={{ display: 'none' }}
        disabled={disabled || isProcessing}
      />

      <div className="image-upload-buttons">
        <button
          type="button"
          className="btn btn-upload"
          onClick={handleCameraClick}
          disabled={disabled || isProcessing}
        >
          📷 Take Photo
        </button>
        <button
          type="button"
          className="btn btn-upload"
          onClick={handleGalleryClick}
          disabled={disabled || isProcessing}
        >
          🖼️ Choose from Gallery
        </button>
      </div>

      <div className="image-upload-buttons">
        <button
          type="button"
          className="btn btn-upload"
          onClick={handleCommonClick}
          disabled={disabled || isProcessing}
        >
          📷 Choose a photo
        </button>
      </div>

      {photo && (
        <div className="image-preview">
          <img src={photo} alt="Preview" />
        </div>
      )}
      {isProcessing && <p className="processing-text">Processing image...</p>}
    </div>
  );
};

export default ImageUpload;
