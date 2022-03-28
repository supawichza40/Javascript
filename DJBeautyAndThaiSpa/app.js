const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Offer = require("./models/offer");
const ejsMate = require("ejs-mate")
const methodOverride = require("method-override")
var bodyParser = require("body-parser");
const Massage = require("./models/massage")
const sendMessageToCustomer = require("./sendingMail")
const AppError = require("./error")
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { storage, cloudinary } = require("./cloudinary/index")
const multer = require("multer");
const upload = multer({storage})
const djbeautyWeatherData = require("./getDJWeatherData")
const session = require("express-session");
const passport = require("passport")
const localStrategy = require("passport-local");
const User = require("./models/user");
const Gallery = require("./models/gallery")
const MongoStore = require("connect-mongo");
const dbUrl = process.env.DB_URL||'mongodb://127.0.0.1:27017/DJBeauty'
const sessionConfig = {
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true }
    cookie: {
        //so the expire is use if expire reach user will be force to log out.
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,//Expire a week from now.
        maxAge: 1000 * 60 * 60 * 24 * 7

    },
    store: MongoStore.create({
        
        mongoUrl: dbUrl,
        touchAfter: 24 * 60 *60
    })
}
// Allow assets directory listings
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(express.static(path.join(__dirname, "/public")))

app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.use(async(req, res, next) => {
    res.locals.currentuser = req.user;
    res.locals.djWeatherData = await djbeautyWeatherData()
    next();
})
main().catch(err => console.log(err));

async function main() {
    
    // await mongoose.connect('mongodb://127.0.0.1:27017/DJBeauty'); //Does work 
    await mongoose.connect(dbUrl)

}
const convertDateToMiliSecond = function (dateString) {
    var date = new Date(dateString);
    var miliseconds = date.getTime();
    return miliseconds;
}
const getDateFromMiliSecond = function (milisecond) {
    return new Date(milisecond).toDateString();
}
const convertSecondIntoDayMonthYear = function (milisecond) {
    const dateObj = new Date(milisecond);
    var month = dateObj.getUTCMonth();
    if (month < 10) {
        month = `0${month}`
    }
    var date = dateObj.getUTCDate();
    if (date < 10) {
        date = `0${date}`
    }
    return `${dateObj.getUTCFullYear()}-${month}-${date}`
}
const validatePortfolioData = function (req, res, next) {
    const portfolioJoi = Joi.object({
        name: Joi.string().required(),
        programmingLanguage: Joi.string().required(),
        description: Joi.string(),
        linkToGitHub: Joi.string()

    })
    const { error } = portfolioJoi.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new AppError(404, msg)
    }
    else {
        next()
    }
}
//we do not need to write try and catch everywhere
function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e));
    }
}
const isValidUser = function (req, res, next) {
    if (req.user) {
        next();
    }
    else {
        next(new AppError(404,"Invalid User, please sign in"))
    }
}
app.get("/error", wrapAsync((req, res) => {
    throw new AppError(404,"This is new error")
}))
app.get("/register",isValidUser, (req, res) => {
    res.render("djbeauty/register.ejs")
})
app.post("/register/success", async(req, res) => {
    const { username, password, email } = req.body;
    const user = new User({ username: username, email: email })
    const newRegisterUser = await (User.register(user, password));
    req.logIn(newRegisterUser, (err) => {
        if (err) return next(err);
        console.log("Welcome to D&J Beauty and Thai Spa")
        res.redirect("/")
    })
})
app.get("/signin", (req, res) => {
    res.render("djbeauty/login.ejs")
})
app.post("/signin/success", passport.authenticate("local", { failureRedirect: "/signin" }), (req, res) => {
    console.log("Welcome to D&J Beauty and Thai Spa")
    res.redirect("/")
    
})
app.get("/signoff", (req, res) => {
    req.logOut();
    res.redirect("/")
})
app.get("/test", (req, res) => {
    res.render("djbeauty/test.ejs")
})
app.get("/", async (req, res) => {
    res.render("djbeauty/home2.ejs")
})
app.get("/offers", async(req, res) => {
    const foundOffer = await Offer.find({});
    
    res.render("djbeauty/offers/offers.ejs", { offers: foundOffer })
})
app.get("/offers/new",isValidUser, (req, res) => {
    res.render("djbeauty/offers/new.ejs")
})
app.get("/offers/:id", async(req, res) => {
    const foundOfferById = await Offer.findById( req.params.id );
    res.render("djbeauty/offers/details.ejs", { offer: foundOfferById });
})
app.post("/offers", upload.array("image"), async (req, res) => {
    const pictureData = req.files.map(file=>({url:file.path,filename:file.filename}))
    req.body.expiredDate = convertDateToMiliSecond(req.body.expiredDate);
    req.body.createdDate = Date.now();
    const newOffer = new Offer(req.body);
    newOffer.images = pictureData[0];
    await newOffer.save();
    res.redirect("/offers");

})
app.get("/offers/:id/update", isValidUser, async(req, res) => {
    const getOfferById =await Offer.findById(req.params.id);
    getOfferById.getHTMLDate = convertSecondIntoDayMonthYear;
    res.render("djbeauty/offers/update.ejs",{offer:getOfferById})
    
})
app.patch("/offers/:id", isValidUser, async(req, res) => {

    const foundOffer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect(`/offers/${req.params.id}`);
})
app.delete("/offers/:id", isValidUser, async (req, res) => {
    const foundOffer = await Offer.findByIdAndDelete(req.params.id);
    await cloudinary.uploader.destroy(foundOffer.images.filename)
    res.redirect("/offers")
})


