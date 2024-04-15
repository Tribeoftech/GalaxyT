const { cacheData, getCachedData } = require('./cache');

// Define your Express app or any other application setup
const express = require('express');
const app = express();

// Example route to cache data
app.get('/cacheData', (req, res) => {
    // Assuming you have some data to cache, replace this with your actual data
    const dataToCache = { key: 'value' };
    cacheData(dataToCache);
    res.send('Data cached successfully!');
});

// Example route to get cached data
app.get('/getCachedData', (req, res) => {
    const cachedData = getCachedData();
    res.json(cachedData);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port 4000`);
});
