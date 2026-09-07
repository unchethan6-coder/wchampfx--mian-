import { WEBINAR_CONFIG, MasterWebinarSchedule, RegistrantRecord } from "./webinar-config";

const DEFAULT_SCHEDULES: MasterWebinarSchedule[] = [
  {
    id: "session-1",
    title: "$1,000,000 Roadmap to Institutional Trading",
    dateStr: "Thursday, Oct 15, 2026",
    timeStr: "8:00 PM EST (New York Time)",
    isoStart: "20261015T200000Z",
    isoEnd: "20261015T213000Z",
    zoomMeetingId: WEBINAR_CONFIG.defaultZoomMeetingId,
    seatsLeft: 18,
    isActive: true,
  },
  {
    id: "session-2",
    title: "$1,000,000 Roadmap to Institutional Trading",
    dateStr: "Saturday, Oct 17, 2026",
    timeStr: "2:00 PM EST (New York Time)",
    isoStart: "20261017T180000Z",
    isoEnd: "20261017T193000Z",
    zoomMeetingId: WEBINAR_CONFIG.defaultZoomMeetingId,
    seatsLeft: 7,
    isActive: true,
  },
  {
    id: "session-3",
    title: "$1,000,000 Roadmap to Institutional Trading",
    dateStr: "Tuesday, Oct 20, 2026",
    timeStr: "8:00 PM EST (New York Time)",
    isoStart: "20261020T200000Z",
    isoEnd: "20261020T213000Z",
    zoomMeetingId: WEBINAR_CONFIG.defaultZoomMeetingId,
    seatsLeft: 24,
    isActive: true,
  },
];

/**
 * Fetches the active Master Schedule from Google Sheets ('Webinar Schedule' tab)
 */
export async function getMasterScheduleFromSheet(): Promise<MasterWebinarSchedule[]> {
  const csvUrl = `https://docs.google.com/spreadsheets/d/${WEBINAR_CONFIG.sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    WEBINAR_CONFIG.scheduleTabName
  )}`;

  try {
    const res = await fetch(csvUrl, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.warn(`Could not fetch public CSV from sheet ${WEBINAR_CONFIG.sheetId}, using defaults.`);
      return DEFAULT_SCHEDULES;
    }

    const text = await res.text();
    const rows = text
      .split("\n")
      .map((r) => r.replace(/"/g, "").split(","))
      .filter((cols) => cols.length >= 4 && !cols[0].toLowerCase().includes("date"));

    if (rows.length === 0) {
      return DEFAULT_SCHEDULES;
    }

    return rows.map((cols, idx) => ({
      id: `session-sheet-${idx + 1}`,
      title: "$1,000,000 Roadmap to Institutional Trading",
      dateStr: cols[0]?.trim() || `Session ${idx + 1}`,
      timeStr: cols[1]?.trim() || "8:00 PM EST",
      isoStart: cols[2]?.trim() || "20261015T200000Z",
      isoEnd: cols[3]?.trim() || "20261015T213000Z",
      zoomMeetingId: cols[4]?.trim() || WEBINAR_CONFIG.defaultZoomMeetingId,
      seatsLeft: cols[5] ? parseInt(cols[5].trim(), 10) : 15,
      isActive: true,
    }));
  } catch (err) {
    console.error("Error reading Google Sheets schedule:", err);
    return DEFAULT_SCHEDULES;
  }
}

/**
 * Appends a newly registered lead to 'lead form Webinar' tab
 */
export async function appendLeadToSheet(record: RegistrantRecord): Promise<boolean> {
  // If webhook URL or Apps Script URL is configured:
  const webhookUrl = process.env.GOOGLE_APPS_SCRIPT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
      return res.ok;
    } catch (err) {
      console.error("Failed to append lead via Google Apps Script Webhook:", err);
    }
  }

  // Fallback / log for verification
  console.log("Lead captured for Google Sheet:", record);
  return true;
}
