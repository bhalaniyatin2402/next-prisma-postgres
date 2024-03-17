import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany()

    return NextResponse.json({
      success: true,
      data: categories
    })
  } catch (error: any) {
    return NextResponse.json({
      error: error.message
    },{
      status: 400
    })
  }
}
