import { verify } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import db from "@/libs/db";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token)
    return new Response(JSON.stringify({ message: "Token is required" }), {
      status: 403,
    });

  const id = (verify(token, process.env.JWT_SECRET_KEY || "") as { id: string })
    .id;

  if (!id)
    return new Response(JSON.stringify({ message: "missing ID" }), {
      status: 402,
    });

  const sql = `SELECT email, firstName, lastName FROM users WHERE id = ?`;

  try {
    const res = await db.execute(sql, [id]);
    res.rows[0].id = id;
    const user = res.rows[0];

    return new Response(JSON.stringify(user));
  } catch (err) {
    return new Response(JSON.stringify(err));
  }
}
