import React from 'react';

function FootballStatsTable({ data }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Team</th>
                    <th>Average Goals For</th>
                    <th>Total Games Played</th>
                    <th>Total Draw</th>
                    <th>Total Win</th>
                    <th>Total Loss</th>
                    <th>Total Goals Against</th>
                    <th>Total Points</th>
                    <th>Year</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.averageGoalFor}</td>
                        <td>{item.totalGamesPlayed}</td>
                        <td>{item.totalDraw}</td>
                        <td>{item.totalWin}</td>
                        <td>{item.totalLoss}</td>
                        <td>{item.totalGoalsAgainst}</td>
                        <td>{item.totalPoints}</td>
                        <td>{item.Year}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default FootballStatsTable;
