import twilio from 'twilio';
import { CONFIGURATION } from './configuration';

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

export const sendMessageToAllRecipients = (body: string, recipients: number[]): Promise<any> => {
  const promises = recipients.map((number: number) => sendSingleMessage(body, `${number}`));

  return Promise.all(promises)
    .then(res => console.log(res));
};

