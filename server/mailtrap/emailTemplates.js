const VERIFICATION_EMAIL_TEMPLATE  = `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verify Your Email</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Thank you for signing up! Your verification code is:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`

const WELCOME_EMAIL_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Service</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; text-align: center; }
    .container { max-width: 600px; margin: 20px auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; border-radius: 10px 10px 0 0; color: white; font-size: 24px; }
    .content { padding: 20px; text-align: left; }
    .btn { display: inline-block; background: #4CAF50; color: white; padding: 10px 20px; margin-top: 20px; border-radius: 5px; text-decoration: none; font-weight: bold; }
    .footer { margin-top: 20px; font-size: 12px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">🎉 Welcome to ExpenseTrack!</div>
    <div class="content">
     <p>Hi {name},</p>
      <p>We’re excited to have you on board. Get ready to explore our services and enjoy a seamless experience with us.</p>
        <p>Click the button below to get started:</p>
        
      <div style="text-align: center;">
         <a href="{verificationLink}" class="btn">Get Started</a>
      </div>
      <p>If you have any questions, feel free to reach out to us at muhammadaleemraza1997@gmail.com.</p>
      <p>If you need help, contact our support team at <a href="muhammadaleemraza1997@gmail.com">muhammadaleemraza1997@gmail.com</a></p>
    </div>
    <div class="footer">&copy; 2024 ExpenseTrack!. All rights reserved.</div>
  </div>
</body>
</html>

`;


const USER_INIVITE_EMAIL__TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Service</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; text-align: center; }
    .container { max-width: 600px; margin: 20px auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; border-radius: 10px 10px 0 0; color: white; font-size: 24px; }
    .content { padding: 20px; text-align: left; }
    .btn { display: inline-block; background: #4CAF50; color: white; padding: 10px 20px; margin-top: 20px; border-radius: 5px; text-decoration: none; font-weight: bold; }
    .footer { margin-top: 20px; font-size: 12px; color: #888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">🎉 You're invited to join {groupname}</div>
    <div class="content">
     <p>Hi,</p>
      <p>Click the link below to sign up and join:</p>
        
      <div style="text-align: center;">
         <a href="{signupLink}" class="btn">Join Now</a>
      </div>
      <p>The link expires in 24 hours.</p>
      <p>If you have any questions, feel free to reach out to us at muhammadaleemraza1997@gmail.com.</p>
      <p>If you need help, contact our support team at <a href="muhammadaleemraza1997@gmail.com">muhammadaleemraza1997@gmail.com</a></p>
    </div>
    <div class="footer">&copy; 2024 ExpenseTrack!. All rights reserved.</div>
  </div>
</body>
</html>
`
module.exports = {VERIFICATION_EMAIL_TEMPLATE,WELCOME_EMAIL_SUCCESS_TEMPLATE,USER_INIVITE_EMAIL__TEMPLATE}