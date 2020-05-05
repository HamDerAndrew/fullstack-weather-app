const axios = require('axios');
const forecastKey = require('./auth.js')

// Note: A callback function is not required to be named 'callback' :)
const forecast = (latitude, longitude, callback) => {
    const apiKey = forecastKey.returnForecast()
    const baseURL = 'http://api.weatherstack.com/'
    const url = `${baseURL}/current?access_key=${apiKey}&query=${latitude},${longitude}`
    
    axios.get(url)
    .then(( {data} ) => {
        if (data.error) {
            const error = data.error;
            //the callback here is adding data to the arguments in app.js 
            callback({
                errorCode: error.code,
                errorType: error.type,
                errorInfo: error.info
            }, undefined)
        } else {
            // callback(undefined, {
            //     latitude: response.data.location.lat,
            //     longitude: response.data.location.lon
            // })
            //Alternative:
            callback(undefined, `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees in ${data.location.country}.`)
        }
    })
    .catch(( error ) => {
        callback('Unable to connect to the service', undefined)
        console.log(error)
    })
}

module.exports = forecast;


/*
The callback function is passed two arguments in app.js: error, data. (it's the same function in app.js as in the bottom of this comment)
These are the arguments we pass in values for in the forecast function.

Example 1: 
When we add 'callback' on line 14 the 'undefined' is the 'data' argument in the forecast function below.
The data is 'undefined' because this is the code that will run if an error occours. Therefore we pass an object with errorcodes. 
The error argument can be any datatype, but in this case it's an object

Example 2:
When we add 'callback' on line 20 the 'undefined' is the 'error' argument in the forecast function below
The error is 'undefined' because this is the code that will run if there are no errors and we get data

forecast(-75.7088, 44.1545, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })
*/