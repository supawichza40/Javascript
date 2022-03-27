if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ "path": "c:\\Work\\DevUploadToGithub\\Javascript\\DJBeautyAndThaiSpa\\.env" });
}
const {name,duration,price}= require("./facialData")
const mongoose = require("mongoose")
const Facial = require("../../models/facial")
main().catch(err => console.log(err));
async function main() {
    const dbUrl = process.env.DB_URL
    console.log(dbUrl)
    // await mongoose.connect('mongodb://127.0.0.1:27017/DJBeauty'); //Does work 
    await mongoose.connect(dbUrl)

}

facialData = [
    {
        name:"Express Facial",
        description:"Created specifically for the person on the go, these customized facials are uniquely designed to give maximum results in minimum time. Formulated to refresh, renew and revitalize - these treatments work with all skin types to reveal more youthful, healthy skin. A non-aggressive way to firm, brighten, tone, soothe, smooth,  stimulate cell turnover, replenish much needed moisture, and absorb excess oil and bacteria. These treatments target acne, sun damage, dehydration, hyper pigmentation, and fine lines by exfoliating the outer layers of dead skin cells and stimulating the production of new cells to reveal younger, healthier looking skin.",
        images: [
            {
                url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648162519/DJBeauty/Facial-cropped_eicljs.jpg",
                filename:"DJBeauty/Facial-cropped_eicljs"
            },
            {
                url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648162740/DJBeauty/What-Makes-Express-Facial-Different-From-Other-Facial-Treatments-scaled_fjmpbn.jpg",
                filename:"DJBeauty/What-Makes-Express-Facial-Different-From-Other-Facial-Treatments-scaled_fjmpbn"
            }
        ],
        price: [
            {
                duration: "30 Minutes",
                price:30
            }
        ]
        
    },
    {
        name:"Rebalancing Facial",
        description:"This is an intensive treatment for an oily/combination skin. Deep cleansing and purifying. Promotes clearer skin, with a tighter skin surface and less visible pores.",
        images: [
            {
                url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648163058/DJBeauty/images_awfyzb.jpg",
                filename:"DJBeauty/images_awfyzb"
            }
        ],
        price: [
            {
                duration: "55 Minutes",
                price:45
            }
        ]
        
    },
        {
        name:"Rehydrating Facial",
        description:"Nourish dry, dehydrated skin that has become dull, patchy and flakey. ESPA's hydrating facial treatments immediately nourish and hydrate the skin to relieve tightness and fine lines. Gentle exfoliation removes dry skin cells, and allows the rich face treatment oils and long-lasting, replenishing products to deliver hydration deep into the skin. Soft, supple skin is revealed and dehydration kept at bay.",
        images: [
            {
                url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648163202/DJBeauty/RUMA-scaled.jpegw3_c37ce8.webp",
                filename:"DJBeauty/RUMA-scaled.jpegw3_c37ce8"
            }
        ],
            price: [{
                duration: "55 Minutes",
                price: 45
            }]
        
    },
        {
        name:"Sonopeel Microdermabrasion",
        description:"The SonoPeel microdermabrasion uses gentle ultrasound waves and energy to micro-abrade and smoothen the surface of your skin. The gentle SonoPeel ultrasound waves lift off the stratum corneum (outer dead cell layer of your skin), creating a smoother, and more youthful skin surface. By reducing the thickness of the top layer of your skin, or the stratum corneum, your skin will not only be smoother, but will also be improved by helping to reduce blackhead, white head and sebaceous plugs, all of which contribute to Acne Breakouts and poor quality skin. The SonoPeel Microdermabrasion, with its cavitational ultrasound, is an effective tool to melt and reduce sebaceous plugs in Acne Treatments. Depending upon your skin type, other forms of microdermabrasion such as Salicylic Chemical Peel Microdermabrasion and Silk Peel Diamond microdermabrasion may also be recommended by our medical spa or dermatology treatment team for the reduction of your stratum corneum. The resulting smooth stratum corneum is much more attractive, even and bright with a luminous glow.",
        images: [
            {
                url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648163415/DJBeauty/3e56c1_bb828293690e4fc3a4ae4f7c2b5d44a0_iym00o.webp",
                filename:"DJBeauty/3e56c1_bb828293690e4fc3a4ae4f7c2b5d44a0_iym00o"
            },
            {
                url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648163384/DJBeauty/Sonopeel_eynsed.png",
                filename:"DJBeauty/Sonopeel_eynsed"
            }
        ],
            price: [{
                duration: "60 Minutes",
                price: 45
            }]
        
    },
        {
        name:"Crystal Clear Microdermabrasion",
        description:"From a simple beauty flash that instantly rejuvenates and lifts tired skin, to more in-depth treatments for lines, wrinkles, acne scarring, stretch marks and pigmentation problems – it does it all. Microdermabrasion is a safe, controlled way to exfoliate skin and superficially peel the Stratum Corneum, reducing its thickness through mechanical abrasion of the dead skin cells. A flow of crystals hit the skin’s surface, and the speed and abrasiveness of these crystals gently removes the epidermal cells layer by layer. Used crystals and dead skin cells are drawn away through the vacuum action, allowing for controlled exfoliation.",
        images: [
            {
                url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648163677/DJBeauty/3e56c1_6eac33cb5d6142c48ac16d05bd49b39a_ey4t45.png",
                filename:"DJBeauty/3e56c1_6eac33cb5d6142c48ac16d05bd49b39a_ey4t45"
            },
            {
                url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648163832/DJBeauty/muvfoz30xgqivqqvi4zw.jpg",
                filename:"DJBeauty/muvfoz30xgqivqqvi4zw"
            }
        ],
            price: [{
                duration: "30 Minutes",
                price: 30
            },
                {
                    duration: "60 Minutes(Mask & Facial Massage included)",
                    price: 45
                }
                ]
        
    }
        

]
const seedFacial = async () => {
    await Facial.deleteMany({});
    for (let facial of facialData) {
        const newFacial = new Facial(facial);
        await newFacial.save()
    }
    console.log("done");
}
seedFacial()