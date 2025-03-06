const { VERIFICATION_EMAIL_TEMPLATE,WELCOME_EMAIL_SUCCESS_TEMPLATE,USER_INIVITE_EMAIL__TEMPLATE 
	,  PAYMENT_ADDED_EMAIL_TEMPLATE
} = require('./emailTemplates');
const { transporter , mailOptions } = require('./mailtrap.config');

const sendVerificationEmail = async (email,otp) => {
	try {
		const response = await transporter.sendMail({
			from: `"${mailOptions.name}" <${mailOptions.email}>`,
			to: email,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", otp),
			// category: "Email Verification",
		});
	} catch (error) {
		console.error(`Error sending verification`, error);
	}
}

const sendWelcomeEmail  = async (email,name) => {
	try {
		const response = await transporter.sendMail({
			from: `"${mailOptions.name}" <${mailOptions.email}>`,
			to: email,
			subject: "Verify your email",
			html: WELCOME_EMAIL_SUCCESS_TEMPLATE.replace("{name}", name),
		});
	} catch (error) {
		console.error(`Error sending verification`, error);
	}
}


const send_User_Invite_Email  = async (email,signupLink,name) => {
	try {
		const response = await transporter.sendMail({
			from: `"${mailOptions.name}" <${mailOptions.email}>`,
			to: email,
			subject: `You're invited to join ExpenseTrack Group ${name}`,
			html: USER_INIVITE_EMAIL__TEMPLATE.replace("{signupLink}", signupLink,"{groupname}", name)
			.replace("{groupname}", name),
		});
	} catch (error) {
		console.error(`Error sending verification`, error);
	}
}

const send_PAYMENT_ADDED_EMAIL = async(userEmail, username, groupname, amount, totalAmount, groupBudget)=>{
	try{
		const response = await transporter.sendMail({
			from: `"${mailOptions.name}" <${mailOptions.email}>`,
			to: userEmail,
			subject: `ExpenseTrack  Payment Successfully Added ${username}`,
			html: PAYMENT_ADDED_EMAIL_TEMPLATE.replace('{username}', username)
			.replace('{groupname}', groupname)
			.replace('{amount}', amount)
			.replace('{totalAmount}', totalAmount)
			.replace('{groupBudget}', groupBudget)
			.replace('{dashboardLink}', 'https://yourapp.com/dashboard')
		});
	}catch(error){
		console.error(`Error sending verification`, error);

	}

}
module.exports = {sendVerificationEmail,sendWelcomeEmail,send_User_Invite_Email,send_PAYMENT_ADDED_EMAIL}