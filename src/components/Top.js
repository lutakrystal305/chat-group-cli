import React from 'react';
import './Top.css';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Drawer from './material-ui/Drawer';

const Top = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authed = useSelector(state => checkLogged.state);

  const signOut = () => {
    dispatch({type: 'LOGOUT'});
    dispatch({type: 'UNAUTHED'});
    sessionStorage.clear();
    history.push('/');
    window.location.reload();
  }
  return(
    <div className='Top'>
      <div className='logo-amber'>
        <h2>Amber</h2>
      </div>
      <div className='anything'>
        <div>
          <Link to='/' className='NavItem'>Home</Link>
          <Link to='/community' className= 'NavItem'>Community</Link>
          <Link to='/chat' className= 'NavItem'>Chat Group</Link>
          <Link to='/creator' className= 'NavItem'>About Us</Link>
          {authed.isAuthed ?
            <button onClick={signOut} className='btn-out' >Log out</button>
            :  <button className='btn-out' >Log In</button>
          }
        </div>
      </div>
      <div className='user'>
        <Drawer />
      </div>
    </div>
  )
};
export default Top;