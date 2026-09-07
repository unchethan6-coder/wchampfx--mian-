import { WEBINAR_CONFIG } from "./webinar-config";

interface ZoomTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface ZoomRegistrantResponse {
  id: number;
  join_url: string;
  registrant_id: string;
  start_time: string;
  topic: string;
}

/**
 * Retrieves a Server-to-Server OAuth access token from Zoom
 */
export async function getZoomAccessToken(): Promise<string | null> {
  const { zoomAccountId, zoomClientId, zoomClientSecret } = WEBINAR_CONFIG;

  if (!zoomAccountId || !zoomClientId || !zoomClientSecret) {
    return null;
  }

  const authHeader = Buffer.from(`${zoomClientId}:${zoomClientSecret}`).toString("base64");
  const tokenUrl = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${zoomAccountId}`;

  try {
    const res = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!res.ok) {
      console.error("Zoom OAuth error status:", res.status, await res.text());
      return null;
    }

    const data = (await res.json()) as ZoomTokenResponse;
    return data.access_token;
  } catch (error) {
    console.error("Failed to obtain Zoom access token:", error);
    return null;
  }
}

/**
 * Registers a lead for the Zoom Meeting or Webinar
 */
export async function registerZoomLead(params: {
  meetingId: string;
  email: string;
  fullName: string;
  phone: string;
}): Promise<{ joinUrl: string; registrantId?: string }> {
  const token = await getZoomAccessToken();

  // If credentials are not yet configured in env, produce a direct formatted join URL
  if (!token) {
    const attendeeHash = Math.random().toString(36).substring(2, 8);
    const fallbackJoinUrl = `https://zoom.us/j/${params.meetingId}?pwd=WCHAMP1M&uname=${encodeURIComponent(
      params.fullName
    )}#token=${attendeeHash}`;
    return { joinUrl: fallbackJoinUrl };
  }

  const [firstName, ...rest] = params.fullName.trim().split(" ");
  const lastName = rest.join(" ") || firstName;

  const url = `https://api.zoom.us/v2/meetings/${params.meetingId}/registrants`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: params.email,
        first_name: firstName,
        last_name: lastName,
        phone: params.phone,
        auto_approve: true,
      }),
    });

    if (!res.ok) {
      console.warn("Zoom registration API returned non-200, falling back:", await res.text());
      return {
        joinUrl: `https://zoom.us/j/${params.meetingId}?pwd=WCHAMP1M&uname=${encodeURIComponent(params.fullName)}`,
      };
    }

    const data = (await res.json()) as ZoomRegistrantResponse;
    return {
      joinUrl: data.join_url,
      registrantId: data.registrant_id,
    };
  } catch (err) {
    console.error("Error registering Zoom attendee:", err);
    return {
      joinUrl: `https://zoom.us/j/${params.meetingId}?pwd=WCHAMP1M&uname=${encodeURIComponent(params.fullName)}`,
    };
  }
}

/**
 * Updates the Zoom Meeting or Webinar start time when the master schedule changes
 */
export async function updateZoomMeetingTime(params: {
  meetingId: string;
  startTimeIso: string;
  timezone?: string;
}): Promise<boolean> {
  const token = await getZoomAccessToken();
  if (!token) return false;

  try {
    const res = await fetch(`https://api.zoom.us/v2/meetings/${params.meetingId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start_time: params.startTimeIso,
        timezone: params.timezone || WEBINAR_CONFIG.defaultTimezone,
      }),
    });

    return res.status === 204;
  } catch (err) {
    console.error("Failed to update Zoom meeting schedule:", err);
    return false;
  }
}
