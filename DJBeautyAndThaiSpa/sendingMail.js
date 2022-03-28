if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({path:__dirname+"/.env"});

}
const { json } = require("body-parser");
const { custom } = require("joi");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD
    }
});
const convertBodyToReadableFormat = function (body) {
    let name = `Name:${body.name}`
    let email = `Email:${body.email}`
    let phone = `Phone:${body.phone}`
    let description = `Description:${body.description}`
    let createForm = `${name}\n${email}\n${phone}\n${description}`
    return createForm
}

const sendMessage = function (body,customerEmail) {
    
    var mailOptions = {
        from: process.env.GOOGLE_EMAIL,
        to: customerEmail,
        subject: "Thank you for getting in touch from D&J Beauty and Thai Spa",
        text: `Dear ${body.name}\n\nThank you for contacting D&J Beauty and Thai Spa, We will get in touch with you as soon as possible, for a faster response, please call us on 020 3659 8400\n\nKind regards\n\nD&J Beauty and Thai Spa\nTel:020 3659 8400\nEmail:djbeauty178@gmail.com\nAddress:178 High Street,\nHigh Barnet\nEN55SZ`
    };
    var mailToAdmin = {
        from: process.env.GOOGLE_EMAIL,
        to: process.env.GOOGLE_EMAIL,
        subject: "Customer enquiry",
        text: convertBodyToReadableFormat(body)
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    transporter.sendMail(mailToAdmin, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendMessage