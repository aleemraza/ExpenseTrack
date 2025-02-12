const { VERIFICATION_EMAIL_TEMPLATE,WELCOME_EMAIL_SUCCESS_TEMPLATE } = require('./emailTemplates');
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
module.exports = {sendVerificationEmail,sendWelcomeEmail}