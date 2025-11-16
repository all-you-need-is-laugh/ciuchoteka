import React from 'react';
import { ClothingItem, Outfit } from '../types';
import './OutfitCard.css';

interface OutfitCardProps {
  outfit: Outfit;
  clothingItems: ClothingItem[];
  onEdit: () => void;
  onDelete: () => void;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, clothingItems, onEdit, onDelete }) => {
  const outfitItems = clothingItems.filter(item =>
    outfit.clothingItemIds.includes(item.id)
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="outfit-card">
      <div className="outfit-card-image">
        <img src={outfit.photo} alt={`Outfit from ${formatDate(outfit.date)}`} />
      </div>
      <div className="outfit-card-content">
        <div className="outfit-card-header">
          <h3 className="outfit-card-date">{formatDate(outfit.date)}</h3>
          <div className="outfit-card-actions">
            <button className="btn-icon" onClick={onEdit} title="Edit">
              ✏️
            </button>
            <button className="btn-icon" onClick={onDelete} title="Delete">
              🗑️
            </button>
          </div>
        </div>
        <div className="outfit-card-items">
          <p className="outfit-card-items-label">Items:</p>
          <div className="outfit-items-grid">
            {outfitItems.map(item => (
              <div key={item.id} className="outfit-item-thumbnail">
                <img src={item.photo} alt={item.name} title={item.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitCard;
