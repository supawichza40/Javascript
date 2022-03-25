const {name,duration,price}= require("./facialData")
const mongoose = require("mongoose")
const Facial = require("../../models/facial")
main().catch(err => console.log(err));

async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/DJBeauty'); //Does work 

}

const seedFacial = async () => {
    await Facial.deleteMany({});
    for (let index = 0; index < 10; index++) {

        const newFacial = new Facial({
            name: name[Math.floor(Math.random() * name.length)],
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Similique ea aperiam in deleniti ad dignissimos explicabo, ipsum numquam culpa laboriosam ullam voluptas labore dolore quaerat? Libero aperiam quae quos aspernatur.",
            images: [
                {
                    url: "https://res.cloudinary.com/kingofgodz/image/upload/v1647518813/DJBeauty/wrhpkmppzhjwogqzespb.png",
                    filename:"DJBeauty/wrhpkmppzhjwogqzespb"
                },
                {
                    url: "https://res.cloudinary.com/kingofgodz/image/upload/v1647518813/DJBeauty/sxvixfzc70lt2uxgtpwa.png",
                    filename:"DJBeauty/sxvixfzc70lt2uxgtpwa"
                }
            ],
            price :[ price[Math.floor(Math.random()*price.length)],price[Math.floor(Math.random()*price.length)]]


        })

        await newFacial.save();
        console.log("done")
    }
}
seedFacial();
