const weatherstackKey = '506dffb1bfa5251d1550b0dd5f7763fb'
const mapboxKey = 'pk.eyJ1IjoiYWxhcnNlbiIsImEiOiJjazlsOWI4NWswMmZoM21tdGZvaWk5a3FvIn0.aBWh-pC7cINpuAhHp3_lYw'

const returnForecast = () => {
    return weatherstackKey
}

const returnGeocode = () => {
    return mapboxKey
}

module.exports = {
    returnForecast: returnForecast,
    returnGeocode: returnGeocode,
}