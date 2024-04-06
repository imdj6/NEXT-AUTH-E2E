import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bycyptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
Connect();

export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { email, password, username }: any = reqbody;
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User Already Exists" },
        { status: 400 }
      );
    }
    const salt = await bycyptjs.genSalt(10);
    const hashedPass = await bycyptjs.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPass,
      username,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json(
      { message: "user Registered Successfully", savedUser, success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
