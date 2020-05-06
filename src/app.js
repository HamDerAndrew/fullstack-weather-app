const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express()
// Heroku config. This sets the port provided by Heroku via nodejs
const port = process.env.PORT || 3000

// use 'path' module to assign an absolute path to the 'public' folder
const publicPath = path.join(__dirname, '../public')

// define a custom path/folder for holding the templateengine views
const viewsPathCustom = path.join(__dirname, '../templates/views')

// define path for partials
const partialsPath = path.join(__dirname, '../templates/partials')

// set value for a given express setting key. In this case it's important that 'view engine' is spelled exactly like so, to tell express that 
// the setting we're altering is the 'view engine' key (property). The value of the key is 'hbs', the view engine installed.
// Express.js expects views to be in a specific folder, which is 'views' by default, at the root of the project
app.set('view engine', 'hbs')

// Instead of having the default 'views folder set, we set a custom folder for 'views'
app.set('views', viewsPathCustom)

// let 'hbs' know where to find partials
hbs.registerPartials(partialsPath)

//use express.static to serve static files. In this case our /public folder
app.use(express.static(publicPath))

app.get('', (req, res) => {
    //use '.render' to render views. No need to add the file extension to the name.
    //the second argument is an object that the view can access
    res.render('index', {
        title: 'Weather App',
        name: 'André Larsen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About us',
        name: 'André Larsen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help and FAQ',
        helpMsg: 'Here you can get help by browsing the FAQ or contact us if necessary',
        name: 'André Larsen'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Error: invalid address. Add address or modify current'
        })
    }

    geocode(req.query.address, (geoError, {lat, long, location} = {}) => {
        if (geoError) {
            return res.send({
                error: geoError
            })
        }
        
        forecast(lat, long, (error, forecastData) => {
            console.log(forecastData)
            if (error) {
                return res.send({
                    code: error.code,
                    type: error.type,
                    info: error.info
                })
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    });
})

app.get('/products', (req, res) => {
    //if a 'search=value' is not set in the URL, return an error
    if(!req.query.search) {
        // use 'return' so the function stops here. If return isn't used the code outside if will still fire meaning you
        // would try to respond to a single http request twice. You can't do that.
        return res.send({
            error: 'Error: must provide serch term'
        })
    }
    // request has a query object on it
    console.log(req.query)
    res.send({
        products: []
    })
})

// 404 specific for '/help/' URLs. Anything after /help/ that doesn't match a valid URL returns a 'help 404'.
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help page not found',
        name: 'André Larsen'
    })
})

// 404 must be listed last because the script goes from top-down. The * matches everything that does not match with what we already have.
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page not found',
        name: 'André Larsen'
    })
})

//starts up the server and listens on a specific port
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

/*
// Configure what the server should do when a specific URL is served (servere HTML, serve JSON etc.)
// Takes two arguments: a string URL and a function. The function describes what to do when a URL is served/visited.
// The function takes two arguments: request and response.
app.get('', (req, res) => {
    // Send something back to the responder
    res.send('<h1>Root route or index.html</h1>')
})
*/