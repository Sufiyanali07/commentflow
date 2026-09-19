# Google Sheets Integration Setup

Your CommentFlow landing page inquiry form is connected to your Google Sheet:
**Sheet URL**: [https://docs.google.com/spreadsheets/d/115Fztpy2sC_1QgK73KGBdksNtZAewDKJ6bHfD2ZTAzs/edit?usp=sharing](https://docs.google.com/spreadsheets/d/115Fztpy2sC_1QgK73KGBdksNtZAewDKJ6bHfD2ZTAzs/edit?usp=sharing)
**Sheet ID**: `115Fztpy2sC_1QgK73KGBdksNtZAewDKJ6bHfD2ZTAzs`

---

## ⚡ 1-Minute Setup Instructions for Google Apps Script Webhook

1. Open your [Google Sheet](https://docs.google.com/spreadsheets/d/115Fztpy2sC_1QgK73KGBdksNtZAewDKJ6bHfD2ZTAzs/edit?usp=sharing).
2. Set the first row header columns as:
   | A | B | C | D | E | F | G |
   | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
   | **Timestamp** | **Name** | **Email** | **Instagram Handle** | **Volume** | **Selected Plan** | **Note** |

3. Click **Extensions** > **Apps Script** in the top menu.
4. Replace any existing code with this script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById("115Fztpy2sC_1QgK73KGBdksNtZAewDKJ6bHfD2ZTAzs").getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString(),
      data.name || "",
      data.email || "",
      data.instagramHandle || "",
      data.volume || "",
      data.selectedPlan || "",
      data.note || ""
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. Click **Deploy** > **New deployment**:
   - Select type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**, copy the **Web app URL**, and set it as `GOOGLE_SHEET_WEBHOOK_URL` in your Vercel Project Environment Variables.
