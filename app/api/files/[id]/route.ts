import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const backendUrl = `http://localhost:3001/file?driverId=${params.id}`;
    const backendResponse = await fetch(backendUrl, {
      method: "GET",
    });

    if (!backendResponse.ok) {
      throw new Error("Failed to fetch files");
    }

    const files = await backendResponse.json();
    return NextResponse.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}
