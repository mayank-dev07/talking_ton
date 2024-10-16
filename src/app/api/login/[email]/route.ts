import { getUserStreakAndXP } from "@/utils/dbutils";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    console.log(params);

    const { email } = params;
    console.log(`Processing streak for email: ${email}`);
    const { streak, xp } = await getUserStreakAndXP(email);
    return NextResponse.json({ streak, xp }, { status: 200 });
  } catch (error) {
    console.error("Error in GET function:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
