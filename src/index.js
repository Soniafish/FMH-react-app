import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './index.css';
// import './style.css';

// import App from './App';
import Header from "./header.js";
import Pdlist from "./pdlist.js";
import Pdcnt from "./pdcnt.js";
import Wishlist from "./wishlist.js";

import reportWebVitals from './reportWebVitals';

const App = ()=> {

  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    let userData = localStorage.getItem('user');
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);
    if (userData === null) { //未登入
      // console.log("header未登入");
    } else if (JSON.parse(userData).limitstamp < timestamp) {
      // console.log("header登入超過時間");
    } else {
      setLogin(true);
    }

  }, []);
  
  return <Router>
    <Header isLogin={isLogin} setLogin={setLogin}/>
    <Switch>
      <Route exact path="/">
        <Pdlist/>
      </Route>
      <Route path="/pdcnt/:id">
        <Pdcnt isLogin={isLogin}/>
      </Route>
      <Route exact path="/wishlist">
        <Wishlist isLogin={isLogin}/>
      </Route>
    </Switch>
  </Router>;
  
}
ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();
