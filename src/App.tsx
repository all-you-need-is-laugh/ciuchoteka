import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import './index.css';
import Outfits from './pages/Outfits';
import Statistics from './pages/Statistics';
import Wardrobe from './pages/Wardrobe';

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/ciuchoteka">
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Wardrobe />} />
            <Route path="/outfits" element={<Outfits />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
};

export default App;
