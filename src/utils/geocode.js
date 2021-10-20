const request = require('request');

const geocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXJhbTMxNCIsImEiOiJja3VtaXVibWUxZTUxMndvNjYxcnV4azdpIn0.N0E0yNbImgeY62mUZAqWqw&limit=1`;

  request({ url, json: true }, (error, response, body) => {
    if (error) {
      cb('unable to connect to the mapbox api')
    } else if (!body.features || !body.features.length) {
      cb('please provide the right location')
    } else {
      cb(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      })
    }
  })
}

module.exports = geocode;
