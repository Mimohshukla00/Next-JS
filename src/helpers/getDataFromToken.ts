import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
