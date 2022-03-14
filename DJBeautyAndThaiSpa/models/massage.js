const mongoose = require("mongoose");

const massageSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    benefit: {
        type: String,
        
    },
    prices: [{
        duration: {
            type: String,
        },
        amount: {
            type: Number,
        }
    }]

})

module.exports = new mongoose.model("Massage", massageSchema);