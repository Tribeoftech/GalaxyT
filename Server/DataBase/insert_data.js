const mongoose = require('mongoose');
const fs = require('fs');
const Galaxy = require('./schema'); // Import the schema

// MongoDB connection URI
const mongoDBAtlasUri = 'mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority';

// Connect to MongoDB database
mongoose.connect(mongoDBAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Read the JSON file containing data to insert
try {
    const jsonData = fs.readFileSync('planet_data.json', 'utf8');
    const galaxiesData = JSON.parse(jsonData);

    // Insert data into MongoDB using the schema
    Galaxy.insertMany(galaxiesData)
        .then(() => {
            console.log('Data inserted successfully');
            // Consider whether to close the connection here
        })
        .catch((error) => {
            console.error('Error inserting data:', error);
        });
} catch (error) {
    console.error('Error reading file:', error);
}
