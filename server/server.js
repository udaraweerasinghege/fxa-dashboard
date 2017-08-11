const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const CalendarAPI = require('node-google-calendar');

const CAL_CONFIG = require('./lib/calendarConfig');

const app = express();
const cal = new CalendarAPI(CAL_CONFIG);

const calendarList = CAL_CONFIG.calendarId;

(() => {
  let event = {
    'start': { 'dateTime': '2017-05-20T07:00:00+08:00' },
    'end': { 'dateTime': '2017-05-20T08:00:00+08:00' },
    'location': 'Coffeeshop',
    'summary': 'Breakfast',
    'status': 'confirmed',
    'description': '',
    'colorId': 1
  };

  cal.Events.insert(calendarList.fxatest, event)
    .then(resp => {
    console.log('inserted event:');
    console.log(resp);
    })
    .catch(err => {
    console.log('Error: insertEvent-' + err);
    });
})()

function mapEvts(evt, type) {
  return {
    id: evt.id,
    summary: evt.summary,
    location: evt.location,
    start: evt.start,
    end: evt.end,
    status: evt.status,
    type: type
  };
}

function filterFxReleas(evts) {
  const seenFxEvts = [];
  return evts.filter(evt =>  {
    if (evt.summary.startsWith('Firefox') && evt.start) {
      if (seenFxEvts.includes(evt.summary)) {
        return false;
      }
      seenFxEvts.push(evt.summary);
      return true;
    }
    return false;
  });
}

function listAllEventsInCalendar(calendarIds) {
	let params = {};
  const proms = calendarIds.map(id => cal.Events.list(id, params));
  console.log('fetching events');
	return Promise.all(proms)
		.then(events => {
      const [fxRelease, fxaEvts] = events;


      const fxRelArrayFiltered = filterFxReleas(fxRelease);
      const fxaEvtsFiltered = fxaEvts.filter(evt => evt.start && evt.start.date);

      const fxReleaseArray = fxRelArrayFiltered.map(evt => mapEvts(evt, 'FF_RELEASE'));
      const fxaEvtsArray = fxaEvtsFiltered.map(evt => mapEvts(evt, 'FXA_EVENT'));
			return fxaEvtsArray.concat(fxReleaseArray);
		}).catch(err => {
			console.log('Error: listAllEventsInCalendar -' + err);
		});
}


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/api/timeline-data', (req, res) => {
  listAllEventsInCalendar([calendarList['firefoxReleases'], calendarList['fxaEvents']])
    .then(data => {
      res.status(200).json(data);
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(1337, () => console.log('Working and ready on port 1337!'));

module.exports =  app;
