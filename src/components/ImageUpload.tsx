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
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleCommonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="image-upload">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        style={{ display: 'none' }}
        disabled={disabled || isProcessing}
      />

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
