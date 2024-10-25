import { db } from "@/lib/db";

export async function getUserStreakAndXP(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    const xp = user.streaks * 10;

    return {
      ...user,
      streak: user.streaks,
      xp,
    };
  } catch (error) {
    console.error("Error fetching user streak and XP:", error);
    throw error;
  }
}
