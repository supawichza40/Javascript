const { durations, treatments, prices } = require("./offersData");
const mongoose = require("mongoose")
const Offer = require("../../models/offer")
main().catch(err => console.log(err));

async function main() {
        await mongoose.connect('mongodb://127.0.0.1:27017/DJBeauty'); //Does work 

}
const getRandomData = function (numberOfItems,dataToRetrieve) {
    return dataToRetrieve[Math.floor(Math.random()*numberOfItems)]
}



const seedNewOffer = async ()=> {
    await Offer.deleteMany({});
    for (let index=0; index < 10; index++) {
        const newOffer = new Offer({
            name: `${getRandomData(durations.length, durations)} ${getRandomData(treatments.length, treatments)}`,
            price: getRandomData(prices.length, prices),
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique ea aperiam in deleniti ad dignissimos explicabo, ipsum numquam culpa laboriosam ullam voluptas labore dolore quaerat? Libero aperiam quae quos aspernatur.",
            image: "https://source.unsplash.com/collection/483251",
            createdDate: Date.now(),
            expiredDate: Date.now() + 1000 * 60 * 60 * 24 * 28,//will expire in 1 months

        })
        await newOffer.save()
    }
    console.log("done")
}
seedNewOffer();

