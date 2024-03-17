// import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";

import prisma from '@/lib/prisma';
import { sendMail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password }: any = await req.json()
    
    if(!name || !email || !password) {
      throw new Error("All Fields are required")
    }

    const isUserExist = await prisma.user.findFirst({
      where: { email }
    })

    if(isUserExist) {
      throw new Error("email already used by user")
    }

    const verification_code: number = Math.floor(Math.random() * 100000000)

    const hashPassword = await bcrypt.hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        verify_code: verification_code
      }
    })

    await sendMail(email, "E-mail verification test", `verification code - ${verification_code}`)

    return NextResponse.json({
      message: "user created successfully",
      success: true
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
