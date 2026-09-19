import { NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "fs";
import path from "path";

async function getGoogleSheetsAuth() {
  const spreadsheetId =
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID ||
    "115Fztpy2sC_1QgK73KGBdksNtZAewDKJ6bHfD2ZTAzs";
  const worksheetName =
    process.env.GOOGLE_SHEETS_WORKSHEET_NAME || "Applications";

  let auth: any = null;

  // 1. Direct JSON string in environment variable (for Vercel serverless deployment)
  if (process.env.GOOGLE_SHEETS_CREDENTIALS) {
    try {
      const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
      auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
    } catch (e) {
      console.warn("Could not parse GOOGLE_SHEETS_CREDENTIALS env:", e);
    }
  }

  // 2. Individual environment variables
  if (
    !auth &&
    process.env.GOOGLE_SHEETS_CLIENT_EMAIL &&
    process.env.GOOGLE_SHEETS_PRIVATE_KEY
  ) {
    auth = new google.auth.JWT({
      email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }

  // 3. Credentials file path on local filesystem
  if (!auth) {
    const credFileName =
      process.env.GOOGLE_SHEETS_CREDENTIALS_FILE || "google_credentials.json";
    const filePath = path.isAbsolute(credFileName)
      ? credFileName
      : path.join(/*turbopackIgnore: true*/ process.cwd(), credFileName);

    if (fs.existsSync(filePath)) {
      auth = new google.auth.GoogleAuth({
        keyFile: filePath,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      });
    }
  }

  return { auth, spreadsheetId, worksheetName };
}

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

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const rowData = [
      timestamp,
      name.trim(),
      email.trim(),
      instagramHandle.trim(),
      volume,
      selectedPlan,
      note.trim(),
    ];

    const { auth, spreadsheetId, worksheetName } = await getGoogleSheetsAuth();

    let sheetAppended = false;

    if (auth) {
      try {
        const sheets = google.sheets({ version: "v4", auth });

        // Try inserting into the target worksheet
        try {
          await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: `${worksheetName}!A:G`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [rowData],
            },
          });
          sheetAppended = true;
        } catch (rangeErr: any) {
          // Fallback to active sheet range if 'Applications' worksheet tab hasn't been named yet
          await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: "A:G",
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: [rowData],
            },
          });
          sheetAppended = true;
        }
      } catch (sheetApiErr: any) {
        console.error("Google Sheets API error:", sheetApiErr?.message || sheetApiErr);
      }
    }

    // Also support Google Apps Script Webhook fallback if configured
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || "";
    if (webhookUrl && !sheetAppended) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp,
            name,
            email,
            instagramHandle,
            volume,
            selectedPlan,
            note,
            spreadsheetId,
          }),
        });
        sheetAppended = true;
      } catch (webhookErr) {
        console.warn("Webhook forward error:", webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry successfully recorded",
      sheetAppended,
      data: {
        timestamp,
        name,
        email,
        instagramHandle,
        volume,
        selectedPlan,
        note,
      },
    });
  } catch (err: any) {
    console.error("API /api/inquiry error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err?.message },
      { status: 500 }
    );
  }
}
