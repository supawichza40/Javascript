// getting-started.js
const mongoose = require('mongoose');
const Portfolio = require("../models/portfolio")
const { firstNamePart, secondNamePart } = require("./nameGenerator")
const listOfProgrammingLanguages = require("./programmingLanguageGenerator")
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/myFirstPortfolioWebsite');
}

// mongoose end

const seedDB = async function () {
    
    await Portfolio.deleteMany({});
    for (let index = 0; index < 10; index++) {
        const newPortfolio = new Portfolio({
            name: `${firstNamePart[Math.floor(Math.random() * firstNamePart.length)]} ${secondNamePart[Math.floor(Math.random() * secondNamePart.length)]}`,
            gallery: [
                {
                    url: 'https://res.cloudinary.com/kingofgodz/image/upload/v1646846214/YelpCamp/b74s4t862rpwmsbyd7r2.jpg',
                    filename: 'YelpCamp/b74s4t862rpwmsbyd7r2'
                },
                {
                    url: 'https://res.cloudinary.com/kingofgodz/image/upload/v1646846214/YelpCamp/nek0n0rja54rkbbnseel.jpg',
                    filename: 'YelpCamp/nek0n0rja54rkbbnseel'
                }
            ],
            programmingLanguage: `${listOfProgrammingLanguages[Math.floor(Math.random() * listOfProgrammingLanguages.length)]}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex dolore recusandae ducimus pariatur dolores porro minus eius mollitia, perferendis, modi nostrum iste similique laboriosam minima non incidunt. Vitae, vel nobis.",
            linkToGitHub: "https://github.com/supawichza40/Dev",
            createDate: new Date()
        

        })
        await newPortfolio.save();
    }

}
seedDB();
console.log("Done")