import { db } from "@/lib/db";
// import { handleUserStreak } from "@/utils/dbutils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password }: { email: string; password: string } =
    await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const currentDate = new Date();

    const user = await db.user.upsert({
      where: { email },
      update: {
        lastLogin: currentDate,
        streaks: {
          increment: 1,
        },
      },
      create: {
        email,
        password,
        lastLogin: currentDate,
        streaks: 1,
      },
    });

    const lastLoginDate = new Date(user.lastLogin);
    const daysDifference = Math.floor(
      (currentDate.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    let updatedUser = user;
    if (daysDifference > 1) {
      updatedUser = await db.user.update({
        where: { email },
        data: {
          streaks: 1,
        },
      });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
