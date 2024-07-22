const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const PropertyRoutes = require('./Routes/Routes.js'); // Ensure the path is correct
const { connectDB } = require('./DBConnection.js');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default to 3000

app.use(cors()); // Enable CORS for all routes
// Configure body-parser
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to MongoDB
connectDB()
    .then(() => {
        // Use the imported routes only after the database connection is established
        app.use('/api', PropertyRoutes); // Add a base path for your routes

        // Start the server
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
    });
