const express = require("express");
const mongoose = require('mongoose');
const app = express();

mongoDBAtlasUri = 'mongodb://localhost:27017';

mongoose.connect(mongoDBAtlasUri, { useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

port = 8000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });