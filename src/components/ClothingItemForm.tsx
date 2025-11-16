import React, { useState } from 'react';
import { ClothingCategory, ClothingItem } from '../types';
import { compressClothingImage } from '../utils/imageCompression';
import './ClothingItemForm.css';
import ImageUpload from './ImageUpload';

interface ClothingItemFormProps {
  item: ClothingItem | null;
  onSave: (item: Omit<ClothingItem, 'id' | 'dateAdded'>) => void;
  onCancel: () => void;
}

const ClothingItemForm: React.FC<ClothingItemFormProps> = ({ item, onSave, onCancel }) => {
  const [name, setName] = useState(item?.name || '');
  const [category, setCategory] = useState<ClothingCategory>(item?.category || 'other');
  const [type, setType] = useState(item?.type || '');
  const [cost, setCost] = useState(item?.cost?.toString() || '');
  const [photo, setPhoto] = useState(item?.photo || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    if (!type.trim()) {
      setError('Please enter a type');
      return;
    }

    if (!photo) {
      setError('Please add a photo');
      return;
    }

    onSave({
      name: name.trim(),
      category,
      type: type.trim(),
      cost: cost ? parseFloat(cost) : undefined,
      photo,
    });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{item ? 'Edit Item' : 'Add Item'}</h2>
          <button className="modal-close" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Photo *</label>
            <ImageUpload
              photo={photo}
              onPhotoChange={setPhoto}
              onError={setError}
              compressImage={compressClothingImage}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="e.g., Blue Denim Jacket"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ClothingCategory)}
              className="form-select"
            >
              <option value="outerwear">Outerwear</option>
              <option value="bottom">Bottom</option>
              <option value="shoes">Shoes</option>
              <option value="accessories">Accessories</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Type *</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="form-input"
              placeholder="e.g., Jacket, Jeans, Sneakers"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Cost (optional)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="form-input"
              placeholder="0.00"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {item ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClothingItemForm;
