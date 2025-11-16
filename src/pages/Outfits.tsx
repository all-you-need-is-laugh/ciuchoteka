import React, { useState } from 'react';
import OutfitCard from '../components/OutfitCard';
import OutfitForm from '../components/OutfitForm';
import { useAppData } from '../hooks/useAppData';
import '../pages/Wardrobe.css';
import { Outfit } from '../types';
import './Outfits.css';

const Outfits: React.FC = () => {
  const { outfits, clothingItems, addOutfit, updateOutfit, deleteOutfit, isLoading } = useAppData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOutfit, setEditingOutfit] = useState<Outfit | null>(null);

  const handleAddOutfit = (outfit: Omit<Outfit, 'id'>) => {
    addOutfit(outfit);
    setIsFormOpen(false);
  };

  const handleUpdateOutfit = (outfit: Omit<Outfit, 'id'>) => {
    if (editingOutfit) {
      updateOutfit(editingOutfit.id, outfit);
      setEditingOutfit(null);
      setIsFormOpen(false);
    }
  };

  const handleEditClick = (outfit: Outfit) => {
    setEditingOutfit(outfit);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (outfit: Outfit) => {
    if (window.confirm('Are you sure you want to delete this outfit?')) {
      deleteOutfit(outfit.id);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingOutfit(null);
  };

  const sortedOutfits = [...outfits].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page outfits-page">
      <div className="page-header">
        <h1 className="page-title">Outfits</h1>
        <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
          + Add Outfit
        </button>
      </div>

      {sortedOutfits.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📸</div>
          <div className="empty-state-text">No outfits yet. Create your first outfit!</div>
        </div>
      ) : (
        <div className="outfits-list">
          {sortedOutfits.map(outfit => (
            <OutfitCard
              key={outfit.id}
              outfit={outfit}
              clothingItems={clothingItems}
              onEdit={() => handleEditClick(outfit)}
              onDelete={() => handleDeleteClick(outfit)}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <OutfitForm
          outfit={editingOutfit}
          clothingItems={clothingItems}
          onSave={editingOutfit ? handleUpdateOutfit : handleAddOutfit}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Outfits;
