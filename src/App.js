import React from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./styles/Reset.scss";
import "./styles/App.scss";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Callback from './components/Callback'

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/callback" component={Callback} />
    </Router>
  )
  // if (Cookies.get('emoto-access')) {
  //   return <Dashboard />
  // } else {
  // return <Login />;
  // }
};

export default App;
