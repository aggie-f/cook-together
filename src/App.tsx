import { useState } from 'react';
import { Home } from './components/home/Home';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components/navigation/Navigation';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('pasta');

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home query={searchQuery} />} />
        {/* other routes */}
      </Routes>
    </div>
  );
};
