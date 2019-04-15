import readline from 'readline';
import { google } from 'googleapis';
import fs from 'fs';
import { OAuth2Client } from 'google-auth-library';
import { CONFIGURATION } from './configuration';

// const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// const TOKEN_PATH = 'token.json';

export interface Credentials {
  clientSecret: string;
  clientId: string;
  redirectUri: string;
}

const getNewToken = (oAuth2Client: OAuth2Client, callback: Function) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: CONFIGURATION.scopes,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code: string) => {
    rl.close();
    oAuth2Client.getToken(code, (err: Error, token: any) => {
      if (err) { return console.error('Error while trying to retrieve access token', err); }
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      const { tokenPath } = CONFIGURATION;
      fs.writeFile(tokenPath, JSON.stringify(token), (error: Error) => {
        if (error) { return console.error(error); }
        console.log('Token stored to', tokenPath);
      });
      callback(oAuth2Client);
    });
  });
};


export const authorize = (callback: Function) => {
  const { clientSecret, clientId, redirectUri, tokenPath } = CONFIGURATION;
  const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  fs.readFile(tokenPath, (err, token) => {
    if (err) { return getNewToken(oAuth2Client, callback); }
    oAuth2Client.setCredentials(JSON.parse(token as any));
    callback(oAuth2Client);
  });
};
