import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h2> Hello World </h2>
          <h5> {process.env.REACT_APP_VERSION} </h5>
      </div>
    );
  }
}

export default App;
