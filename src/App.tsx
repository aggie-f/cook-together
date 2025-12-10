import { useState } from 'react';
import { Home } from './pages/home/Home';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components/navigation/Navigation';
import { RecipePage } from './pages/recipePage/RecipePage';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('pasta');

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home query={searchQuery} />} />
        <Route path="/recipes/:id" element={<RecipePage />} />
        {/* other routes */}
      </Routes>
    </div>
  );
};
