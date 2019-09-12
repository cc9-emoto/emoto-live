import React from 'react';
import Cookies from 'js-cookie'

import "./styles/Reset.scss"
import "./styles/App.scss"
import Login from './components/Login'
import Dashboard from './components/Dashboard'

const App = () => {
  if (Cookies.get('emoto-access')) {
    return <Dashboard />
  } else {
    return <Login />
  }
}

export default App;
