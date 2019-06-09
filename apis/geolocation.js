const axios = require('axios');

const API_KEY = '0beba1c2bdmsha3008ebb0d15d04p1ae854jsn64b35c297da3';

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