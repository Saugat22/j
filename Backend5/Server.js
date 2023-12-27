require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

// Using express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Requiring data from football routes
const FootballRouter = require('./routes/Footballroutes');

// Using router for the app
app.use(FootballRouter);

// Connect to the database through ENV PORT
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // Listening to our port only if our database is connected
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error(error);
});
