import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { filename: string } }) {
  try {
    const backendUrl = `http://localhost:3001/file/view/${params.filename}`;
    const backendResponse = await fetch(backendUrl);

    if (!backendResponse.ok) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return new NextResponse(backendResponse.body, {
      headers: {
        "Content-Type": backendResponse.headers.get("Content-Type") || "application/octet-stream",
      },
    });
  } catch (error) {
    console.error("Error viewing file:", error);
    return NextResponse.json({ error: "Failed to retrieve file" }, { status: 500 });
  }
}
