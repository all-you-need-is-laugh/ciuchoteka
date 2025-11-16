import imageCompression from 'browser-image-compression';

/**
 * Compression options for clothing item photos
 */
const CLOTHING_ITEM_OPTIONS = {
  maxSizeMB: 0.08, // 80KB maximum
  maxWidthOrHeight: 600,
  useWebWorker: true,
  fileType: 'image/jpeg' as const,
  initialQuality: 0.7,
};

/**
 * Compression options for outfit photos
 */
const OUTFIT_OPTIONS = {
  maxSizeMB: 0.08, // 80KB maximum
  maxWidthOrHeight: 800,
  useWebWorker: true,
  fileType: 'image/jpeg' as const,
  initialQuality: 0.7,
};

/**
 * Converts a File or Blob to base64 string
 * @param file - The file to convert
 * @returns Promise with base64 encoded string
 */
const fileToBase64 = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * Compresses an image file for clothing items
 * @param file - The image file to compress
 * @returns Promise with base64 encoded compressed image
 */
export const compressClothingImage = async (file: File): Promise<string> => {
  try {
    const compressedFile = await imageCompression(file, CLOTHING_ITEM_OPTIONS);
    return await fileToBase64(compressedFile);
  } catch (error) {
    console.error('Error compressing clothing image:', error);
    throw new Error('Failed to compress image');
  }
};

/**
 * Compresses an image file for outfits
 * @param file - The image file to compress
 * @returns Promise with base64 encoded compressed image
 */
export const compressOutfitImage = async (file: File): Promise<string> => {
  try {
    const compressedFile = await imageCompression(file, OUTFIT_OPTIONS);
    return await fileToBase64(compressedFile);
  } catch (error) {
    console.error('Error compressing outfit image:', error);
    throw new Error('Failed to compress image');
  }
};

/**
 * Gets approximate size of base64 string in bytes
 * @param base64String - Base64 encoded string
 * @returns Size in bytes
 */
export const getBase64Size = (base64String: string): number => {
  // Remove data URL prefix if present
  const base64Data = base64String.split(',')[1] || base64String;
  // Calculate size: (length * 3/4) - padding
  const padding = (base64Data.match(/=/g) || []).length;
  return (base64Data.length * 3) / 4 - padding;
};

/**
 * Formats bytes to human readable string
 * @param bytes - Number of bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
