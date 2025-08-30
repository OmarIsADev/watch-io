import db from "@/libs/db";
import { genSalt, hash } from "bcrypt";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const newUser: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  } | null = await req.json();

  if (!newUser) {
    return Response.json({ message: "Invalid request body" }, { status: 400 });
  }

  newUser.id = crypto.randomUUID();
  newUser.password = await hash(newUser.password, await genSalt(10));

  const sql = `
        INSERT INTO users (id, firstName, lastName, email, password)
        VALUES (?, ?, ?, ?, ?);
    `;

  try {
    await db.execute(sql, [
      newUser.id,
      newUser.firstName,
      newUser.lastName,
      newUser.email,
      newUser.password,
    ]);

    return Response.json({ newUser }, { status: 201 });
  } catch (err: unknown) {
    console.error(err);
    if ((err as { code: string })?.code?.includes("SQLITE_CONSTRAINT_UNIQUE")) {
      return new Response("User already exists", { status: 409 });
    } else {
      return new Response("Error creating user", { status: 500 });
    }
  }
}
