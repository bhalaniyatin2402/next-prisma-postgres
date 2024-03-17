import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId, categoryId } = await req.json();

    if (!userId || !categoryId) {
      throw new Error("inadaquate information to update")
    }

    const res = await prisma.user.update({
      where: { id: userId },
      data: {
        categories: {
          push: categoryId
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: "item added to your favorite list"
    }, {
      status: 200
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, {
      status: 400
    })
  }
}
