const mongoose = require('mongoose');

// Define the schema for the collection
const galaxySchema = new mongoose.Schema({
  name: String,
  type: String,
  distanceFromEarth: Number,
  diameter: Number,
  numberOfStars: Number,
});

// Create a model based on the schema
const Galaxy = mongoose.model('Galaxy', galaxySchema);

// Export the model so it can be used in other files
module.exports = Galaxy;