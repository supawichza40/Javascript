const mongoose = require("mongoose");

const waxingSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    duration: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    }
})
module.exports = new mongoose.model("Waxing", waxingSchema);