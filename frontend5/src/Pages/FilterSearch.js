

import React, { useState } from 'react';
import axios from 'axios';
import Table from './Table';

const FilterSearch = () => {
  const [searchParams, setSearchParams] = useState({
    wins: ''
  });
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const fetchWinsData = async () => {
    try {
      const response = await axios.get(`/teamsbyWon/${encodeURIComponent(searchParams.wins)}`);
      setData(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching data'); // Update error message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message before new request

    if (searchParams.wins) {
      fetchWinsData();
    } else {
      setData([]); // Clear data if no search criteria is provided
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="wins"
          placeholder="Minimum Wins"
          value={searchParams.wins}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>Error: {error}</p>}
      <Table data={data} />
    </div>
  );
};

export default FilterSearch;

