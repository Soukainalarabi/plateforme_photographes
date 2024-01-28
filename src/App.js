import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Home from './pages/Home';
import Photographer from './pages/Photographer';
import Erreur from './pages/Erreur';
import Banner from './components/Banner';

export default function App() {
  return (
    <div className="container">
      <React.StrictMode>
        <HashRouter>
          <Banner />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/photographer/:id" element={<Photographer />} />
            <Route path="*" element={<Erreur />} />
          </Routes>
        </HashRouter>
      </React.StrictMode>
    </div>
  );
}