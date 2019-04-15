import { authorize } from './google-authorization';
import express from 'express';
// import twilio from 'twilio';
import { readSpreadsheetData } from './sheets-reader';

const app = express();
const port = 8080; // default port to listen

authorize(readSpreadsheetData);

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// start the Express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
