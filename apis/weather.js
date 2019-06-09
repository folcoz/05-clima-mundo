
const axios = require('axios');

const API_KEY = require('./api-keys').weather;

let instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    timeout: 10000
});

const fetchWeather = async (lat, lon) => {
    let response = await instance.get('/weather', {
        params: {
            lat,
            lon,
            units: 'metric',
            appid: API_KEY
        }
    });
    return response.data.main;
};

module.exports = {
    service: instance,
    fetchWeather
}