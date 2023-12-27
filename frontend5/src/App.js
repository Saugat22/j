import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './Component/MainLayout';
import Home from './Pages/Home';
import LeagueTable from './Pages/LeagueTable';
import FilterSearch from './Pages/FilterSearch';
import FootballStats from './Pages/FootballStats';
import AverageGoal from './Pages/AverageGoal';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} /> 
            <Route path="league-table" element={<LeagueTable />} />
            <Route path="search" element={<FilterSearch />} />
            <Route path="FootballStats" element={<FootballStats />} />
            <Route path="AverageGoal" element={<AverageGoal />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
