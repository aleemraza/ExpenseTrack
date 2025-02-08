const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

const sendEMail = async(email,otp)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Secure  6-Digit OTP for ExpenseTrack Account Verification",
        text: `Welcome to ExpenseTrack – Your Smart Expense Manager! 
Dear User,

Thank you for signing up with ExpenseTrack. To complete your account verification, please use the following One-Time Password (OTP):

🔐 Your OTP: ${otp}

This OTP is valid for the next 10 minutes. Please do not share this code with anyone for security reasons.

With ExpenseTrack, you can easily monitor your expenses, set budgets, and gain financial insights to stay in control of your money.

If you did not request this verification, please ignore this email.

Best regards,  
The ExpenseTrack Team  
muhammadaleemraza1997@gmail.com`,
    }
    await  transporter.sendMail(mailOptions);
}

module.exports = {sendEMail} 

