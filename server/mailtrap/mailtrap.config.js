const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
});
const mailOptions = {
    email: process.env.EMAIL_USER,
    name : "The ExpenseTrack Team"
}
module.exports = {transporter, mailOptions}