import { db } from "@/lib/db";
import { NextResponse } from "next/server";

type Data = {
  message: string;
};

export async function POST(req: Request) {
  console.log(req);

  const {
    email,
    walletAddress,
  }: { email: string; walletAddress: string | null } = await req.json();

  console.log("test", email, walletAddress);

  try {
    await db.user.update({
      where: { email },
      data: {
        walletAddress,
      },
    });

    return NextResponse.json({ message: "wallet added" }, { status: 200 });
  } catch (error) {
    console.error("Error updating wallet address:", error);
    return NextResponse.json({ message: String(error) }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving user data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
