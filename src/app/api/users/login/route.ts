import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/Models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// import { connect } from "http2";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    // Check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    // check password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    // create a token
    const tokenData = {
      id: user._id,
      userName: user.userName,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "User logged in successfully",
      success: true,
      user,
      token,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
