export const CONFIGURATION = {
  twilioSid: process.env.TWILIO_SID,
  twilioToken: process.env.TWILIO_TOKEN,
  twilioFrom: process.env.TWILIO_FROM,

  // GOOGLE
  /**
   * Follow the instructions here to get your 'credentials.json' file
   * https://developers.google.com/sheets/api/quickstart/nodejs
   * Pull the first three keys listed below out of that file
   */

  clientSecret: process.env.CLIENT_SECRET,
  clientId: process.env.CLIENT_ID,
  redirectUri: process.env.REDIRECT_URI,
  // Permissions you want your token to use. This project only reads from google sheets, so it's all you need
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  // Name of the local file where you want your oauth2 token stored
  tokenPath: 'token.json',

  // Spreadsheet ID of where your information is located. Make sure the spreadsheet has
  // the proper permissions enabled, otherwise you'll get an error
  spreadsheetId: '1sbubJNMh5SjI1atoCxnaPDRy1mbE30X8OB6YqdZKDLs',
};
