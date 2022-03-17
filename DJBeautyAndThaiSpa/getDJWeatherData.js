if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + "/.env" });

}
api = `https://api.openweathermap.org/data/2.5/onecall?lat=51.6562841&lon=-0.2037832&units=metric&appid=${process.env.OPENWEATHER_API}`

// const getTodayWeather = async () => {
//   const result = await fetch(api);
//   console.log(result)
// }
const axios = require('axios');

const header = { headers: { Accept: "application/json" } }

const getTodayWeather = async () => {
  const res = await (axios.get(api))
  return res.data;
}

module.exports = getTodayWeather;