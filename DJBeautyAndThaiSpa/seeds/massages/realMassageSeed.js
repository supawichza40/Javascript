if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ "path": "c:\\Work\\DevUploadToGithub\\Javascript\\DJBeautyAndThaiSpa\\.env" });
}
const { massage, price, duration } = require("./massageData");
const mongoose = require("mongoose")
console.log(massage, price, duration)
const Massage = require("../../models/massage")
main().catch(err => console.log(err));

async function main() {
    const dbUrl = process.env.DB_URL
    console.log(dbUrl)
    // await mongoose.connect('mongodb://127.0.0.1:27017/DJBeauty'); //Does work 
    await mongoose.connect(dbUrl)
}
const massageData = [
    {
    name:"Thai Massage",
    description:"Unlike more popular forms of massage that use oil or lotion and are done on an elevated massage table, Thai massage is usually done on a padded mat or futon on the floor. No oil or lotion is applied, so you are fully clothed. The therapist uses his or her hands, knees, legs, and feet to move you into a series of yoga-like stretches and also applies muscle compression, joint mobilization, and acupressure.",
    benefit:"Shiatsu is often used to relieve stress and protect against stress-related health issues. It is also said to boost energy and improve range of motion and flexibility. In addition, Thai massage is being explored as a treatment for the following health problems:Tension headaches, balance, certain types of back pain, muscle spasticity ",
    images: [
        {
            url:"https://res.cloudinary.com/kingofgodz/image/upload/v1648166085/DJBeauty/Young-female-receiving-massage-by-therapist-in-traditional-thai-position-732x549-thumbanil_gbtwl9.jpg",
            filename:"DJBeauty/Young-female-receiving-massage-by-therapist-in-traditional-thai-position-732x549-thumbanil_gbtwl9"
        },
        {
            url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648166175/DJBeauty/Thai-massage_wzmdiu.jpg",
            filename:"DJBeauty/Thai-massage_wzmdiu"
        }
    ],
    prices:
        [
            {
                duration: "30 minutes",
                amount:"30"
            },
            {
                duration: "45 minutes",
                amount:"45"
            },
            {
                duration: "60 minutes",
                amount:"49"
            },
            {
                duration: "90 minutes",
                amount:"69"
            },
            {
                duration: "120 minutes",
                amount:"90"
            }   
    ]
    },
    {
    name:"Swedish Massage",
    description:"Swedish massage techniques include circular pressure applied by the hands and palms, firm kneading, percussion-like tapping, bending and stretching. Before and during your Swedish massage session, communication is encouraged with your professional massage therapist so that your massage is customized to your specific needs.",
    benefit:"A study conducted by the National Center for Complementary and Alternative Medicine, and published in The New York Times, found that volunteers who received a 45-minute Swedish massage experienced significant decreases in levels of the stress hormone cortisol, as well as arginine vasopressin-a hormone that can lead to increases in cortisol. Volunteers also had increases in the number of lymphocytes, white blood cells that are part of the immune system, and a boost in the immune cells that may help fight colds and the flu.",
    images: [
        {
            url:"https://res.cloudinary.com/kingofgodz/image/upload/v1648167043/DJBeauty/358873fad4914931314b94f2036b503a_XL_ruxcpd.jpg",
            filename:"DJBeauty/358873fad4914931314b94f2036b503a_XL_ruxcpd"
        },
        {
            url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648167089/DJBeauty/SwedishMassage_1_kkitic.jpg",
            filename:"DJBeauty/SwedishMassage_1_kkitic"
        }
    ],
    prices:
        [
            {
                duration: "30 minutes",
                amount:"30"
            },
            {
                duration: "45 minutes",
                amount:"45"
            },
            {
                duration: "60 minutes",
                amount:"49"
            },
            {
                duration: "90 minutes",
                amount:"69"
            },
            {
                duration: "120 minutes",
                amount:"90"
            }   
    ]
    },
    {
    name:"Aromatherapy Massage",
    description:"Aromatherapy massage is massage therapy with essential oils (highly concentrated plant oils) added to the massage oil or lotion. Inhaling essential oils through the nose is thought to promote beneficial changes in the mind and body by affecting the limbic system (a region of the brain known to influence the nervous system). Essential oils are also believed to be absorbed through the skin.",
    benefit:"Aromatherapy massage appears to reduce the pain and discomfort of menstrual cramps, a 2015 study from the Journal of Obstetrics and Gynaecology suggests. Participants did a self-massage with rose essential oil, an unscented almond oil, or no oil on the first day of menstruation for two menstrual cycles. By the second cycle, aromatherapy massage reduced the severity of pain compared to massage therapy with almond oil or no oil. Massage with aromatherapy may also ease menopausal symptoms.",
    images: [
        {
            url:"https://res.cloudinary.com/kingofgodz/image/upload/v1648167311/DJBeauty/Aromatherapy-Massage-Oils-Therapy_lsmcpq.jpg",
            filename:"DJBeauty/Aromatherapy-Massage-Oils-Therapy_lsmcpq"
        },
        {
            url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648167311/DJBeauty/Aromatherapy-Massage-Oils-Therapy_lsmcpq.jpg",
            filename:"DJBeauty/Aromatherapy-Massage-Oils-Therapy_lsmcpq"
        }
    ],
    prices:
        [
            {
                duration: "30 minutes",
                amount:"30"
            },
            {
                duration: "45 minutes",
                amount:"45"
            },
            {
                duration: "60 minutes",
                amount:"49"
            },
            {
                duration: "90 minutes",
                amount:"69"
            },
            {
                duration: "120 minutes",
                amount:"90"
            }   
    ]
    },
    {
    name:"Deep Tissue Massage",
    description:"A type of massage therapy, deep tissue massage uses firm pressure and slow strokes to reach deeper layers of muscle and fascia (the connective tissue surrounding muscles). It's used for chronic aches and pain and contracted areas such as a stiff neck and upper back, low back pain, leg muscle tightness, and sore shoulders.",
    benefit:"Deep tissue massage usually focuses on a specific problem, such as chronic muscle pain, injury rehabilitation, and the following conditions: Low back pain, limited mobility, recovery from injuries, repetitive strain injury, postural problems, muscle tension in the hamstrings,glutes, IT band, quadriceps, rhomboids, upperback , sciatica, sport concerns, fibromyalgia, upper back or neck pain",
    images: [
        {
            url:"https://res.cloudinary.com/kingofgodz/image/upload/v1648167753/DJBeauty/606726c852f11d0019431bed_nfjaoz.jpg",
            filename:"DJBeauty/606726c852f11d0019431bed_nfjaoz"
        },
        {
            url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648167790/DJBeauty/Deep-Tissue-Massage_nb2vvx.jpg",
            filename:"DJBeauty/Deep-Tissue-Massage_nb2vvx"
        }
    ],
    prices:
        [
            {
                duration: "30 minutes",
                amount:"30"
            },
            {
                duration: "45 minutes",
                amount:"45"
            },
            {
                duration: "60 minutes",
                amount:"49"
            },
            {
                duration: "90 minutes",
                amount:"69"
            },
            {
                duration: "120 minutes",
                amount:"90"
            }   
    ]
    },
    {
    name:"Thai Hot Oil Massage",
    description:"A hot oil massage can soothe, relax and relieve muscle tension. Thai Oil Massage is used to provide massage to the back by gently massaging with tender touch oils. Essential oils too can be used as a part of the treatment of Thai Body Massage. Best results can be achieved with the application of correct hand strokes for massage. It provides best flexibility to the body and increases the pumping of oxygen to various organs of the body providing better health.",
    benefit:"Hot oil massages can produce a number of benefits from head to toe. Starting with the scalp, it helps to improve circulation in both the head and neck. It relaxes the scalp and brings oxygenated blood to the roots of the hair thereby strengthening it. Massage encourages new hair growth, retards and slows the arrival of grey hair, reduces, dry flaky scalp and improves alertness and concentration. Moreover, these results can be accomplished at home without the intervention of a specialist.",
    images: [
        {
            url:"https://res.cloudinary.com/kingofgodz/image/upload/v1648167945/DJBeauty/Thai-Oil_zqmsc8.jpg",
            filename:"DJBeauty/Thai-Oil_zqmsc8"
        },
        {
            url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648167966/DJBeauty/7d_w8mcrq.jpg",
            filename:"DJBeauty/7d_w8mcrq"
        }
    ],
    prices:
        [
            {
                duration: "30 minutes",
                amount:"30"
            },
            {
                duration: "45 minutes",
                amount:"45"
            },
            {
                duration: "60 minutes",
                amount:"49"
            },
            {
                duration: "90 minutes",
                amount:"69"
            },
            {
                duration: "120 minutes",
                amount:"90"
            }   
    ]
    },
    {
    name:"Thai Herbal Compress",
    description:"The Thai Herbal Compress technique offers several potential health benefits:  It induces deep relaxation, relieves stress and  fatigue, boosts both emotional and physical well-being, assists  alignment and postural integrity of the body, improves circulation of  blood and lymph and stimulates the internal organs.",
    benefit:"Reduce Tension, Deep relaxation of muscle, Soften and nourishes the skin, Eases respiration through the use of aromatic herbal vapours, improve circualtion, aids elimanation of toxins, restore the body's vital energy flow.",
    images: [
        {
            url:"https://res.cloudinary.com/kingofgodz/image/upload/v1648168165/DJBeauty/3e56c1_19790060ff1a435dad83399f52684164_mv2_piy0s5.jpg",
            filename:"DJBeauty/3e56c1_19790060ff1a435dad83399f52684164_mv2_piy0s5"
        },
        {
            url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648168214/DJBeauty/Luk-Pra-Kob-thai-herbal-press-1_xt4sqb.jpg",
            filename:"DJBeauty/Luk-Pra-Kob-thai-herbal-press-1_xt4sqb"
        }
    ],
    prices:
        [
            {
                duration: "60 minutes",
                amount:"60"
            }
    ]
    },
    {
    name:"Hot Stone Massage",
    description:"The use of the hot stones makes this style unique. Typically made of basalt, the iron-rich stones retain heat. River rocks are typically used because they have become smooth over time from the river's current. e localized heat warms and relax the muscles, allowing the massage therapist to apply deeper pressure. While many therapists use anatomy to guide the placement of the stones, some massage therapists will also place stones on points thought to energetically balance the mind and body.",
    benefit:"Some people find the warmth of the hot stones to be comforting and deeply relaxing. Hot stone massage is suited to people who tend to feel chilly. It's also suited for people who have muscle tension but prefer a lighter massage. The heat relaxes muscles, allowing the therapist work the muscles using lighter pressure. Although there's a lack of research on the benefits of hot stone massage, the therapy is often used for the same conditions as a classic massage: Anxiety, Back pain, Depression, Insomnia, Osteoarthritis",
    images: [
        {
            url:"https://res.cloudinary.com/kingofgodz/image/upload/v1648168811/DJBeauty/Hot-Stone-Massage_ozmozh.jpg",
            filename:"DJBeauty/Hot-Stone-Massage_ozmozh"
        },
        {
            url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648168783/DJBeauty/Wisniewski_Chiropractic-10.23-Blog__a9vmmc.jpg",
            filename:"DJBeauty/Wisniewski_Chiropractic-10.23-Blog__a9vmmc"
        }
    ],
    prices:
        [
            {
                duration: "60 minutes",
                amount:"60"
            },
            {
                duration: "90 minutes",
                amount:"85"
            },
            {
                duration: "120 minutes",
                amount:"110"
            }  
    ]
    },
    {
    name:"Thai Herbal Body Scrub",
    description:"Body scrubs help exfoliate the skin and get rid of skin dullness away. The scrubbing technique in circular motion definitely helps increase blood circulation, toning the skin for a smoother touch.",
    benefit:"he blend of traditional Thai herbs used in these compresses has a relaxing and invigorating effect on the body and mind, soothing sore and overworked muscles while giving the body's energy reserves a huge boost.",
    images: [
        {
            url:"https://res.cloudinary.com/kingofgodz/image/upload/v1648169171/DJBeauty/herbalspa-welcome_vq7uar.jpg",
            filename:"DJBeauty/herbalspa-welcome_vq7uar"
        },
        {
            url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648169132/DJBeauty/thai-herbal-body-scrub-skin-treatment-natural-ingredients-35594652_kngfuk.jpg",
            filename:"DJBeauty/thai-herbal-body-scrub-skin-treatment-natural-ingredients-35594652_kngfuk"
        }
    ],
    prices:
        [
            {
                duration: "60 minutes",
                amount:"60"
            },
            {
                duration: "90 minutes",
                amount:"85"
            },
            {
                duration: "120 minutes",
                amount:"110"
            } 
    ]
    },
    {
    name:"SPORT MASSAGE",
    description:"The main purpose of sports massage is to help alleviate the stress and tension which builds up in the body’s soft tissues during physical activity. Where minor injuries and lesions occur, due to overexertion and/or overuse, massage can break them down quickly and effectively. Above all, it can help prevent those injuries that often gets in the way of achievements, whether if one is an athlete.",
    benefit:"Increase blood flow, joint range of motion, flexibility, elimination of exercise waste products, sense of well-being, Decrease muscle tension, neurological excitibility, chance of injury, recovery time between workouts, muscle spasms",
    images: [
        {
            url:"https://res.cloudinary.com/kingofgodz/image/upload/v1648169032/DJBeauty/image-asset_qmo3xs.jpg",
            filename:"DJBeauty/image-asset_qmo3xs"
        },
        {
            url: "https://res.cloudinary.com/kingofgodz/image/upload/v1648169088/DJBeauty/sports-massage-1-scaled_wcor0j.jpg",
            filename:"DJBeauty/sports-massage-1-scaled_wcor0j"
        }
    ],
    prices:
        [
            {
                duration: "30 minutes",
                amount:"30"
            },
            {
                duration: "45 minutes",
                amount:"45"
            },
            {
                duration: "60 minutes",
                amount:"49"
            },
            {
                duration: "90 minutes",
                amount:"69"
            },
            {
                duration: "120 minutes",
                amount:"90"
            }   
    ]
    }
]

const seedMassage = async function () {
    await Massage.deleteMany({});
    for (let massage_data of massageData) {
        const newMassage = new Massage(massage_data);
        await newMassage.save();
    }
    console.log("Done")


}
seedMassage()