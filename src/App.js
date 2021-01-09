import React, { useEffect } from 'react';
import './App.css';
import UnLogged from './components/UnLogged';
import Home from './components/Home';
import Top from './components/Top.js';
import Room from './components/Chat/Room';
import Mess from './components/Chat/Mess';
import Author from './components/creator';
import PrivateRoute from './components/PrivateRoute';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const tokenS = sessionStorage.getItem('token');
  const authed = useSelector(state => state.checkLogged);
  const loginZ = useSelector(state => state.login);
  let token;
  if (loginZ.token.length >0) {
    token = loginZ.token;
  } else {
    token = tokenS;
  }
  const checkAuth = (token) => {
    axios
      .post('https://chat-group-sv.herokuapp.com/user/check', { token })
      .then((res) => {
        if (res.data) {
          dispatch({type: 'AUTHED', dataUser: res.data});
          sessionStorage.setItem('user', JSON.stringify(res.data));
        }
      })
  }
  useEffect(() => {
    checkAuth(token);
  },[authed.isAuthed, token])
  return(
    <Router>
        <div className="App">
          <Top />

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <PrivateRoute path="/community">
              <Room />
            </PrivateRoute>
            <PrivateRoute path="/chat">
                <Mess />
              </PrivateRoute>
            <PrivateRoute path="/creator">
              <Author />
            </PrivateRoute>
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