const express = require('express');
const router = express.Router()
const Football = require('../Modles/Football')

 /* displaying all data */
router.get('/teams', async (req, res) => {
    try {
        const allTeams = await Football.find({});
        res.json(allTeams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

 /* adding new  data */

router.post('/addData', async (req, res) => {
    try {
      const newTeam = new Football(req.body);
      console.log('Received data:', req.body); // Log the received data
      const savedTeam = await newTeam.save();
      console.log('Saved team:', savedTeam); // Log the saved team data
      res.status(201).json(savedTeam);
    } catch (error) {
      console.error('Error in /addData:', error); // Log the error
      res.status(400).json({ error: error.message });
    }
  });
  

/* to update data */
router.post('/updateData', async (req, res) => {
    try {
      const { id, newData } = req.body; // Use a unique identifier like _id
      const result = await Football.findOneAndUpdate(
        { _id: id }, // Find the document by _id
        { $set: newData }, // Update all fields including Team
        { new: true }
      );

      if(!result) {
        return res.status(404).json({ message: 'Team not found' });
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});





/* deleting data */
router.delete('/deleteData/:id', async (req, res) => {
    try {
      const teamId = req.params.id;
  
      // Find and delete the team with the specified ID
      await Football.findByIdAndDelete(teamId);
  
      res.status(200).send('Team deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to delete team');
    }
});


/* displaying  total game played win loss... by Team*/

 router.get('/stat/:Team', async (req, res) => {
    try {
        const team = req.params.Team;
        let matchQuery = { Team: team };

        
        if(req.query.year) {
            matchQuery.Year = parseInt(req.query.year);
        }

        const result = await Football.aggregate([
            {
                $match: matchQuery,
            },
            {
                $group: {
                    _id: null,
                    TotalGamesPlayed: { $sum: '$Games Played' },
                    TotalDraw: { $sum: '$Draw' },
                    TotalWin: { $sum: '$Win' },
                    TotalLoss: { $sum: '$Loss' },
                    TotalGoalsAgainst: { $sum: '$Goals Against' },
                    TotalGoalsFor: { $sum: '$Goals For' },
                    TotalPoints: { $sum: '$Points' },
                    TotalYear: { $addToSet: '$Year' }
                },
            },
        ]);

        if (result.length === 0) {
            return res.status(404).json({ message: "No data found for the specified filters" });
        }

        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 




/* displaying  total game played win loss... by year*/

router.get('/stats/:Year', async (req, res) => {
    try {
        const year = parseInt(req.params.Year);
        const teamName = req.query.teamName; // Get the 'teamName' query parameter

        const matchQuery = { Year: year };

        // Check if there is a 'teamName' query parameter and modify the match query
        if (teamName) {
            matchQuery.Team = teamName;
        }

        const result = await Football.aggregate([
            {
                $match: matchQuery,
            },
            {
                $group: {
                    _id: null,
                    TotalGamesPlayed: { $sum: '$Games Played' },
                    TotalDraw: { $sum: '$Draw' },
                    TotalWin: { $sum: '$Win' },
                    TotalLoss: { $sum: '$Loss' },
                    TotalGoalsAgainst: { $sum: '$Goals Against' },
                    TotalGoalsFor: { $sum: '$Goals For' },
                    TotalPoints: { $sum: '$Points' },
                    Year: { $addToSet: '$Year' }
                },
            },
        ]);

        if (result.length === 0) {
            return res.status(404).json({ message: "No data found for the specified year and team name" });
        }

        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 



/* displaying toal avegra ge goal  game played ....s... by year*/

router.get('/AverageGoal/:Year', async (req, res) => {
    try {
        const year = parseInt(req.params.Year);
        if (isNaN(year)) {
            return res.status(400).json({ error: 'Invalid Year' });
        }

        const result = await Football.aggregate([
            {
                $match: { Year: year }, // Match documents with the specified year
            },
            {
                $group: {
                    _id: '$Team',
                    averageGoalFor: { $avg: '$Goals For' },
                    totalGamesPlayed: { $sum: '$Games Played' },
                    totalDraw: { $sum: '$Draw' },
                    totalWin: { $sum: '$Win' },
                    totalLoss: { $sum: '$Loss' },
                    totalGoalsAgainst: { $sum: '$Goals Against' },
                    totalPoints: { $sum: '$Points' },
                    Year: { $first: '$Year' } // Include this to keep track of the year for each group
                },
            },
        ]);
        res.json(result);
    } catch (error) {
        console.error(error); // It's good to log the error for debugging
        res.status(500).json({ error: error.message });
    }
});


/* displaying displaying team by won.*/

router.get('/teamsbyWon/:wins', async (req, res) => {
    try {
        // Parse the input value as an integer and validate it
        const minValue = parseInt(req.params.wins);
        if (isNaN(minValue)) {
            return res.status(400).json({ error: 'Invalid number of wins provided' });
        }

        // Query the database for teams with wins greater than minValue
        const result = await Football.find({ Win: { $gt: minValue } }).limit(10);

        // Send the query result as a JSON response
        res.json(result);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message }); // Send a descriptive error message
    }
});


module.exports = router;
