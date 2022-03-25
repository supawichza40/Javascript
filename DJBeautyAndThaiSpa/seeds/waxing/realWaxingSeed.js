const { name, duration, price } = require("./waxingData");
const Waxing = require("../../models/waxing")
const mongoose = require("mongoose")

main().catch(err => console.log(err));

async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/DJBeauty'); //Does work 

}
const wax_data = [
    {
    name:"Full leg and bikini",
    duration:"45 mins",
    price:30
    },
    {
    name:"Full arm",
    duration:"30 mins",
    price:20
    },
    {
    name:"Under arm",
    duration:"10 mins",
    price:12
    },
    {
    name:"Full arm & under arm",
    duration:"40 mins",
    price:25
    },
    {
    name:"Full leg",
    duration:"60 mins",
    price:25
    },
    {
    name:"Lower leg",
    duration:"15 mins",
    price:15
    },
    {
    name:"Top leg",
    duration:"15 mins",
    price:20
    },
    {
    name:"Bikini",
    duration:"15 mins",
    price:15
    },
    {
    name:"Brazilian",
    duration:"30 mins",
    price:25
    },
    {
    name:"Hollywood",
    duration:"30 mins",
    price:28
    },
    {
    name:"Shoulder",
    duration:"30 mins",
    price:15
    },
    {
    name:"Chest",
    duration:"30 mins",
    price:20
    },
    {
    name:"Back& Shoulder",
    duration:"30 mins",
    price:28
    },
    {
    name:"Chest&Shoulder",
    duration:"30 mins",
    price:25
    },
    {
    name:"Chest&Stomach",
    duration:"30 mins",
    price:25
    }
]
const seedWaxing = async function () {
    await Waxing.deleteMany({});
    for (let waxing of wax_data) {
        const newWax = new Waxing(waxing);
        await newWax.save();
    }
    console.log("Done")

}
seedWaxing()