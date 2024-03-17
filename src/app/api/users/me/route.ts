// import prisma from "@/lib/prisma";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { URLSearchParams } from "url";

export async function GET(req: NextRequest) {
  try {
    const url : any = req.url
    const params = new URLSearchParams(url)
    const id = Number(params.get('http://localhost:3000/api/users/me?id'))

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
