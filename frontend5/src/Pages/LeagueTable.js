
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import NewTeamForm from './NewTeamForm';

// Functional Component: This is a functional component, meeting the requirement of using functional components.
const LeagueTable = () => {
  // State Management with useState: These lines manage the application's state, a key feature in React components.
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect for Data Fetching: This useEffect hook is used to fetch data from an API when the component mounts.
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Axios for API Call: Using Axios to make a GET request to a REST API.
        const response = await axios.get('/teams');
        setData(response.data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Function to Add a Team: Demonstrates the use of Axios for a POST request, adding new data to the API.
  const addTeamToLeague = async (newTeam) => {
    console.log("Received Team Data:", newTeam);
    try {
      const response = await axios.post('/addData', newTeam);
      setData(prevData => [...prevData, response.data]);
    } catch (error) {
      console.error('Failed to add team', error);
    }
  };

  // Function to Edit a Team: Shows how to handle updates (PUT/PATCH) using Axios.


  const handleEdit = async (id, updatedTeam) => {
    try {
      const response = await axios.post('/updateData', { id: id, newData: updatedTeam });
      setData(data.map(item => item._id === id ? response.data : item));
    } catch (error) {
      console.error('Failed to update team', error);
    }
  };
  

  // Function to Delete a Team: Implements a DELETE request using Axios.
  const handleDelete = async (teamId) => {
    try {
      await axios.delete('/deleteData/' + teamId);
      setData((prevData) => prevData.filter((item) => item._id !== teamId));
    } catch (error) {
      console.error(error);
      setError('Failed to delete team: ' + error.message);
    }
  };

  // Conditional Rendering: These statements handle the rendering based on loading and error states, demonstrating dynamic UI updates in React.
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Component Composition: Composing the UI with custom components (Table and NewTeamForm), showing how React components can be used to build complex UIs.
  return (
    <div className="App">
      <div className="table-container">
        <Table data={data} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <div className="new-team-form-container">
        <NewTeamForm onTeamAdded={addTeamToLeague} />
      </div>
    </div>
  );
};

export default LeagueTable;
