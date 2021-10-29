const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const getWeather = require('./utils/getWeather.js');

const port = process.env.PORT || 4000;
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'me'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Help me help me',
    title: 'Help page',
    name: 'me'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'me',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({ error: 'address is required' });
    return
  }

  geocode(req.query.address, (error, data) => {
    if(error) {
      res.send({ error })
    } else {
      getWeather(data.longitude, data.latitude, (error, weatherData) => {
        if(error) {
          res.send({ error })
        } else {
          res.send({
            location: data.location,
            forecast: weatherData
          })
        }
      })
    }
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: 'Help page does not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    message: 'Page does not found',
    title: '404 Not Found',
    name: 'me',
  })
})

app.listen(port, () => {
  console.log('server is running on port ' + port)
})