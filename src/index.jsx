import "@babel/polyfill";

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';


navigator.bluetooth.getAvailability().then(result => console.log('bluetooth?', {result}));

const App = () => {
  const findMatches = () => {
    navigator.bluetooth.requestDevice({acceptAllDevices: true }).then(
      devs => {
        console.log({devs});
      }
    );
  }

  return <div><button onClick={findMatches}>Match</button></div>
};

ReactDOM.render(<App/>, document.getElementById('app'));
