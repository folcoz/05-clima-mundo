
const {geolocate} = require('./apis/geolocation');
const {fetchWeather} = require('./apis/weather');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).help().argv;

const mostrarTemperatura = async (direccion) => {
    const failed = () => console.log(`No se pudo determinar la temperatura de ${direccion}`);
    try {
        let posicion = await geolocate(direccion);
        let clima = await fetchWeather(posicion.lat, posicion.lon);
        if (clima) {
            console.log(`La temperatura actual de ${direccion} es de ${clima.temp}ºC`);
        } else {
            failed();
        }
    } catch (err) {
        //console.error(err);
        failed();
    }

};

mostrarTemperatura(argv.direccion);
