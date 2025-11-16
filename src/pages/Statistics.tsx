import React, { useState } from 'react';
import { useAppData, useGeneralStats } from '../hooks/useAppData';
import '../pages/Wardrobe.css';
import './Statistics.css';

const Statistics: React.FC = () => {
  const {
    clothingItems,
    outfits,
    exportData,
    importData,
    clearAllData,
    storageUsage,
    isLoading
  } = useAppData();

  const stats = useGeneralStats(clothingItems, outfits);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await importData(file);
      alert('Data imported successfully!');
    } catch (error) {
      alert('Failed to import data. Please check the file format.');
    }
    // Reset input
    e.target.value = '';
  };

  const handleClearData = () => {
    clearAllData();
    setShowConfirm(false);
    alert('All data has been cleared.');
  };

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page statistics-page">
      <div className="page-header">
        <h1 className="page-title">Statistics</h1>
      </div>

      {/* Storage Warning */}
      {storageUsage > 80 && (
        <div className="storage-warning">
          ⚠️ Storage is {storageUsage.toFixed(0)}% full. Consider exporting and clearing old data.
        </div>
      )}

      {/* General Stats */}
      <section className="stats-section">
        <h2 className="stats-section-title">Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.totalItems}</div>
            <div className="stat-label">Total Items</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{formatCurrency(stats.totalCost)}</div>
            <div className="stat-label">Total Cost</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{outfits.length}</div>
            <div className="stat-label">Total Outfits</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{storageUsage.toFixed(0)}%</div>
            <div className="stat-label">Storage Used</div>
          </div>
        </div>
      </section>

      {/* Most Worn Items */}
      {stats.mostWornItems.length > 0 && (
        <section className="stats-section">
          <h2 className="stats-section-title">Most Worn Items</h2>
          <div className="items-list">
            {stats.mostWornItems.map(itemStat => (
              <div key={itemStat.item.id} className="stat-item">
                <div className="stat-item-image">
                  <img src={itemStat.item.photo} alt={itemStat.item.name} />
                </div>
                <div className="stat-item-content">
                  <h3 className="stat-item-name">{itemStat.item.name}</h3>
                  <p className="stat-item-detail">Worn {itemStat.timesWorn}x</p>
                  {itemStat.costPerWear && (
                    <p className="stat-item-detail">
                      {formatCurrency(itemStat.costPerWear)} per wear
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Least Worn Items */}
      {stats.leastWornItems.length > 0 && (
        <section className="stats-section">
          <h2 className="stats-section-title">Least Worn Items</h2>
          <div className="items-list">
            {stats.leastWornItems.filter(item => item.timesWorn === 0).map(itemStat => (
              <div key={itemStat.item.id} className="stat-item">
                <div className="stat-item-image">
                  <img src={itemStat.item.photo} alt={itemStat.item.name} />
                </div>
                <div className="stat-item-content">
                  <h3 className="stat-item-name">{itemStat.item.name}</h3>
                  <p className="stat-item-detail">Never worn</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Data Management */}
      <section className="stats-section">
        <h2 className="stats-section-title">Data Management</h2>
        <div className="management-buttons">
          <button className="btn btn-secondary" onClick={exportData}>
            📤 Export Data
          </button>
          <label className="btn btn-secondary">
            📥 Import Data
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
          <button className="btn btn-danger" onClick={() => setShowConfirm(true)}>
            🗑️ Clear All Data
          </button>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Confirm Clear Data</h2>
              <button className="modal-close" onClick={() => setShowConfirm(false)}>×</button>
            </div>
            <p style={{ marginBottom: '1.5rem' }}>
              Are you sure you want to clear all data? This action cannot be undone.
            </p>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleClearData}>
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
