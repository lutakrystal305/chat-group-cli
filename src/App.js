import React from 'react';
import './App.css';
import UnLogged from './components/UnLogged';
import Home from './components/Home';
import Top from './components/Top.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useSelector } from 'react-redux';

const App = () => {
  const authed = useSelector(state => state.checkLogged)
  return(
    <Router>
        <div className="App">
          <Top />

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/chat">
              <p>zz</p>
            </Route>
            <Route path="/creator">
              <p>z</p>
            </Route>
            <Route path="/">
              {authed.isAuthed ?
              <Home />
              :<UnLogged />
              }
            </Route>
          </Switch>
        </div>
    </Router>
  )
}
export default App;