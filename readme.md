# Description
With the recent changes to how church meetings are structured, one of the things we're struggling with
is making sure all the communications get out to the right people in the ward on the right weeks.
Some weeks Sunday school groups need a message, other weeks it's the YM / YW / RS / PS, and some weeks
it's none of the above.

The goal with this project is to build a basic messenger application that we can make some simple 
distribution lists, and then it will send out pre-scheduled text messages to the list on the relevant
week, or any some predefined schedule.

I realize there are applications out there that do this, but I wanted to try to build something because
I think this will be cheaper, and I want to try something utilizing the Twilio and Google Sheets API's.

https://www.twilio.com/blog/2017/12/send-bulk-sms-twilio-node-js.html 

# Quick Start
- git clone https://github.com/jonathanwoahn/ward-messenger.git
- npm i
- edit the 'configuration.ts' file to have your relevant information. Further instructions are in that file.
-- *** Note: I store all my keys in a local .env file for security purposes. You can write them directly
-- to this file if that's easier for you, but it's less secure
- I use google spreadsheets as a database for this project. It's quick and easy. There is a template you can follow here
-- Link to spreadsheet template.
-- Make sure you don't make modifications ot the spreadsheet structure unless you know what you're doing. The app doesn't do any validation on the spreadsheet format, it just assumes it's correct