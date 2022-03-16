const { massage, price, duration } = require("./massageData");
const mongoose = require("mongoose")
console.log(massage, price, duration)
const Massage = require("../../models/massage")
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/DJBeauty'); //Does work 
    // await mongoose.connect('mongodb://localhost:27017/djbeauty');//Does not work on home computer

        //   mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp"
}

const seedMassage = async() => {
    await Massage.deleteMany({});
    for (let index = 0; index < 10; index++) {

        const newMassage = new Massage({
            name: massage[Math.floor(Math.random() * massage.length)],
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Similique ea aperiam in deleniti ad dignissimos explicabo, ipsum numquam culpa laboriosam ullam voluptas labore dolore quaerat? Libero aperiam quae quos aspernatur.",
            benefit: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Similique ea aperiam in deleniti ad dignissimos explicabo, ipsum numquam culpa laboriosam ullam voluptas labore dolore quaerat? Libero aperiam quae quos aspernatur.",
            
            prices: [],


        })
        for (let index = 0; index < price.length; index++){
            newMassage.prices.push({
                duration: duration[index],
                amount:price[index]
            })
        }
        await newMassage.save();
        console.log("done")
    }
}
seedMassage();
