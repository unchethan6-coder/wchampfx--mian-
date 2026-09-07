import { MasterWebinarSchedule } from "./webinar-config";

/**
 * Generates an instant, direct "Add to Google Calendar" URL
 */
export function generateGoogleCalendarUrl(
  schedule: MasterWebinarSchedule,
  zoomJoinUrl: string,
  registrantName?: string
): string {
  const title = encodeURIComponent("WChamp FX: 1M Roadmap Masterclass (Live VIP)");
  const description = encodeURIComponent(
    `Hi ${registrantName || "Trader"},\n\n` +
      `Your seat is locked for the WChamp FX $1,000,000 Roadmap Webinar.\n\n` +
      `Direct Zoom Access: ${zoomJoinUrl}\n\n` +
      `Important:\n` +
      `- Please arrive 5 minutes early to test your audio.\n` +
      `- Have your trading journal ready for actionable liquidity setups.\n` +
      `- Live Q&A and indicators shared at the conclusion.\n\n` +
      `Hosted by WChamp FX.`
  );
  const location = encodeURIComponent(zoomJoinUrl);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${schedule.isoStart}/${schedule.isoEnd}&details=${description}&location=${location}`;
}

/**
 * Generates an .ics file string for Apple Calendar / Outlook
 */
export function generateIcsContent(
  schedule: MasterWebinarSchedule,
  zoomJoinUrl: string,
  registrantName?: string
): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WChamp FX//Webinar Roadmap//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:webinar-${schedule.id}-${Date.now()}@wchampfx.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${schedule.isoStart}`,
    `DTEND:${schedule.isoEnd}`,
    "SUMMARY:WChamp FX: $1M Roadmap Masterclass (Live VIP)",
    `DESCRIPTION:Your seat is locked for WChamp FX $1M Roadmap Masterclass.\\nDirect Zoom Link: ${zoomJoinUrl}`,
    `LOCATION:${zoomJoinUrl}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    "DESCRIPTION:WChamp FX Webinar starting in 15 minutes",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
