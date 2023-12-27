

import React, { useState } from 'react'; // Importing React and the useState hook.
import './NewTeamForm.css'; // Importing CSS for styling.

// NewTeamForm functional component with a prop for handling the addition of new teams.
const NewTeamForm = ({ onTeamAdded }) => {
  // Initial state for the form, defining the structure of the team data.
  const initialFormState = {
    Team: '',
    "Games Played": '',
    Win: '',
    Draw: '',
    Loss: '',
    "Goals For": '',
    "Goals Against": '',
    Points: '',
    Year: '',
  };

  // State hook to manage and update the team data as the form is filled out.
  const [newTeamData, setNewTeamData] = useState(initialFormState);

  // Function to handle changes in the form inputs.
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructuring the name and value from the event target.
    let parsedValue;
    // Condition to check if the input field is 'Team' or 'Year' and parse other fields as integers.
    if (['Team', 'Year'].includes(name)) {
      parsedValue = value;
    } else {
      parsedValue = value === '' ? '' : parseInt(value, 10);
      // Handling NaN values for number fields.
      if (isNaN(parsedValue)) {
        parsedValue = 0; // Setting the value to 0 or an empty string if the parsed value is NaN.
      }
    }
    // Updating the state with the new value for the specific field.
    setNewTeamData(prevData => ({
      ...prevData,
      [name]: parsedValue
    }));
  };

  // Function to handle form submission.
  const handleSubmit = (e) => {
    e.preventDefault(); // Preventing the default form submission behavior.
    // Checking if any field is left empty or has invalid data.
    for (const key in newTeamData) {
      if (newTeamData[key] === '' || (typeof newTeamData[key] === 'number' && isNaN(newTeamData[key]))) {
        alert(`Please fill in the ${key} field correctly.`);
        return; // Exiting the function if validation fails.
      }
    }
    console.log("Submitting Team Data:", newTeamData); // Logging the new team data.
    onTeamAdded(newTeamData); // Calling the onTeamAdded function with the new team data.
    setNewTeamData(initialFormState); // Resetting the form to its initial state.
  };

  // Rendering the form UI.
  return (
    <div className="form-container">
      <h2>Add New Team</h2>
      <form onSubmit={handleSubmit} className="team-form">
        {Object.keys(initialFormState).map((key) => (
          // Mapping over each field in the initialFormState to create form inputs.
          <div key={key} className="form-field">
            <label htmlFor={key}>{key.replace(/_/g, ' ')}</label>
            <input
              id={key}
              type={typeof initialFormState[key] === 'number' ? 'number' : 'text'}
              name={key}
              value={newTeamData[key]}
              onChange={handleChange}
              required
              placeholder={`Enter ${key}`}
              className="input-field"
            />
          </div>
        ))}
        <button type="submit" className="submit-btn">Add Team</button>
      </form>
    </div>
  );
};

export default NewTeamForm; // Exporting the NewTeamForm component.
