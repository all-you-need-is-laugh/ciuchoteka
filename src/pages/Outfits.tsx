import React, { useState } from 'react';
import OutfitCard from '../components/OutfitCard';
import OutfitForm from '../components/OutfitForm';
import '../pages/Wardrobe.css';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addOutfit, deleteOutfit, updateOutfit } from '../store/slices/outfitsSlice';
import { Outfit } from '../types';
import './Outfits.css';

const Outfits: React.FC = () => {
  const dispatch = useAppDispatch();
  const outfits = useAppSelector(state => state.outfits.items);
  const clothingItems = useAppSelector(state => state.clothingItems.items);
  const isLoading = useAppSelector(state => state.app.isLoading);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOutfit, setEditingOutfit] = useState<Outfit | null>(null);

  const handleAddOutfit = (outfit: Omit<Outfit, 'id'>) => {
    dispatch(addOutfit(outfit));
    setIsFormOpen(false);
  };

  const handleUpdateOutfit = (outfit: Omit<Outfit, 'id'>) => {
    if (editingOutfit) {
      dispatch(updateOutfit({ id: editingOutfit.id, updates: outfit }));
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
      dispatch(deleteOutfit(outfit.id));
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
