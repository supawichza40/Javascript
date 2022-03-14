const { name, duration, price } = require("./waxingData");
const Waxing = require("../../models/waxing")
const mongoose = require("mongoose")

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/DJBeauty');
}

const seedWaxing = async () => {
    await Waxing.deleteMany({});
    for (let index = 0; index < 10; index++) {

        const newWaxing = new Waxing({
            name: name[Math.floor(Math.random() * name.length)],
            duration: duration[Math.floor(Math.random() * duration.length)],
            price:price[Math.floor(Math.random()*price.length)]


        })

        await newWaxing.save();
        console.log("done")
    }
}
seedWaxing()