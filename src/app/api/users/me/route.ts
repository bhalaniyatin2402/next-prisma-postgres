// import prisma from "@/lib/prisma";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { URLSearchParams } from "url";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    if(!id) {
      throw new Error("Invalid User")
    }
    
    const user = await prisma.user.findFirst({
      where: { id }
    })

    if(!user) {
      throw new Error("Invalid User")
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        categories: user.categories
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
