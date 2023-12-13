import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

export const sendVerificationEmail = async (email, refresh_token) => {
    try {
      const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
      );
  
      oAuth2Client.setCredentials({
        refresh_token: refresh_token,
      });
  
      const accessToken = await oAuth2Client.getAccessToken();
  
      console.log('Access Token:', accessToken);
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.GMAIL_USER,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: refresh_token,
          accessToken: accessToken,
        },
      });
  
      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Verify Your Email',
        text: 'Click the following link to verify your email: http://yourwebsite.com/verify?token=verificationToken',
      };
  
      await transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };
  
