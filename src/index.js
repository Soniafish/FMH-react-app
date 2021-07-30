import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './index.css';
// import './style.css';

// import App from './App';
import Header from "./header.js";
import Pdlist from "./pdlist.js";
import Pdcnt from "./pdcnt.js";

import reportWebVitals from './reportWebVitals';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Pdlist} />
        <Route path="/pdcnt/:id" component={Pdcnt} />
      </Switch>
    </Router>;
  }
}
ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
