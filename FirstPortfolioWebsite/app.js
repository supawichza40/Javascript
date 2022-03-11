if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const ejsMate = require("ejs-mate");
const session = require("express-session");
const AppError = require("./error");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const {storage, cloudinary} = require("./cloudinary/index")
const express = require("express");
const app = express();
const path = require("path");
const Portfolio = require("./models/portfolio")
const multer = require("multer")
const upload = multer({storage})
// getting-started.js
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const flash = require("connect-flash");
const Joi = require("joi");
const passport = require("passport")
const localStrategy = require("passport-local");
const User = require("./models/user");
const { join } = require("path");

let dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/myFirstPortfolioWebsite';
const MongoStore = require("connect-mongo");
const sessionConfig = {
    secret: "this should be a secret",
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
app.use(session(sessionConfig));
app.use(passport.initialize())
app.use(passport.session());

app.engine("ejs",ejsMate)
app.use(flash());
app.use(methodOverride("_method"))
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
})

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const validatePortfolioData = function (req, res, next) {
    const portfolioJoi = Joi.object({
        name: Joi.string().required(),
        programmingLanguage: Joi.string().required(),
        description: Joi.string(),
        linkToGitHub:Joi.string()

    })
    const { error } = portfolioJoi.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new AppError(404,msg)
    }
    else {
        next()
    }
}

const isLoggedIn = function (req, res, next) {
    if (req.user != null) {
        next();
    }
    else {
        req.flash("error","You need to sign in before create new portfolio")
        res.redirect("/signin")
    }
}
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}

// mongoose end
app.get("/", (req, res) => {
    console.log(dbUrl)
    res.render("portfolios/home.ejs")
})
app.get("/error", (req, res) => {
    throw new AppError(404,"Page is not found")
})
app.get("/portfolios", async (req, res) => {
    console.log(req.user==null)
    foundAllPortfolio = await(Portfolio.find({}))
    res.render("portfolios/index.ejs", { portfolios: foundAllPortfolio })
})
app.get("/portfolios/new",isLoggedIn, async(req, res) => {
    res.render("portfolios/new.ejs")
})
app.post("/portfolios", upload.array("gallery"),validatePortfolioData, async (req, res) => {
    console.log(req.files)
    const filterFiles = req.files.map(file => ({ url: file.path, filename: file.filename }))
    req.body.createDate = new Date();
    req.body.gallery = filterFiles;
    const createNewPortfolio = new Portfolio(req.body);

    await (createNewPortfolio.save());
    req.flash("success","Successfully create new Portfolio")
    res.redirect("/portfolios")
})
app.get("/portfolios/:id", async (req, res) => {
    console.log("detail")
    const foundPortfolioById = await Portfolio.findById(req.params.id);
    res.render("portfolios/detail.ejs",{portfolio:foundPortfolioById})
})
app.get("/portfolios/:id/update",isLoggedIn, async (req, res) => {
    console.log("Image")
    const foundPortfolioById = await Portfolio.findById(req.params.id);
    res.render(`portfolios/update.ejs`, {portfolio:foundPortfolioById})

})
app.patch("/portfolios/:id", upload.array("gallery"), async (req, res) => {
    console.log(req.body)
    if (req.body.deletedImage) {
        if (req.body.deletedImage.constructor  === Array) {
            for (let filename of req.body.deletedImage) {
                const result = await cloudinary.uploader.destroy(filename);
            }
        }
        else {
            await cloudinary.uploader.destroy(req.body.deletedImage)
        }
        const getPortfolioById = await Portfolio.findById(req.params.id);
        await getPortfolioById.updateOne({ $pull: { gallery: { filename: { $in: req.body.deletedImage } } } })
        console.log(getPortfolioById)
    }
    const picsInfo = req.files.map(file => ({ url: file.path, filename: file.filename }))
    const foundPortfolioById = await Portfolio.findByIdAndUpdate(req.params.id, req.body);
    foundPortfolioById.gallery.push(...picsInfo);
    await foundPortfolioById.save();
    req.flash("success","Update successful")
    res.redirect(`/portfolios/${req.params.id}`)
})
app.get("/portfolios/:id/confirmDelete",isLoggedIn,async(req,res)=>{
    const foundPortfolioById = await Portfolio.findById(req.params.id);
    res.render("portfolios/confirmDelete", { portfolio: foundPortfolioById });
})
app.delete("/portfolios/:id", async (req, res) => {
    const { confirmDelete } = req.body;
    if (confirmDelete != "DELETE") {
        console.log("Invalid deletion")
        res.redirect("/portfolios")
    }
    else{
        await Portfolio.findByIdAndDelete(req.params.id);
        res.redirect("/portfolios");
    }
})
app.get("/register", (req, res) => {
    res.render("users/register.ejs")
})
app.post("/register/success", async (req, res) => {
    const { username, email, password } = req.body;
    const user = new User({ email: email, username: username });
    const newUser = await (User.register(user, password));
    req.logIn(newUser, err => {
        if (err) return next(err);
        console.log("Welcome to Portfolio")
        req.flash("userSuccess", "You have successfully registered! Welcome to Portfolio")
        res.redirect("/portfolios")
    });
    
})
app.get("/signin", (req, res) => {
    res.render("users/signin.ejs")
})
app.post("/signin/success", passport.authenticate("local", { failureFlash: true, failureRedirect: "/signin" }), (req, res) => {
    console.log("Welcome to portfolio");
    req.flash("success", "Successfully Log In")
    res.redirect("/portfolios")
})
app.get("/signoff",isLoggedIn, (req, res) => {
    req.logOut();
    req.flash("error","Successfully Sign Out!")
    res.redirect("/portfolios")
})

app.use(function (err, req, res, next) {
    console.dir(err)
    res.render("partials/error.ejs",{error:err})
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})