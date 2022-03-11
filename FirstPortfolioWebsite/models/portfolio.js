const mongoose = require("mongoose");
const portforlioSchema =  new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    gallery: [{
        url: String,
        filename:String
    }],
    programmingLanguage: {
        type: String,
        required:true
    },
    description: {
        type: String,
        
    },
    linkToGitHub: {
        type:String
    },
    createDate: {
        type:Date
    }
})

module.exports = new mongoose.model("Portfolio", portforlioSchema);