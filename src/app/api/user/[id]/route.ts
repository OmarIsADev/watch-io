import db from "@/libs/db";

export async function GET(
  _: unknown,
  { params }: { params: Promise<{ id: string }> },
) {
  const userId = (await params).id;

  if (!userId) {
    return new Response("User ID is required", { status: 400 });
  }

  try {
    const rs = await db.execute(
      "SELECT email, firstName, lastName FROM users WHERE id = ?",
      [userId],
    );

    const user = rs.rows[0];

    if (user) {
      return new Response(JSON.stringify(user));
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Error fetching user", { status: 500 });
  }
}
