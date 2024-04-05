import { Connect } from "@/dbConfig/dbConfig";
import { getdatafromtoken } from "@/helper/getdatafromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
Connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getdatafromtoken(request);
    const user = User.findOne({ _id: userId }).select("-password");

    return NextResponse.json(
      { msg: "User Found", data: user },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
