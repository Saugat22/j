

import React from 'react';

const MyTable = ({ data }) => {
  // Define default data structure
  const defaultData = {
    TotalGamesPlayed: '',
    TotalDraw: '',
    TotalWin: '',
    TotalLoss: '',
    TotalGoalsAgainst: '',
    TotalGoalsFor: '',
    TotalPoints: '',
    Year: ''
  };

  // Use provided data or default data
  const displayData = data || defaultData;

  return (
    <table className="my-table">
      <thead>
        <tr>
   
          {Object.keys(displayData).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
         
          {Object.values(displayData).map((value, index) => (
            <td key={index}>{Array.isArray(value) ? value.join(', ') : value}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default MyTable;
