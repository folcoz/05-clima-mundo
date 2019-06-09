const axios = require('axios');

const API_KEY = require('./api-keys').geolocation;

let instance = axios.create({
    baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php',
    timeout: 10000,
    headers: {'X-RapidAPI-Key': API_KEY}
});

const geolocate = async (location) => {
    let response = await instance.get('', {
        params: {
            location
        }
    });
    let result = response.data.Results[0];
    if (!result) {
        throw new Error(`Unable to geolocate ${location}`);
    } else {
        return {
            location,
            lat: Number(result.lat),
            lon: Number(result.lon)
        };
    }
};

module.exports = {
    service: instance,
    geolocate
}