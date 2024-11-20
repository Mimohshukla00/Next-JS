import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/Models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// import { connect } from "http2";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userName, email, password } = reqBody;
        console.log(reqBody);
        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        // Create a new user
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
