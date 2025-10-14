import { register } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const req = register(body);
    const { status, statusCode, message } = await req;

    if (!status) throw { status, statusCode, message };

    return NextResponse.json(
      { status, statusCode, message },
      { status: statusCode },
    );
  } catch (error) {
    console.error("Register error:", error);

    const knownError =
      typeof error === "object" && error !== null
        ? (error as { status?: boolean; statusCode?: number; message?: string })
        : null;

    return NextResponse.json(
      {
        status: knownError?.status,
        statusCode: knownError?.statusCode,
        message: knownError?.message,
      },
      { status: knownError?.statusCode || 500 },
    );
  }
}
