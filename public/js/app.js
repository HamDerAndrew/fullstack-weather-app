const form = document.querySelector('form')
const userInput  = document.querySelector('input')
const weatherImage = document.getElementById('weather-img')
const locationMsg = document.getElementById('location')
const forecastMsg = document.getElementById('forecast')
const errorMsg = document.getElementById('error')
const imageContainer = document.querySelector('.image-container')
const loadingIndicator = document.querySelector('.lds-dual-ring');

form.addEventListener('submit', (event) => {
    const devUrl = `/weather?address=${userInput.value}`

    event.preventDefault()
    loadingIndicator.classList.add('indicator-active');
    console.log(loadingIndicator)
    locationMsg.textContent = 'Loading. . .'
    errorMsg.textContent = ''

    fetch(devUrl)
    .then(( response ) => {
        response.json()
        .then(( data ) => {
            const { forecastImg, country, describtion, temp, tempFeelsLike, windSpeed, lastObserved } = data.forecast || {}
            loadingIndicator.classList.remove('indicator-active')

            if(data.error) {
                locationMsg.textContent = ''
                forecastMsg.textContent = ''
                return errorMsg.textContent = data.error
            }

            errorMsg.textContent = ''
            weatherImage.src = forecastImg
            locationMsg.textContent  = data.location
            forecastMsg.textContent = `It's ${describtion} with a temperature of ${temp} degrees and a windspeed of ${windSpeed} km/h. It feels like ${tempFeelsLike} degrees in ${country}. Last observation happend at ${lastObserved}.`
        })
    })
    .catch(( error ) => {
        console.log(error)
    })
})

