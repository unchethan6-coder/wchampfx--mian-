// Master Webinar Configuration & Environment Variables

export const WEBINAR_CONFIG = {
  sheetId: process.env.GOOGLE_SHEET_ID || "1BPTi42tDKs-CHCG2W-ximhopnQb0x7QB6qFLkb6M3n0",
  scheduleTabName: "Webinar Schedule",
  leadsTabName: "lead form Webinar",
  zoomAccountId: process.env.ZOOM_ACCOUNT_ID || "",
  zoomClientId: process.env.ZOOM_CLIENT_ID || "",
  zoomClientSecret: process.env.ZOOM_CLIENT_SECRET || "",
  defaultZoomMeetingId: process.env.ZOOM_MEETING_ID || "84920391024",
  googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
  googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
  googleCalendarId: process.env.GOOGLE_CALENDAR_ID || "primary",
  defaultTimezone: "America/New_York",
};

export interface MasterWebinarSchedule {
  id: string;
  title: string;
  dateStr: string;
  timeStr: string;
  isoStart: string;
  isoEnd: string;
  zoomMeetingId: string;
  seatsLeft: number;
  isActive: boolean;
}

export interface LeadRegistrationPayload {
  fullName: string;
  email: string;
  phone: string;
  tradingExperience?: string;
  sessionId: string;
}

export interface RegistrantRecord {
  timestamp: string;
  fullName: string;
  email: string;
  phone: string;
  tradingExperience: string;
  sessionId: string;
  webinarDate: string;
  webinarTime: string;
  zoomJoinUrl: string;
  registrationStatus: string;
  calendarEventId: string;
}
