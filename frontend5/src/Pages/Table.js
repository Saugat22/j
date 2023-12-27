

import React, { useState } from 'react';

// Component for rendering the league table
const Table = ({ data, onEdit, onDelete }) => {
  // State for managing edit mode and form data
  const [editRowId, setEditRowId] = useState(null);
  const [editFormData, setEditFormData] = useState({});


  const handleEditClick = (team) => {
    setEditRowId(team._id);
    setEditFormData({ ...team });
  };

  const handleCancelClick = () => {
    setEditRowId(null);
  };

  const handleInputChange = (event, field) => {
    setEditFormData({ ...editFormData, [field]: event.target.value });
  };

  const handleSaveClick = () => {
    onEdit(editRowId, editFormData);
    setEditRowId(null);
  };

  const renderCell = (team, field) => {
    return editRowId === team._id ? (
      <input 
        type={field === 'Team' ? 'text' : 'number'}
        value={editFormData[field]}
        onChange={(e) => handleInputChange(e, field)}
      />
    ) : (
      <span>{team[field]}</span>
    );
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Games Played</th>
          <th>Win</th>
          <th>Draw</th>
          <th>Loss</th>
          <th>Goals For</th>
          <th>Goals Against</th>
          <th>Points</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((team) => (
          <tr key={team._id}>
            <td>{renderCell(team, 'Team')}</td>
            <td>{renderCell(team, 'Games Played')}</td>
            <td>{renderCell(team, 'Win')}</td>
            <td>{renderCell(team, 'Draw')}</td>
            <td>{renderCell(team, 'Loss')}</td>
            <td>{renderCell(team, 'Goals For')}</td>
            <td>{renderCell(team, 'Goals Against')}</td>
            <td>{renderCell(team, 'Points')}</td>
            <td>{renderCell(team, 'Year')}</td>
            <td>
              {editRowId === team._id ? (
                <>
                  <button onClick={handleSaveClick}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                </>
              ) : (
                <button onClick={() => handleEditClick(team)}>Edit</button>
              )}
              <button onClick={() => onDelete(team._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
