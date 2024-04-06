import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bycyptjs from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
export const sendEmail = async function ({ email, emailType, userId }: any) {
  try {
    const hashedToken = uuidv4();
    console.log(hashedToken)
    if (emailType === "VERIFY") {
      console.log("verify")
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      },{ upsert: true });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPassword: hashedToken,
          forgotPasswordExpiry: Date.now() + 3600000,
        },
      });
    }
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });
    const mailOptions = {
      from: "mddanishjamal04@gmail.com",
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify Your email" : "Change Your Password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a></p>`,
    };
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
