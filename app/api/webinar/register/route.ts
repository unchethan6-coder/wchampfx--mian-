import { NextResponse } from "next/server";
import { getMasterScheduleFromSheet, appendLeadToSheet } from "@/lib/google-sheets";
import { registerZoomLead } from "@/lib/zoom";
import { generateGoogleCalendarUrl } from "@/lib/calendar";
import { LeadRegistrationPayload, RegistrantRecord } from "@/lib/webinar-config";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadRegistrationPayload;

    if (!body.fullName || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: fullName, email, phone" },
        { status: 400 }
      );
    }

    // 1. Fetch available schedules and locate chosen session
    const schedules = await getMasterScheduleFromSheet();
    const session = schedules.find((s) => s.id === body.sessionId) || schedules[0];

    // 2. Register with Zoom API
    const zoomResult = await registerZoomLead({
      meetingId: session.zoomMeetingId,
      email: body.email,
      fullName: body.fullName,
      phone: body.phone,
    });

    // 3. Generate Calendar Link
    const googleCalendarUrl = generateGoogleCalendarUrl(session, zoomResult.joinUrl, body.fullName);

    // 4. Save Lead into Google Sheet 'lead form Webinar'
    const record: RegistrantRecord = {
      timestamp: new Date().toISOString(),
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      tradingExperience: body.tradingExperience || "Beginner",
      sessionId: session.id,
      webinarDate: session.dateStr,
      webinarTime: session.timeStr,
      zoomJoinUrl: zoomResult.joinUrl,
      registrationStatus: "Confirmed",
      calendarEventId: `evt-${Date.now()}`,
    };

    await appendLeadToSheet(record);

    return NextResponse.json(
      {
        success: true,
        message: "Webinar registration confirmed",
        data: {
          ...record,
          googleCalendarUrl,
          session,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Registration route error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process registration" },
      { status: 500 }
    );
  }
}
