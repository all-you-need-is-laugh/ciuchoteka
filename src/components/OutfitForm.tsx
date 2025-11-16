import React, { useRef, useState } from 'react';
import { ClothingItem, Outfit } from '../types';
import { compressOutfitImage } from '../utils/imageCompression';
import './OutfitForm.css';

interface OutfitFormProps {
  outfit: Outfit | null;
  clothingItems: ClothingItem[];
  onSave: (outfit: Omit<Outfit, 'id'>) => void;
  onCancel: () => void;
}

const OutfitForm: React.FC<OutfitFormProps> = ({ outfit, clothingItems, onSave, onCancel }) => {
  const [photo, setPhoto] = useState(outfit?.photo || '');
  const [date, setDate] = useState(outfit?.date.split('T')[0] || new Date().toISOString().split('T')[0]);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(outfit?.clothingItemIds || []);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError('');

    try {
      const compressedImage = await compressOutfitImage(file);
      setPhoto(compressedImage);
    } catch (err) {
      setError('Failed to process image. Please try another image.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItemIds(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo) {
      setError('Please add a photo');
      return;
    }

    if (selectedItemIds.length === 0) {
      setError('Please select at least one clothing item');
      return;
    }

    const isoDate = new Date(date).toISOString();

    onSave({
      photo,
      date: isoDate,
      clothingItemIds: selectedItemIds,
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content outfit-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{outfit ? 'Edit Outfit' : 'Add Outfit'}</h2>
          <button className="modal-close" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Photo *</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageSelect}
              className="form-input"
              disabled={isProcessing}
            />
            {photo && (
              <div className="image-preview">
                <img src={photo} alt="Preview" />
              </div>
            )}
            {isProcessing && <p className="processing-text">Processing image...</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Select Clothing Items *</label>
            {clothingItems.length === 0 ? (
              <p className="no-items-text">No clothing items available. Add some items first!</p>
            ) : (
              <div className="items-selection-grid">
                {clothingItems.map(item => (
                  <div
                    key={item.id}
                    className={`selectable-item ${selectedItemIds.includes(item.id) ? 'selected' : ''}`}
                    onClick={() => toggleItemSelection(item.id)}
                  >
                    <img src={item.photo} alt={item.name} />
                    <div className="selectable-item-overlay">
                      {selectedItemIds.includes(item.id) && <span className="check-mark">✓</span>}
                    </div>
                    <p className="selectable-item-name">{item.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isProcessing || clothingItems.length === 0}
            >
              {outfit ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OutfitForm;
