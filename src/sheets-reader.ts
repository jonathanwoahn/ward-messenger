import { CONFIGURATION } from './configuration';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import Preview = require('twilio/lib/rest/Preview');
import moment from 'moment';
import _ from 'lodash';
import twilio from 'twilio';

interface Spreadsheet {
  spreadsheetId: string;
  range: string;
}

interface Message {
  dateToSend: string;
  message: string;
  groups: string;
}

interface Recipient {
  person: string;
  number: number;
  groups: string;
}

const mapResultsToCollection = <T>(results: any[]): T[] => {
  const headers: string[] = results[0];
  return results.slice(1).map((row: string[]) => {
    return row.reduce(
      (prev: any, value: string, index: number) => {
        prev[headers[index]] = value;
        return prev;
      },
      {} as T);
  });
};

const readSpreadsheet = <T>(sheets: any, spreadsheet: Spreadsheet): Promise<T[]> => {
  return new Promise((resolve: Function, reject: Function) => {
    sheets.spreadsheets.values.get(spreadsheet, (err: Error, res: any) => {
      if (err) { return reject(err); }
      const collection = mapResultsToCollection<T>(res.data.values);
      return resolve(collection);
    });
  });
};

const getNextMessage = async (sheets: any): Promise<Message> => {
  const spreadsheet: Spreadsheet = {
    spreadsheetId: CONFIGURATION.spreadsheetId,
    range: 'messages!A1:C',
  };
  const messages: Message[] = await readSpreadsheet<Message>(sheets, spreadsheet);
  return _.chain(messages)
    .filter((message: Message) => moment().diff(moment(message.dateToSend)) < 0)
    .orderBy(['dateToSend'], ['asc'])
    .head()
    .value();
};

const getRecipientList = async (sheets: any, groups: string[]): Promise<any[]> => {
  const spreadsheet: Spreadsheet = {
    spreadsheetId: CONFIGURATION.spreadsheetId,
    range: 'people!A1:C',
  };
  const recipients: Recipient[] = await readSpreadsheet<Recipient>(sheets, spreadsheet);
  return _.chain(recipients)
    .map((recipient) => {
      return {
        ...recipient,
        groups: recipient.groups.split(','),
      };
    })
    .filter((recipient: Recipient) => _.intersection(recipient.groups, groups).length > 0)
    .map((recipient: Recipient) => Number(recipient.number))
    .value();
};

const sendSingleMessage = (body: string, to: string) => {
  const SID: string = CONFIGURATION.twilioSid;
  const token: string = CONFIGURATION.twilioToken;
  const from: string = CONFIGURATION.twilioFrom;

  const client = twilio(SID, token);
  const message = {
    body,
    to,
    from, // From a valid Twilio number
  };
  return client.messages.create(message)
    .then((mess) => console.log(mess.sid))
    .catch((err) => console.error(err));
};

const sendMessageToAllRecipients = (body: string, recipients: number[]): Promise<any> => {
  const promises = recipients.map((number: number) => sendSingleMessage(body, `${number}`));

  return Promise.all(promises)
    .then(res => console.log(res));
};

export const readSpreadsheetData = async (auth: OAuth2Client) => {
  const sheets = google.sheets({ version: 'v4', auth });
  const message: Message = await getNextMessage(sheets);
  const groups = message.groups.split(',');
  const recipients = await getRecipientList(sheets, groups);
  sendMessageToAllRecipients(message.message, recipients);



};
