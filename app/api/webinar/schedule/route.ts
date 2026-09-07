import { NextResponse } from "next/server";
import { getMasterScheduleFromSheet } from "@/lib/google-sheets";

export async function GET() {
  try {
    const schedules = await getMasterScheduleFromSheet();
    return NextResponse.json({ success: true, schedules }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch master webinar schedule" },
      { status: 500 }
    );
  }
}
