import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const formData = await req.formData(); // Read form data
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Get driver ID from dynamic route
    const driverId = params.id;
    if (!driverId) {
      return NextResponse.json({ error: "Driver ID is required" }, { status: 400 });
    }

    // Convert FormData to standard fetch body format
    const newFormData = new FormData();
    newFormData.append("file", file);
    newFormData.append("driverId", driverId); // Send driver ID in the request body

    const backendUrl = `http://localhost:3001/file/upload`; // Send request to NestJS API
    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      body: newFormData,
    });

    const data = await backendResponse.json();
    return NextResponse.json(data, { status: backendResponse.status });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
