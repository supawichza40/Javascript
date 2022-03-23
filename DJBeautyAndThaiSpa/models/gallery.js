const mongoose = require("mongoose")

const gallerySchema = new mongoose.Schema({
    images: [{
        url: {
            type:String
        },
        filename: {
            type:String
        }
    }]
})
module.exports = new mongoose.model("Gallery", gallerySchema);