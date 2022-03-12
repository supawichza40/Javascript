const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Offer = require("./models/offer");
const ejsMate = require("ejs-mate")
const methodOverride = require("method-override")
var bodyParser = require("body-parser");
app.use(express.static(path.join(__dirname, "public")))

app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/DJBeauty');
}
const convertDateToMiliSecond = function (dateString) {
    var date = new Date(dateString);
    var miliseconds = date.getTime();
    return miliseconds;
}
const getDateFromMiliSecond = function (milisecond) {
    return new Date(milisecond).toDateString();
}
app.get("/", (req, res) => {
    res.render("djbeauty/home.ejs")
})
app.get("/offers", async(req, res) => {
    const foundOffer = await Offer.find({});
    
    res.render("djbeauty/offers/offers.ejs", { offers: foundOffer })
})
app.get("/offers/new", (req, res) => {
    res.render("djbeauty/offers/new.ejs")
})
app.get("/offers/:id", async(req, res) => {
    const foundOfferById = await Offer.findById( req.params.id );
    res.render("djbeauty/offers/details.ejs", { offer: foundOfferById });
})
app.post("/offers", async(req, res) => {
    req.body.expiredDate = convertDateToMiliSecond(req.body.expiredDate);
    req.body.createdDate = Date.now();
    const newOffer = new Offer(req.body);
    await newOffer.save();
    res.redirect("/offers");

})
app.get("/introduction", (req, res) => {
    res.render("djbeauty/introduction.ejs")
})
app.get("/gallery", (req, res) => {
    res.render("djbeauty/gallery.ejs")
})
app.get("/treatments", (req, res) => {
    res.render("djbeauty/treatments.ejs")
})
app.get("/treatments/waxings", (req, res) => {
    res.render("djbeauty/treatments/waxing.ejs")
})
app.get("/treatments/massages", (req, res) => {
    res.render("djbeauty/treatments/massage.ejs")
})
app.get("/treatments/facials", (req, res) => {
    res.render("djbeauty/treatments/facial.ejs")
})

app.get("/contacts", (req, res) => {
    res.render("djbeauty/contacts.ejs")
})
app.get("/comments-and-reviews", (req, res) => {
    res.render("djbeauty/commentAndReviews.ejs")
})
app.listen(3000, () => {
    console.log("Listening to port 3000")
})