import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './Drawer.css';
import boy from '../../img/boy.png';
import girl from '../../img/girl.png';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const authed = useSelector(state => state.checkLogged);
  let user = authed.user;
  if (!user) {
    user = JSON.parse(sessionStorage.getItem('user'));
  }

  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const signOut = () => {
    dispatch({type: 'LOGOUT'});
    dispatch({type: 'UNAUTHED'});
    sessionStorage.clear();
    history.push('/');
    window.location.reload();
  };
  let avt;
  if (user && user.sex === 'male') {
      avt = boy;
  } else if (user && user.sex === 'female') {
      avt = girl;
  }



  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ right: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List >
        {authed.isAuthed ? 
        (<Link to='#' className='Link-user'>
          <ListItem button key='z1'>
              <div>
                <img src={avt} alt='avt' className='avt-user' width={40} />
                <h6 className='user-name'>{user.name}</h6>
              </div>
          </ListItem>
        </Link>)
        : (<ListItem><div className='avt-user avt-none-user'></div></ListItem>)
        }
      </List>
      <Divider />
      <List >
          {authed.isAuthed?
            (
            <Link to='/creator' className='Link-nav'>
              <ListItem button key='z2' className='Link-item'>
                About Us
              </ListItem>
            </Link>)
            : ''
          }
          <Link to="/" className='Linkz'>
            <ListItem button key='z3' className='Link-item Link-Mobile'>
              Home
            </ListItem>
          </Link>
          <Link to="/community" className='Linkz'>
            <ListItem button key='z3' className='Link-item Link-Mobile'>
              Community
            </ListItem>
          </Link>
          <Link to="/chat" className='Linkz'>
            <ListItem button key='z3' className='Link-item Link-Mobile'>
              Chat
            </ListItem>
          </Link>
          
          <ListItem button key='z3' className='Link-item'>
            {authed.isAuthed?
              <button onClick={signOut}><b>Log out...</b></button>
            : <Link to="/" className='Linkz'><b> Login </b></Link>
            }
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key='right'>
          {authed.isAuthed?
            (<img src={avt} alt='avt' className='avt-user' width={40} 
              
              onClick={toggleDrawer('right', true)}
            />)
          :
            (<div className='avt-user avt-none-user' 
              
              onClick={toggleDrawer('right', true)}
            ></div>)
          }
          <Drawer anchor='right' open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
