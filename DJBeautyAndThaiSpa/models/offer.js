const { number } = require("joi");
const mongoose = require("mongoose");


const offerSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    description: {
        type: String
    },
    image: {
        type:String
    },
    createdDate: {
        type: Date,
        required:true
    },
    expiredDate: {
        type: Date,
        required:true
    }

})

module.exports = new mongoose.model("Offer", offerSchema);