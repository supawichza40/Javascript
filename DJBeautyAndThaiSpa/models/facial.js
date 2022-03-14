const mongoose = require("mongoose")

const facialSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    description: {
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
module.exports = new mongoose.model("Facial", facialSchema);