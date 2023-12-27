// MainLayout.js
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <nav className="navbar">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
        <NavLink to="/league-table" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>League Table</NavLink>
        <NavLink to="/search" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Team By Won</NavLink>
        <NavLink to="/FootballStats" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Football Stats Of The Year/Team</NavLink>
        <NavLink to="/AverageGoal" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>AverageGoal Of The Year </NavLink>

      </nav>
      <Outlet />
    </div>
  );
};

export default MainLayout;
