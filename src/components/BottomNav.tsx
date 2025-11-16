import React from 'react';
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const BottomNav: React.FC = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">👔</span>
        <span className="nav-label">Wardrobe</span>
      </NavLink>
      <NavLink to="/outfits" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">📸</span>
        <span className="nav-label">Outfits</span>
      </NavLink>
      <NavLink to="/statistics" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
        <span className="nav-icon">📊</span>
        <span className="nav-label">Statistics</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
