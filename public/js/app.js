const form = document.querySelector('form')
const userInput  = document.querySelector('input')
const locationMsg = document.getElementById('location')
const forecastMsg = document.getElementById('forecast')
const errorMsg = document.getElementById('error')

form.addEventListener('submit', (event) => {
    const devUrl = `/weather?address=${userInput.value}`

    event.preventDefault()
    locationMsg.textContent = 'Loading. . .'
    errorMsg.textContent = ''

    fetch(devUrl)
    .then(( response ) => {
        response.json()
        .then(( data ) => {
            if(data.error) {
                locationMsg.textContent = ''
                forecastMsg.textContent = ''
                return errorMsg.textContent = data.error
            }
            errorMsg.textContent = ''
            locationMsg.textContent  = data.location
            forecastMsg.textContent = data.forecast
        })
    })
    .catch(( error ) => {
        console.log(error)
    })
})

