import { db } from "@/lib/db";
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
      },
      create: {
        email,
        password,
        lastLogin: currentDate,
        streaks: 1,
      },
    });

    const lastLoginDate = new Date(user.lastLogin);
    const timeDifferenceInMs = currentDate.getTime() - lastLoginDate.getTime();
    const hoursDifference = timeDifferenceInMs / (1000 * 60 * 60);

    let updatedUser = user;
    console.log(hoursDifference);

    if (hoursDifference >= 24 && hoursDifference < 48) {
      updatedUser = await db.user.update({
        where: { email },
        data: {
          streaks: {
            increment: 1,
          },
          lastLogin: currentDate,
        },
      });
    } else if (hoursDifference >= 48) {
      updatedUser = await db.user.update({
        where: { email },
        data: {
          streaks: 1,
          lastLogin: currentDate,
        },
      });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: String(error) }, { status: 500 });
  }
}
