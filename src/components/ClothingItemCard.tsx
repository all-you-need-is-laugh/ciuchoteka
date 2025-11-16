import React from 'react';
import { useClothingItemStats } from '../hooks/useAppData';
import { useAppSelector } from '../store/hooks';
import { ClothingItem } from '../types';
import './ClothingItemCard.css';

interface ClothingItemCardProps {
  item: ClothingItem;
  onEdit: () => void;
  onDelete: () => void;
}

const ClothingItemCard: React.FC<ClothingItemCardProps> = ({ item, onEdit, onDelete }) => {
  const outfits = useAppSelector(state => state.outfits.items);
  const stats = useClothingItemStats(item, outfits);
  return (
    <div className="clothing-card">
      <div className="clothing-card-image">
        <img src={item.photo} alt={item.name} />
      </div>
      <div className="clothing-card-content">
        <h3 className="clothing-card-name">{item.name}</h3>
        <p className="clothing-card-category">{item.category}</p>
        <p className="clothing-card-stats">Worn: {stats.timesWorn}x</p>
        {item.cost && (
          <p className="clothing-card-cost">
            ${item.cost.toFixed(2)}
            {stats.costPerWear && ` (${stats.costPerWear.toFixed(2)}/wear)`}
          </p>
        )}
      </div>
      <div className="clothing-card-actions">
        <button className="btn-icon" onClick={onEdit} title="Edit">
          ✏️
        </button>
        <button className="btn-icon" onClick={onDelete} title="Delete">
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ClothingItemCard;
