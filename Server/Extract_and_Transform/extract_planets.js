// Fetch and store planet data

// Require module
const request = require('request');
const fs = require('fs');

// Planets array and empty dict
const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
let planetData = {};
// API Key
const apiKey = 'LWAlV9HqT5NvybZq/V2oRQ==PG3xR4eLwJqp6NoE';

// Get call to fetch planet information from API
function getPlanetInfo(planet) {
    return new Promise((resolve, reject) => {
        request.get({
            url: 'https://api.api-ninjas.com/v1/planets?name=' + planet,
            headers: {
              'X-Api-Key': apiKey
            },
        }, function(error, response, body) {
            if(error) return reject(error);
            else if(response.statusCode != 200) return reject('Error:', response.statusCode, body.toString('utf8'));
            planetData[planet] = JSON.parse(body);
            console.log(planet, body);
            resolve();
        });
    });
}

function transformPlanets(data) {
    let trans_planets = {};

    for (planet in data) {
        // Clean copy of data to new object
        trans_planets[planet] = data[planet][0];
        // Mass realation with earth mass
        trans_planets[planet]['mass'] = trans_planets[planet]['mass'] * 317.8;
        // Radius relation with earth
        trans_planets[planet]['radius'] = trans_planets[planet]['radius'] * 11.142;
        // Temp. kelvin to farhenheit
        trans_planets[planet]['temperature'] = (trans_planets[planet]['temperature'] - 273.15) * 1.8 + 32;
        // Calculating surface area
        radius = trans_planets[planet]['radius'];
        const pi = Math.PI;
        let surface_area = 4 * pi * Math.pow(radius, 2);
        trans_planets[planet]['surface_area'] = surface_area / 12.41;
        // Dividing for lots
        trans_planets[planet]['Lots'] = trans_planets[planet]['surface_area'] * 639370;
        trans_planets[planet]['Prices'] = 100;
    }

    const json_planets = JSON.stringify(trans_planets);
    
    fs.writeFile("planet_data.json", json_planets, (error) => {
        // throwing the error
        // in case of a writing problem
        if (error) {
          // logging the error
          console.error(error);
      
          throw error;
        }
      
        console.log("data.json written correctly");
      });
    
}

// Using Promise.all to wait for all requests to complete
Promise.all(planets.map(planet => getPlanetInfo(planet)))
    .then(() => {
        console.log('planetdta:', planetData);
        console.log('All planet data extracted');
        transformPlanets(planetData);
    })
    .catch(error => {
        console.error('Error:', error);
    });

