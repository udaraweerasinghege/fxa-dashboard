import React, { Component } from 'react';
import './App.css';

import 'normalize.css';
import 'vis/dist/vis.css';
import vis from 'vis';
import {generateEvents, generatePointEvent} from './mocks'

class App extends Component {
  constructor() {
    super();
    this.options = {
      orientation: 'top'
    }
    this.groupMapping = {
      FF_RELEASE: 6,
      FXA_EVENT: 7
    }
  }

  initTimeline(data) {
    const container = document.getElementById('mytimeline');
    const groups = new vis.DataSet([
      // {id: 0, content: 'Oauth Server', value: 1},
      // {id: 1, content: 'Profile Server', value: 2},
      // {id: 2, content: 'Content Server', value: 3},
      // {id: 3, content: 'Customs Server', value: 4},
      // {id: 4, content: 'Tokens Server', value: 5},
      {id: 5, content: 'Auth Server', value: 6},
      {id: 6, content: 'Firefox Releases', value: 7},
      {id: 7, content: 'FxA Events', value: 8}
    ]);

    let dataset = data.map(evt => {
      return {
        id: evt.id,
        content: evt.summary,
        start: evt.start.date || evt.start.dateTime,
        type: 'point',
        group: this.groupMapping[evt.type]
      };
    });

    const mockData1 = generateEvents(0);
    const mockData2 = generateEvents(1);
    const mockData3 = generateEvents(2);
    const mockData4 = generateEvents(3);
    const mockData5 = generateEvents(4);
    const mockData6 = generatePointEvent(5);

    dataset = [].concat.apply([], [dataset, mockData1, mockData2, mockData3, mockData4, mockData5, mockData6]);
    const timelineItems = new vis.DataSet(dataset);
    this.timeline=new vis.Timeline(container, timelineItems, this.options);
    this.timeline.setGroups(groups);
  }
  getTimelineData() {
    fetch('http://localhost:1337/api/timeline-data')
      .then(res => {
        return(res.json());
      })
      .then(data => {
        this.initTimeline(data);
      });;
  }

  componentDidMount() {
    return this.getTimelineData();
  }

  render() {
    return (
      <div className="container" id="root">
        <div id="mytimeline"></div>
      </div>
    );
  }
}

export default App;
