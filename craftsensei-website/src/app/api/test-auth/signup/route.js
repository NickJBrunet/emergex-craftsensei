import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

let users = []; // *****************Replace with your database later************* WILL USE FIREBASE AUTHENTICATION
let nextId = 1;

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (users.find((u) => u.email === email)) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = {
      id: nextId++,
      name,
      email,
      password: hashedPassword,
    };

    users.push(user);

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json(
      { error: "Signup failed" },
      { status: 500 }
    );
  }
}



