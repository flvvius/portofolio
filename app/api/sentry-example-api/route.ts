import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Sentry API route working",
  });
}

export async function POST() {
  const shouldError = Math.random() > 0.5;

  if (shouldError) {
    throw new Error("This is an example error from the Sentry API route");
  }

  return NextResponse.json({ success: true, message: "No error occurred" });
}
