const {name,duration,price}= require("./facialData")
const mongoose = require("mongoose")
const Facial = require("../../models/facial")
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/DJBeauty');
}

const seedFacial = async () => {
    await Facial.deleteMany({});
    for (let index = 0; index < 10; index++) {

        const newFacial = new Facial({
            name: name[Math.floor(Math.random() * name.length)],
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Similique ea aperiam in deleniti ad dignissimos explicabo, ipsum numquam culpa laboriosam ullam voluptas labore dolore quaerat? Libero aperiam quae quos aspernatur.",
            duration: duration[Math.floor(Math.random()*duration.length)],
            price : price[Math.floor(Math.random()*price.length)]


        })

        await newFacial.save();
        console.log("done")
    }
}
seedFacial();
