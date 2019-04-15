"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_authorization_1 = require("./google-authorization");
const express_1 = __importDefault(require("express"));
// import twilio from 'twilio';
const sheets_reader_1 = require("./sheets-reader");
const app = express_1.default();
const port = 8080; // default port to listen
google_authorization_1.authorize(sheets_reader_1.readSpreadsheetData);
// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello world!');
});
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map