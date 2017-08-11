const fs = require('fs');
const path = require('path');

const keyPath = path.resolve(__dirname, 'service_account.json');
const json = fs.readFileSync(keyPath, 'utf8');

const KEY = JSON.parse(json).private_key;;
const SERVICE_ACCT_ID = 'fxa-dashboard@fxa-dashboard.iam.gserviceaccount.com';
// const CALENDAR_URL = '<your calendar url>';
const CALENDAR_ID = {
  'firefoxReleases': 'mozilla.com_2d37383433353432352d3939@resource.calendar.google.com',
  'fxaEvents': 'mozilla.com_urbkla6jvphpk1t8adi5c12kic@group.calendar.google.com',
  'fxatest': 'mozilla.com_8gsb68tchj77h7g2rlnihoa3fs@group.calendar.google.com'
};
const TIMEZONE = 'UTC-04:00';

module.exports.serviceAcctId = SERVICE_ACCT_ID;
module.exports.calendarId = CALENDAR_ID;
module.exports.key = KEY;
module.exports.timezone = TIMEZONE;
