import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if(!email || !password) {
      throw new Error("email and passsword is required")
    }

    const user = await prisma.user.findFirst({
      where: { email }
    })

    // if(user?.verify_code !== 1) {
    //   throw new Error("please verify your email first")
    // }

    const isCorrectPassword = await bcrypt.compare(password, user?.password!)

    if(!isCorrectPassword) {
      throw new Error("incorrect Email or password")
    }

    return NextResponse.json({
      success: true,
      message: "user login succesfullly",
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      }
    },{
      status: 200
    })

  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    },{
      status: 400
    })
  }
}
