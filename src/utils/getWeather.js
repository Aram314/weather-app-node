const request = require('request');

const getWeather = (long, lat, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=ae7f3ca6a4b3289285236e6d2d2a28e8&query=${encodeURIComponent(long)},${encodeURIComponent(lat)}`;

  request({ url, json: true }, (error, response, body) => {
    if(error) {
      cb('unable to connect to the weatherstask api');
    } else if (body.error) {
      cb(body.error.info)
    } else {
      cb(undefined, `its ${body.current.temperature} degree, but feels like ${body.current.feelslike}`);
    }
  })
}

module.exports = getWeather;
