import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import categoryList from "../../../../types/data.json"

export async function GET(req: NextRequest) {
  try {
    // alert - do not run this query again
    // this smaple data alrady stored into database

    // const result = await prisma.category.createMany({
    //   data: categoryList
    // })

    // console.log(result);

    return NextResponse.json({
      success: true,
      message: "items added successfully"
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
