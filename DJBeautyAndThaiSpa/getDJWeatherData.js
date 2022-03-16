if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: __dirname + "/.env" });

}
api = process.env.OPENWEATHER_API;

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