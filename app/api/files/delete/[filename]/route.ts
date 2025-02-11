import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { filename: string } }) {
  try {
    const backendUrl = `http://localhost:3001/file/${params.filename}`;
    const backendResponse = await fetch(backendUrl, {
      method: "DELETE",
    });

    if (!backendResponse.ok) {
      throw new Error("Failed to delete file");
    }

    const responseData = await backendResponse.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
