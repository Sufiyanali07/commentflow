import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      instagramHandle,
      volume = "Under 5k comments/mo",
      selectedPlan = "Studio Pro",
      note = "",
    } = body;

    // Basic validation
    if (!name || !email || !instagramHandle) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, instagramHandle)" },
        { status: 400 }
      );
    }

    const submissionData = {
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      name: name.trim(),
      email: email.trim(),
      instagramHandle: instagramHandle.trim(),
      volume,
      selectedPlan,
      note: note.trim(),
      sheetId: "115Fztpy2sC_1QgK73KGBdksNtZAewDKJ6bHfD2ZTAzs",
    };

    // Forward to Google Apps Script Webhook if configured
    const webhookUrl =
      process.env.GOOGLE_SHEET_WEBHOOK_URL ||
      process.env.GOOGLE_SCRIPT_URL ||
      "";

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        });
      } catch (webhookErr) {
        console.warn("Google Sheet Webhook notification error:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry successfully recorded",
      data: submissionData,
    });
  } catch (err: any) {
    console.error("API /api/inquiry error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err?.message },
      { status: 500 }
    );
  }
}
