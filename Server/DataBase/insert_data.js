const mongoose = require('mongoose');
const fs = require('fs');
const Galaxy = require('./schema'); // Import the schema

// MongoDB connection URI
const mongoDBAtlasUri = '';

// Connect to MongoDB database
mongoose.connect(mongoDBAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Read the JSON file containing data to insert
const jsonData = fs.readFileSync('planet_data.json', 'utf8');
const galaxiesData = JSON.parse(jsonData);

// Insert data into MongoDB using the schema
Galaxy.insertMany(galaxiesData)
  .then(() => {
    console.log('Data inserted successfully');
    mongoose.connection.close(); // Close the connection after inserting data
  })
  .catch((error) => {
    console.error('Error inserting data:', error);
  });