app.get("/introduction", (req, res) => {
    res.render("djbeauty/introduction.ejs")
})
app.get("/gallery", async(req, res) => {
    const getGallery = await Gallery.find({});

    res.render("djbeauty/gallery/gallerylightbox.ejs",{gallery:getGallery[0]})
})
app.get("/gallery/new", isValidUser, (req, res) => {
    res.render("djbeauty/gallery/new.ejs")
})
app.patch("/gallery/success", upload.array("images"), async (req, res) => {
    const filterImages = req.files.map(file => ({ url: file.path, filename: file.filename }))
    const result = await mongoose.connection.db.collection("galleries").count()

    if (result == 0) {
        console.log("gallery is null")
        const newGallery = new Gallery()
        newGallery.images.push(...filterImages);
        await newGallery.save();

    }
    else {
        console.log("Gallery not empty")
        const getCurrentGallery = await Gallery.find({});
        await getCurrentGallery[0].images.push(...filterImages);
        await getCurrentGallery[0].save();
        

    }
    res.redirect("/gallery")
})
app.get("/gallery/update", isValidUser, async(req, res) => {
    const gallery = await Gallery.find({});

    res.render("djbeauty/gallery/update.ejs",{gallery:gallery[0]})
})
app.post("/gallery/update/success", upload.array("images"), async (req, res) => {
    const filteredGallery = req.files.map(file => ({ url: file.path, filename: file.filename }));
    const galleryFound = await Gallery.find({});
    galleryFound[0].images.push(...filteredGallery);
    await galleryFound[0].save();

    if(req.body.deletedImage){
        if (typeof (req.body.deletedImage) == "object") {
            
            await galleryFound[0].updateOne({ $pull: { images: { filename: { $in: req.body.deletedImage } } } })
            await galleryFound[0].save();
            for (let file of req.body.deletedImage) {
                await cloudinary.uploader.destroy(file);
            }
            
        }
        else {
            await galleryFound[0].updateOne({ $pull: { images: { filename: req.body.deletedImage } } });
            await galleryFound[0].save()
            await cloudinary.uploader.destroy(req.body.deletedImage);
            }
    }
    res.redirect("/gallery")
})
app.get("/treatments", (req, res) => {
    res.render("djbeauty/treatments.ejs")
})
app.get("/treatments/massages", async(req, res) => {
    const getAllMassage = await Massage.find({});
    res.render("djbeauty/treatments/massages/massage.ejs",{massages:getAllMassage})
})
app.get("/treatments/massages/new", isValidUser, (req, res) => {
    res.render("djbeauty/treatments/massages/new.ejs");
})
app.get("/treatments/massages/:id", async (req, res) => {
    const getMassageById = await Massage.findById(req.params.id);
    res.render("djbeauty/treatments/massages/details.ejs",{massage:getMassageById})
})
app.post("/treatments/massages",upload.array("image"), async(req, res) => {
    req.body.prices = [];
    const newMassage = new Massage(req.body);
    const filterFiles = req.files.map(file => ({ url: file.path, filename: file.filename }));
    newMassage.images.push(...filterFiles);
    await newMassage.save();
    res.redirect("/treatments/massages");
    
})
app.get("/treatments/massages/:id/update", isValidUser, async(req, res) => {
    const getMassageById = await Massage.findById(req.params.id);
    res.render("djbeauty/treatments/massages/update.ejs", { massage: getMassageById });
})
app.patch("/treatments/massages/:id/update/prices", isValidUser, async(req, res) => {
    
    const findMassageById = await (Massage.findById(req.params.id));
    await findMassageById.updateOne({ $pull: { prices: { _id: { $in: req.body.toDelete } } } })
    if ( req.body.duration != "" && req.body.amount != "") {
        findMassageById.prices.push(req.body);
        await findMassageById.save();
    }
    res.redirect(`/treatments/massages/${req.params.id}/update`);
})
app.patch("/treatments/massages/:id", upload.array("image"), async(req, res) => {
    //update req.body 
    await Massage.findByIdAndUpdate(req.params.id, req.body);
    //update file to database
    const filterFiles = req.files.map(file => ({ url: file.path, filename: file.filename }));
    const foundMassage = await Massage.findById(req.params.id);
    foundMassage.images.push(...filterFiles)
    await foundMassage.save()
    //delete select image on cloudinary
    if (req.body.deletedImage) {
        if (req.body.deletedImage.constructor === Array) {
            for (let filename of req.body.deletedImage) {
               await cloudinary.uploader.destroy(filename)
            }
        }
        else {
            await cloudinary.uploader.destroy(req.body.deletedImage)
        }
        //delete selected image on database
        const foundMassageById = await Massage.findById(req.params.id);
        await foundMassageById.updateOne({ $pull: { images: { filename: { $in: req.body.deletedImage } } } })
    }

    res.redirect(`/treatments/massages/${req.params.id}`)
})
app.delete("/treatments/massages/:id", isValidUser, async (req, res) => {
    await Massage.findByIdAndDelete(req.params.id);
    res.redirect("/treatments/massages")
})
const Waxing = require("./models/waxing")
app.get("/treatments/waxings", async(req, res) => {
    const foundWaxing = await Waxing.find({});
    res.render("djbeauty/treatments/waxings/waxing.ejs", { waxings: foundWaxing });
})
app.get("/treatments/waxings/update", isValidUser, async (req, res) => {
    const foundAllWaxing = await Waxing.find({});
    res.render("djbeauty/treatments/waxings/update.ejs",{ waxings: foundAllWaxing });
})
app.patch("/treatments/waxings", isValidUser, async (req, res) => {
    const deletedWaxing = await Waxing.deleteMany({_id: req.body.deleted})
    if (req.body.name != "" && req.body.duration != "" && req.body.price != "") {
        const newWaxing = new Waxing({ name:req.body.name, duration:req.body.duration, price:req.body.price })
        await newWaxing.save();
    }
    res.redirect("/treatments/waxings")
})
const Facial = require("./models/facial");
const gallery = require("./models/gallery");
app.get("/treatments/facials", async(req, res) => {
    const getAllFacial = await Facial.find({});

    res.render("djbeauty/treatments/facials/facial.ejs",{facials:getAllFacial})
})
app.get("/treatments/facials/new", isValidUser, (req, res) => {
    res.render("djbeauty/treatments/facials/new.ejs");
})
app.post("/treatments/facials",upload.array("image"), async (req, res) => {
    const newFacial = new Facial(req.body);
    const mappedImageInfo = req.files.map((file) => ({ url: file.path, filename: file.filename }));
    newFacial.images.push(...mappedImageInfo);
    await newFacial.save();
    res.redirect("/treatments/facials")
})
app.get("/treatments/facials/:id",async (req, res) => {
    const foundFacialById = await (Facial.findById(req.params.id));
    res.render("djbeauty/treatments/facials/details.ejs",{facial:foundFacialById})
})
app.get("/treatments/facials/:id/edit", isValidUser, async (req, res) => {
    const foundFacialById = await (Facial.findById(req.params.id))
    res.render("djbeauty/treatments/facials/edit.ejs", { facial: foundFacialById });
})
app.patch("/treatments/facials/:id", upload.array("image"), async (req, res) => {
    //update normal field
    await Facial.findByIdAndUpdate(req.params.id, req.body)
    //update new file that uploaded
    const getFileInfo = req.files.map(file => ({ url: file.path, filename: file.filename }))
    const foundFacial = await Facial.findById(req.params.id);
    foundFacial.images.push(...getFileInfo);
    await foundFacial.save();
    //delete image that is in checkbox.
    if(req.body.deletedImage){
        if (req.body.deletedImage.constructor === Array) {
            console.log(req.body.deletedImage)
            for (let deleteImage of req.body.deletedImage) {
                
                await cloudinary.uploader.destroy(deleteImage);
            }
        }
        else {
            await cloudinary.uploader.destroy(req.body.deletedImage);
        }
        const foundFacial = await Facial.findById(req.params.id);
        await foundFacial.updateOne({ $pull: { images: { filename: { $in: req.body.deletedImage } } } })
    }
    //remove data in our database for images.
    foundFacial.updateOne({$pull:{images:{filename:{$in:req.body.deletedImage}}}})
    
    res.redirect(`/treatments/facials/${req.params.id}`)

})
app.delete("/treatments/facials/:id", isValidUser, async (req, res) => {
    const foundFacialUsingId = await Facial.findById(req.params.id);
    const getFilenameFromImage = foundFacialUsingId.images.map(image => ( image.filename ))
    await cloudinary.uploader.destroy(...getFilenameFromImage);
    const foundFacial = await Facial.findByIdAndDelete(req.params.id);
    res.redirect(`/treatments/facials`)

    
})
app.get("/contacts", (req, res) => {
    res.render("djbeauty/contacts.ejs")
})
app.get("/thankyou", (req, res) => {
    res.render("djbeauty/thankyou.ejs")
})
app.post("/contacts/success", (req, res) => {
    sendMessageToCustomer(req.body,req.body.email)
    res.redirect("/thankyou")
})
app.get("/comments-and-reviews", (req, res) => {
    res.render("djbeauty/commentAndReviews.ejs")
})
app.get("/carpark", (req, res) => {
    res.render("djbeauty/carParkNearDJ.ejs")
})
app.use(function (err, req, res, next) {
    res.render("djbeauty/error.ejs",{error:err})
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})