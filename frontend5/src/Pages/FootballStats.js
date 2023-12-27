
import React, { useState } from 'react';
import axios from 'axios';
import StatsTable from './StatsTable'; // Importing the StatsTable component.

const FootballStats = () => {
  // State hooks to manage the team name, year, statistics, and any errors.
  const [teamName, setTeamName] = useState('');
  const [year, setYear] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStats(null); // Resetting stats before making a new request.

    try {
      let url = '';
      // Building the URL based on the input provided.
      if (teamName && !year) {
        // If only teamName is provided.
        url = `/stat/${encodeURIComponent(teamName)}`;
      } else if (year && !teamName) {
        // If only year is provided.
        url = `/stats/${encodeURIComponent(year)}`;
      } else if (year && teamName) {
        // If both year and teamName are provided.
        url = `/stats/${encodeURIComponent(year)}?teamName=${encodeURIComponent(teamName)}`;
      } else {
        // Error handling if neither year nor team name is provided.
        throw new Error('Please enter a year or a team name');
      }

      // Making an Axios GET request to the built URL.
      const response = await axios.get(url);
      const data = response.data;

      // Checking if data is returned from the API.
      if (!data || data.length === 0) {
        throw new Error('No data found');
      }
      setStats(data); // Setting the retrieved statistics to the state.
    } catch (err) {
      // Error handling for the Axios request.
      setError(`Error: ${err.response ? err.response.data.message : err.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Search By Year"
        />
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Search By Team"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p>{error}</p>} 
      {stats && <StatsTable data={stats} />} 
    </div>
  );
};

export default FootballStats;

