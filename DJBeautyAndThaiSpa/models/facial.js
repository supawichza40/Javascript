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

    images: [{
        url: {
            type:String,
        },
        filename: {
            type:String
        }  
    }],
    price: [{
        duration: {
            type:String
        },
        price: {
            type:Number
        }
    }]
})
module.exports = new mongoose.model("Facial", facialSchema);