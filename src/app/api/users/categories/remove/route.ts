import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { userId, categoryId } = await req.json()

    if(!userId || !categoryId) {
      throw new Error("InAqequate Information")
    }

    const user = await prisma.user.findFirst({
      where: { id: userId }
    })
    
    if(!user?.categories?.includes(categoryId)!) {
      throw new Error("category not saved into your saved list")
    }

    const updatedList = user?.categories.filter(item => {
      return item !== categoryId
    })

    const result = await prisma.user.update({
      where: { id: userId },
      data: {
        categories: {
          set: updatedList
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: "item remove from list"
    },{
      status: 200
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    },{
      status: 400
    })
  }
}

