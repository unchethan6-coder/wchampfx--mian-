import { NextResponse } from "next/server";
import { updateZoomMeetingTime } from "@/lib/zoom";
import { WEBINAR_CONFIG } from "@/lib/webinar-config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { meetingId, newStartTimeIso, newDateStr, newTimeStr } = body;

    if (!newStartTimeIso) {
      return NextResponse.json(
        { success: false, error: "Missing newStartTimeIso in request body" },
        { status: 400 }
      );
    }

    const targetMeetingId = meetingId || WEBINAR_CONFIG.defaultZoomMeetingId;

    // 1. Update Zoom Meeting / Webinar schedule
    const zoomUpdated = await updateZoomMeetingTime({
      meetingId: targetMeetingId,
      startTimeIso: newStartTimeIso,
    });

    // 2. Here we trigger batch email notifications or Google Apps script webhook
    const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "reschedule_master",
            meetingId: targetMeetingId,
            newDateStr,
            newTimeStr,
            newStartTimeIso,
          }),
        });
      } catch (e) {
        console.warn("Could not dispatch reschedule notification webhook:", e);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Master schedule shifted to ${newDateStr || newStartTimeIso}. Leads notified.`,
        zoomUpdated,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process reschedule" },
      { status: 500 }
    );
  }
}
