import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import classNames from 'classnames';


const App = () => {
  const [newSocket, setNewSocket] = useState(null);
  const [name, setName] = useState('');
  const [valueName, setValueName] = useState('');
  const [isLoginErr, setIsLoginErr] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [inRoom, setInRoom] = useState(false);
  const [room, setRoom] = useState('');
  const [roomNow, setRoomNow] = useState('');
  const [rooms, setRooms] = useState([]);
  const [usersOnline, setUsersOnline] = useState([]);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  useEffect(() => {
    const socket = io('localhost:9999',{transports: ['polling']});
    socket.on('login-success', (data) => {
      setIsLogin(true);
      setName(data);
    });
    socket.on('login-fail', () => {
      setIsLoginErr(true);
    });
    socket.on('server-send-users-online', (data) => {
      setUsersOnline(data);
    })
    socket.on('server-send-room-now', (data) => {
      setRoomNow(data);
    })
    socket.on('server-send-your-rooms', (data) => {
      console.log(data);
      setRooms(data);
    })
    socket.on('server-send-chat', ( {user, message }) => {
      receiveChat(user, message)
    })
    setNewSocket(socket);
  },[])
  var listChat = [];
  const receiveChat = (user, message) => {
    listChat = [...listChat, {user, message}];
    console.log(listChat);
    setChat(listChat);
  }

 

  const handleChange = (event) => {
    setValueName(event.target.value)
  }
  const handleClick = () => {
    newSocket.emit('login', valueName);
  }
  const handleChangeRoom = (event) => {
    setRoom(event.target.value)
  }
  const handleClickRoom = () => {
    newSocket.emit('client-send-room', room);
    setInRoom(true);
  }
  const handleChange1 = (event) => {
    setMessage(event.target.value);
  }
  const handleClick1 = () => {
    newSocket.emit('client-send-chat', message);
  }
  const handleLogout = () => {
    newSocket.emit('logout');
    setIsLogin(false);
    setInRoom(false);
  }
  const changeRoom = (x) => {
    newSocket.emit('client-change-room', x)
  }
  if (isLoginErr) {
    alert('Dang nhap that bai!!!')
  }
  return(
    <div className='Chat'>
      {!isLogin ?
      (<div className='login' >
        <h5>Welcome to Amber chat!!</h5>
        <div>
          <input type='text' onChange={handleChange} placeholder='Your Nick Name!' />
          <button onClick={handleClick}>Login Chat</button>
        </div>
      </div>)
      : !inRoom ? 
        (<div className='container'>
        <div className='user'>
          <p>{name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className='users-online'>
          <h5>List users online:</h5>
          {usersOnline.map((user) => (
          <p>{user}</p>
        ))}
        </div>
        <div className='form-room'>
          <div className='name-room'>
            <h5>Rooms</h5>
          </div>
          <div className='add-room'>
            <input type='text' onChange={handleChangeRoom} placeholder='Find room(Create Room)' />
            <button onClick={handleClickRoom}>Add or Find</button>
          </div>
        </div>
      </div>) :
      (
        <div className='container container-2'>
        <div className='user'>
          <p>{name}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className='add-room'>
            <input type='text' onChange={handleChangeRoom} placeholder='Find room(Create Room)' />
            <button onClick={handleClickRoom}>Add or Find</button>
          </div>
        <div className='rooms'>
          <h5>Your rooms:</h5>
          {rooms.map(room => (
          <button onClick={() => changeRoom(room)} className={classNames('room', {'my-room-now': room === roomNow})}>{room}</button>
        ))}
        </div>
        <div className='form-chat'>
          <div className='name-room'><h5>{roomNow}</h5></div>
        <div className='list-chat'>{chat.map(x => (
          <div className={classNames('chat', {'my-chat': x.user === name})}>
            <span>-{x.user}-</span>
            <div>
              
              <p>{x.message}</p>
            </div>
          </div>
        ))}</div>
          <div className='add-chat'>
            <input type='text' onChange={handleChange1} />
            <button onClick={handleClick1}>Add</button>
          </div>
        </div>
      </div>
      )
      })
    </div>
  )
}
export default Chat;
