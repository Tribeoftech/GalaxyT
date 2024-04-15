const express = require("express");
const mongoose = require('mongoose');
const app = express();

mongoDBAtlasUri = 'mongodb+srv://new_user:urgsQzpeKLFY1yWl@cluster0.xnrspad.mongodb.net/Galaxy?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoDBAtlasUri, { useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

port = 2500;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });