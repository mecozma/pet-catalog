import React, { Component } from "react";
import Pet from './Pet/Pet';
import "./App.css";

import Tabletop from 'tabletop';

class App extends Component {

  componentDidMount() {
    Tabletop.init({
      key: "1IS_wjEiG_nUrnoOa49wOijx2Fgg5inYHYzpZePPnfn0",
      callback: googleData => {
       console.log(googleData);
      },
      simpleSheet: true
    });
  }
  render() {
    return (
      <div className="App">
        <h1>Pet Catalog Test</h1>
        <Pet name="Rex" />
      </div>
    );
  }
}

export default App;
