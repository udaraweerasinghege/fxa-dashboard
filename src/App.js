import React, { Component } from 'react';
import './App.css';

import 'normalize.css';
import 'vis/dist/vis.css';
import vis from 'vis';

class App extends Component {
  constructor() {
    super();
    this.options = {
      orientation: 'top'
    }
  }

  initTimeline() {
    const container = document.getElementById('mytimeline');
    const groups = new vis.DataSet([
      {id: 0, content: 'OauthServer', value: 1},
      {id: 1, content: 'ProfileServer', value: 3},
      {id: 2, content: 'ContentServer', value: 2}
    ]);
    const items = new vis.DataSet([
      {id: 1, content: 'item 1', start: '2013-04-20', type: 'point', group: 0},
      {id: 2, content: 'item 2', start: '2013-04-14', type: 'point', group: 0},
      {id: 3, content: 'item 3', start: '2013-04-18', type: 'point', group: 1},
      {id: 4, content: 'item 4', start: '2013-04-16', type: 'point', group: 1},
      {id: 5, content: 'item 5', start: '2013-04-25', type: 'point', group: 2},
      {id: 6, content: 'item 6', start: '2013-04-27', type: 'point', group: 2}
    ]);
    this.timeline=new vis.Timeline(container, items, this.options);
    this.timeline.setGroups(groups);
  }

  componentDidMount() {
    return this.initTimeline();
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
