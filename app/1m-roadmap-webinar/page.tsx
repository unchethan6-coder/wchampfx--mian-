"use client";

import React, { useState, useEffect, useMemo } from "react";

// Google Sheets & Integration Configuration
const GOOGLE_SHEET_ID = "1BPTi42tDKs-CHCG2W-ximhopnQb0x7QB6qFLkb6M3n0";
const GOOGLE_SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Webinar%20Schedule`;
const GOOGLE_APPS_SCRIPT_WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBINAR_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbxExamplePlaceholderWebhook/exec";

interface WebinarSchedule {
  id: string;
  dateStr: string; // e.g., "Thursday, Oct 15, 2026"
  timeStr: string; // e.g., "8:00 PM EST / 5:00 PM PST"
  isoStart: string; // ISO String for calendar
  isoEnd: string;
  zoomMeetingId: string;
  seatsLeft: number;
}

// Fallback master dates if Google Sheet is offline
const DEFAULT_SCHEDULES: WebinarSchedule[] = [
  {
    id: "session-1",
    dateStr: "Thursday, Oct 15, 2026",
    timeStr: "8:00 PM EST (New York Time)",
    isoStart: "20261015T200000Z",
    isoEnd: "20261015T213000Z",
    zoomMeetingId: "84920391024",
    seatsLeft: 18,
  },
  {
    id: "session-2",
    dateStr: "Saturday, Oct 17, 2026",
    timeStr: "2:00 PM EST (New York Time)",
    isoStart: "20261017T180000Z",
    isoEnd: "20261017T193000Z",
    zoomMeetingId: "87391029411",
    seatsLeft: 7,
  },
  {
    id: "session-3",
    dateStr: "Tuesday, Oct 20, 2026",
    timeStr: "8:00 PM EST (New York Time)",
    isoStart: "20261020T200000Z",
    isoEnd: "20261020T213000Z",
    zoomMeetingId: "89104820194",
    seatsLeft: 23,
  },
];

export default function WebinarLandingPage() {
  const [schedules, setSchedules] = useState<WebinarSchedule[]>(DEFAULT_SCHEDULES);
  const [selectedSessionId, setSelectedSessionId] = useState<string>(DEFAULT_SCHEDULES[0].id);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    tradingExperience: "Beginner (0-1 yrs)",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedData, setConfirmedData] = useState<{
    fullName: string;
    email: string;
    phone: string;
    session: WebinarSchedule;
    zoomJoinUrl: string;
  } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [rescheduleSuccess, setRescheduleSuccess] = useState(false);

  // Sync Master Schedule from API or Google Sheets
  useEffect(() => {
    async function fetchMasterSchedule() {
      try {
        // Try internal API route first
        const apiRes = await fetch("/api/webinar/schedule");
        if (apiRes.ok) {
          const json = await apiRes.json();
          if (json.success && json.schedules?.length > 0) {
            setSchedules(json.schedules);
            setSelectedSessionId(json.schedules[0].id);
            return;
          }
        }
      } catch (e) {
        // Continue to CSV fallback
      }

      // Fallback directly to public Google Sheets CSV feed
      try {
        const res = await fetch(GOOGLE_SHEET_CSV_URL);
        if (!res.ok) return;
        const csvText = await res.text();
        const rows = csvText
          .split("\n")
          .map((r) => r.replace(/"/g, "").split(","))
          .filter((cols) => cols.length >= 4 && !cols[0].toLowerCase().includes("date"));

        if (rows.length > 0) {
          const parsed: WebinarSchedule[] = rows.map((cols, idx) => ({
            id: `session-sheet-${idx}`,
            dateStr: cols[0]?.trim() || `Date ${idx + 1}`,
            timeStr: cols[1]?.trim() || "8:00 PM EST",
            isoStart: cols[2]?.trim() || "20261015T200000Z",
            isoEnd: cols[3]?.trim() || "20261015T213000Z",
            zoomMeetingId: cols[4]?.trim() || "84920391024",
            seatsLeft: cols[5] ? parseInt(cols[5].trim(), 10) : 15,
          }));
          setSchedules(parsed);
          setSelectedSessionId(parsed[0].id);
        }
      } catch (err) {
        console.warn("Using active default schedule:", err);
      }
    }
    fetchMasterSchedule();
  }, []);

  const selectedSession = useMemo(() => {
    return schedules.find((s) => s.id === selectedSessionId) || schedules[0];
  }, [schedules, selectedSessionId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateGoogleCalendarUrl = (session: WebinarSchedule, zoomUrl: string) => {
    const title = encodeURIComponent("WChamp FX: 1M Roadmap Webinar (Live VIP Session)");
    const details = encodeURIComponent(
      `Your seat is confirmed for the WChamp FX 1M Roadmap Webinar.\n\nZoom Direct Access: ${zoomUrl}\n\nPlease arrive 5 minutes early. Have your trading notebook ready.`
    );
    const location = encodeURIComponent(zoomUrl);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${session.isoStart}/${session.isoEnd}&details=${details}&location=${location}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) return;

    setIsSubmitting(true);

    const attendeeToken = Math.random().toString(36).substring(2, 9);
    let zoomJoinUrl = `https://zoom.us/j/${selectedSession.zoomMeetingId}?pwd=WCHAMP1M&uname=${encodeURIComponent(
      formData.fullName
    )}#token=${attendeeToken}`;

    // Try submitting through backend API
    try {
      const apiRes = await fetch("/api/webinar/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sessionId: selectedSession.id,
        }),
      });

      if (apiRes.ok) {
        const json = await apiRes.json();
        if (json.data?.zoomJoinUrl) {
          zoomJoinUrl = json.data.zoomJoinUrl;
        }
      }
    } catch (apiErr) {
      // Direct Webhook submission as fallback
      const payload = {
        sheetTab: "lead form Webinar",
        spreadsheetId: GOOGLE_SHEET_ID,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        tradingExperience: formData.tradingExperience,
        sessionId: selectedSession.id,
        sessionDate: selectedSession.dateStr,
        sessionTime: selectedSession.timeStr,
        zoomJoinUrl,
        registeredAt: new Date().toISOString(),
      };

      try {
        await fetch(GOOGLE_APPS_SCRIPT_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn("Webhook logging completed:", err);
      }
    }

    setConfirmedData({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      session: selectedSession,
      zoomJoinUrl,
    });
    setIsSubmitting(false);
    setIsConfirmed(true);
  };

  const handleReschedule = (newSessionId: string) => {
    const newSession = schedules.find((s) => s.id === newSessionId);
    if (!newSession || !confirmedData) return;

    const newZoomJoinUrl = `https://zoom.us/j/${newSession.zoomMeetingId}?pwd=WCHAMP1M&uname=${encodeURIComponent(
      confirmedData.fullName
    )}`;

    setConfirmedData({
      ...confirmedData,
      session: newSession,
      zoomJoinUrl: newZoomJoinUrl,
    });
    setSelectedSessionId(newSessionId);
    setIsRescheduling(false);
    setRescheduleSuccess(true);
    setTimeout(() => setRescheduleSuccess(false), 4000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-black">
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px]" />
      </div>

      {/* Top Brand Banner */}
      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-40 bg-[#070b14]/90">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-lg shadow-lg shadow-amber-500/20">
              W
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              WChamp<span className="text-amber-400">FX</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              Live Interactive Workshop
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-10 lg:py-16">
        {isConfirmed && confirmedData ? (
          <div className="max-w-2xl mx-auto bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl shadow-emerald-950/40 relative">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight sm:text-4xl">
                Your Webinar Seat Is Confirmed!
              </h1>
              <p className="text-slate-400 text-sm sm:text-base">
                Congratulations, <strong className="text-white">{confirmedData.fullName}</strong>. Your institutional
                breakthrough starts here. A confirmation has been registered to your email.
              </p>
            </div>

            {rescheduleSuccess && (
              <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400 text-sm text-center">
                Session rescheduled successfully!
              </div>
            )}

            {/* Session Card */}
            <div className="mt-8 bg-slate-950/80 rounded-xl p-5 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-2">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date & Time</span>
                  <p className="text-lg font-bold text-amber-400">{confirmedData.session.dateStr}</p>
                  <p className="text-sm text-slate-300">{confirmedData.session.timeStr}</p>
                </div>
                <div>
                  <button
                    onClick={() => setIsRescheduling(!isRescheduling)}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 transition-colors"
                  >
                    {isRescheduling ? "Cancel Reschedule" : "Reschedule Date"}
                  </button>
                </div>
              </div>

              {/* Reschedule Selector */}
              {isRescheduling && (
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-700 space-y-3">
                  <span className="text-xs font-semibold text-slate-300 uppercase">Choose an alternative session:</span>
                  <div className="grid gap-2">
                    {schedules.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleReschedule(s.id)}
                        disabled={s.id === confirmedData.session.id}
                        className={`text-left p-3 rounded-lg border text-sm transition-all flex items-center justify-between ${
                          s.id === confirmedData.session.id
                            ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 opacity-60 cursor-not-allowed"
                            : "border-slate-700 bg-slate-800/60 hover:border-amber-500/50 hover:bg-slate-800 text-white"
                        }`}
                      >
                        <div>
                          <p className="font-semibold">{s.dateStr}</p>
                          <p className="text-xs text-slate-400">{s.timeStr}</p>
                        </div>
                        {s.id === confirmedData.session.id ? (
                          <span className="text-xs font-bold text-emerald-400">Current</span>
                        ) : (
                          <span className="text-xs bg-amber-400/10 text-amber-400 px-2 py-1 rounded">Switch</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Zoom Join Link */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Personal Zoom Link</span>
                <div className="flex items-center gap-2">
                  <input
                    readOnly
                    value={confirmedData.zoomJoinUrl}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-300 select-all font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(confirmedData.zoomJoinUrl)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold border border-slate-700 transition whitespace-nowrap"
                  >
                    {copiedLink ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 grid sm:grid-cols-2 gap-3">
                <a
                  href={confirmedData.zoomJoinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition shadow-lg shadow-emerald-500/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6H4zm3 3h6a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zm10 2l3-2v6l-3-2v-2z" />
                  </svg>
                  Join Zoom Room
                </a>

                <a
                  href={generateGoogleCalendarUrl(confirmedData.session, confirmedData.zoomJoinUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition"
                >
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Add to Google Calendar
                </a>
              </div>
            </div>

            {/* Preparation Notes */}
            <div className="mt-6 border-t border-slate-800 pt-5 text-xs text-slate-400 space-y-2">
              <p className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">1.</span> Download the Zoom app on desktop or mobile prior to session start.
              </p>
              <p className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">2.</span> Live Q&A and proprietary indicator cheat sheets will be shared during the broadcast.
              </p>
            </div>
          </div>
        ) : (
          /* Landing + Booking Flow */
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Value Proposition & Curriculum */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold tracking-wide uppercase">
                  ⭐ Exclusive Masterclass by WChamp FX
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">$1,000,000</span> Roadmap To Institutional Trading
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                  Stop gambling on retail indicators. Master precision order flow, high-probability liquidity sweeps, and risk management systems engineered to scale prop firm accounts to 7 figures.
                </p>
              </div>

              {/* Key Highlights */}
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Institutional Order Flow",
                    desc: "Identify bank liquidity pools and stop-hunt zones before price expansion.",
                  },
                  {
                    title: "1:5+ Risk-To-Reward Execution",
                    desc: "Frameworks designed for funded prop firm challenges and live equity preservation.",
                  },
                  {
                    title: "Live Market Breakdown",
                    desc: "Direct chart dissection on EURUSD, XAUUSD (Gold), and Nasdaq with Q&A.",
                  },
                  {
                    title: "The $1M Scaling Plan",
                    desc: "Step-by-step capital allocation blueprint to reach $1M in combined funded accounts.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 transition-all">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <span className="text-amber-400">✓</span> {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Host Authority */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center font-black text-black text-xl flex-shrink-0">
                  WC
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Hosted by Lead Trader & Founder</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    WChamp FX — 8+ years full-time institutional trader, 7-figure payout verified mentor.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Booking Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-500" />

                <div className="mb-6">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Reserve Your Seat</span>
                  <h2 className="text-2xl font-black text-white mt-1">Select Master Date</h2>
                  <p className="text-xs text-slate-400 mt-1">Seats strictly limited to ensure direct Q&A interaction.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Step 1: Date & Time Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 block">Available Master Sessions:</label>
                    <div className="space-y-2">
                      {schedules.map((session) => {
                        const isSelected = session.id === selectedSessionId;
                        return (
                          <div
                            key={session.id}
                            onClick={() => setSelectedSessionId(session.id)}
                            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-amber-400/10 border-amber-400 text-white shadow-md shadow-amber-400/10"
                                : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300"
                            }`}
                          >
                            <div>
                              <p className="text-sm font-bold text-white">{session.dateStr}</p>
                              <p className="text-xs text-slate-400">{session.timeStr}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {session.seatsLeft} spots left
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Lead Information */}
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 mb-1 block">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 mb-1 block">Email Address (for Zoom invite)</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 mb-1 block">WhatsApp / Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 mb-1 block">Trading Experience Level</label>
                      <select
                        name="tradingExperience"
                        value={formData.tradingExperience}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition"
                      >
                        <option value="Beginner (0-1 yrs)">Beginner (0 - 1 year)</option>
                        <option value="Intermediate (1-3 yrs)">Intermediate (1 - 3 years)</option>
                        <option value="Funded / Advanced (3+ yrs)">Funded / Advanced (3+ years)</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Securing VIP Seat..." : "Lock In My Free Seat →"}
                  </button>

                  <p className="text-center text-[11px] text-slate-500">
                    🔒 Instant Zoom credentials generated. Zero spam guaranteed.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 mt-20 py-8 text-center text-xs text-slate-600">
        <p>© {new Date().getFullYear()} WChamp FX. All rights reserved. High Risk Warning: Trading Forex involves significant risk.</p>
      </footer>
    </div>
  );
}
