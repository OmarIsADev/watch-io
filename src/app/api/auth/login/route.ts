import db from "@/libs/db";
import { User } from "@/store/user";
import { compare } from "bcrypt";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const rs = await db.execute(`SELECT * FROM users WHERE email = ?`, [
      body.email,
    ]);

    console.log(rs.rows[0]);

    const user = rs.rows[0] as unknown as null | ({ password: string } & User);

    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      throw new Error("JWT secret not found");
    }

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    if (await compare(body.password, user.password)) {
      const token = jwt.sign({ id: user.id }, secret);

      const serilized = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return NextResponse.json(user, {
        headers: {
          "Set-Cookie": serilized,
        },
      });
    } else {
      return new Response("Password is incorrect", { status: 401 });
    }
  } catch (err) {
    console.log(err);

    if (
      typeof err === "object" &&
      err &&
      "code" in err &&
      err.code === "ER_NO_SUCH_TABLE"
    ) {
      return new Response("User not found", { status: 404 });
    } else {
      return new Response("Something went wrong", { status: 500 });
    }
  }
}
