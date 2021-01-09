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
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './Drawer.css';
import plus from '../../img/plus.png';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props) {
  const dispatch = useDispatch();
  const authed = useSelector(state => state.checkLogged);
  const messageSocket = useSelector(state => state.messageSocket);
  let user = authed.user;
  if (!user) {
    user = JSON.parse(sessionStorage.getItem('user'));
  }

  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const handleGetMember = () => {
        if (messageSocket.roomNow) {
            axios
                .post('http://localhost:9999/user/getMember', { roomNow : messageSocket.roomNow})
                .then((res) => {
                    dispatch({type: 'GETMEM', members: res.data.members});
                    console.log(res.data.members);
                })
        }
  }
  const handleLeaveRoom = () => {
      dispatch({type: 'LEAVEROOM', roomNow: messageSocket.roomNow, user: user})
  }



  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ right: open });
  };

  const list = (anchor) => (
    <div 
      className={clsx(classes.list,'drawer-mess', {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List >
          <ListItem button key='z1'>
              <div>
                <img alt='avt' className='avt-room' width={40} />
                <h6 className='user-name'>{messageSocket.roomNow && messageSocket.roomNow.name}</h6>
              </div>
          </ListItem>
        
      </List>
      <Divider />
      <List >
        <ListItem button key='z2' className='Link-item' onClick={handleGetMember}>
            Members
        </ListItem>
        {messageSocket.members ?
            (<ListItem button key='z3' className='Link-item Link-member' >
                {messageSocket.members.map(x => (
                    <p>{x.name}</p>
                ))}
            </ListItem>)
            : ''
        }
        <ListItem button key='z4' className='Link-item' onClick={handleLeaveRoom}>
            Leave Room
        </ListItem>
          
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key='right'>
            <img src={plus} alt='avt' className='avt-user' width={40} 
              
              onClick={toggleDrawer('right', true)}
            />
          <Drawer anchor='right' className='drawer' open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
