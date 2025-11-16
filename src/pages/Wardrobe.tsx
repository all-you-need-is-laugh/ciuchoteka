import React, { useState } from 'react';
import ClothingItemCard from '../components/ClothingItemCard';
import ClothingItemForm from '../components/ClothingItemForm';
import { useAppData, useClothingItemStats } from '../hooks/useAppData';
import { ClothingItem } from '../types';
import './Wardrobe.css';

const Wardrobe: React.FC = () => {
  const {
    clothingItems,
    outfits,
    addClothingItem,
    updateClothingItem,
    deleteClothingItem,
    isLoading,
  } = useAppData();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ClothingItem | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const handleAddItem = async (item: Omit<ClothingItem, 'id' | 'dateAdded'>) => {
    addClothingItem(item);
    setIsFormOpen(false);
  };

  const handleUpdateItem = async (item: Omit<ClothingItem, 'id' | 'dateAdded'>) => {
    if (editingItem) {
      updateClothingItem(editingItem.id, item);
      setEditingItem(null);
      setIsFormOpen(false);
    }
  };

  const handleEditClick = (item: ClothingItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (item: ClothingItem) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"? This will also remove it from all outfits.`)) {
      deleteClothingItem(item.id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const filteredItems = filter === 'all'
    ? clothingItems
    : clothingItems.filter(item => item.category === filter);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page wardrobe-page">
      <div className="page-header">
        <h1 className="page-title">Wardrobe</h1>
        <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
          + Add Item
        </button>
      </div>

      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'outerwear' ? 'active' : ''}`}
          onClick={() => setFilter('outerwear')}
        >
          Outerwear
        </button>
        <button
          className={`filter-btn ${filter === 'bottom' ? 'active' : ''}`}
          onClick={() => setFilter('bottom')}
        >
          Bottom
        </button>
        <button
          className={`filter-btn ${filter === 'shoes' ? 'active' : ''}`}
          onClick={() => setFilter('shoes')}
        >
          Shoes
        </button>
        <button
          className={`filter-btn ${filter === 'accessories' ? 'active' : ''}`}
          onClick={() => setFilter('accessories')}
        >
          Accessories
        </button>
        <button
          className={`filter-btn ${filter === 'other' ? 'active' : ''}`}
          onClick={() => setFilter('other')}
        >
          Other
        </button>
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👔</div>
          <div className="empty-state-text">
            {filter === 'all'
              ? 'No clothing items yet. Add your first item!'
              : `No ${filter} items yet.`}
          </div>
        </div>
      ) : (
        <div className="grid">
          {filteredItems.map(item => (
            <ClothingItemCard
              key={item.id}
              item={item}
              stats={useClothingItemStats(item, outfits)}
              onEdit={() => handleEditClick(item)}
              onDelete={() => handleDeleteClick(item)}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <ClothingItemForm
          item={editingItem}
          onSave={editingItem ? handleUpdateItem : handleAddItem}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Wardrobe;
