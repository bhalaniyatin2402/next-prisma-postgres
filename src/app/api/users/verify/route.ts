import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json()
    
    if (!email || !code) {
      throw new Error("Invalid credentail")
    }

    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })

    if (user?.verify_code == 1) {
      return NextResponse.json({
        success: true,
        message: "user already verified"
      }, { status: 200 })
    }

    if (!user || user?.verify_code !== Number(code)) {
      throw new Error("Incorrect verification code")
    }

    await prisma.user.update({
      where: {
        email,
        verify_code: Number(code)
      },
      data: { verify_code: 1 }
    })

    return NextResponse.json({
      success: true,
      message: "user verify successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }, {
      status: 200
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    }, {
      status: 400
    })
  }
}
