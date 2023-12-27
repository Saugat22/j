
import React, { useState } from 'react';
import axios from 'axios';
import AverageTable from './AverageTable';


function AverageGoal() {
    const [year, setYear] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            const response = await axios.get(`/AverageGoal/${year}`);
            setData(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching data');
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input 
                    type="number" 
                    value={year} 
                    onChange={handleYearChange} 
                    placeholder="Enter Year" 
                />
                <button type="submit">Search</button>
            </form>
            {error && <div>{error}</div>}
            {data && (
                <div>
                    <h2>Average Goal for {year}</h2>
                    <AverageTable data={data} />
                </div>
            )}
        </div>
    );
}

export default AverageGoal;

