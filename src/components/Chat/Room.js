import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Avatar from 'react-avatar';
import './Room.css';
import boy from '../../img/boy.png';
import girl from '../../img/girl.png';

const Room = () => {
    const dispatch = useDispatch();
    const stateOnline = useSelector(state => state.messageSocket);
    const authed = useSelector(state => state.checkLogged);
    let user = authed.user;
    if (!user) {
        user = JSON.parse(sessionStorage.getItem('user'));
    }
    const [valueFindRoom, setValueFindRoom] = useState('');
    const [valueCreateRoom, setValueCreateRoom] = useState('');
    const [isFound, setIsFound] = useState(false);
    const [fRooms, setFRooms] = useState([]);
    const [rooms, setRooms] = useState([]);
    const handleChange1 = (event) => {
        setValueFindRoom(event.target.value);
    }
    const handleChange2 = (event) => {
        setValueCreateRoom(event.target.value);
    }
    const getRooms = () => {
        axios  
            .get('https://chat-group-sv.herokuapp.com/chat/getRooms')
            .then((res) => {
                if (res.data) {
                    setRooms(res.data);
                }
            })
    }
    const handleFind = () => {
        axios
            .post('https://chat-group-sv.herouapp.com/chat/findRoom', {nameRoom: valueFindRoom})
            .then((res) => {
                if (res.data) {
                    setIsFound(true);
                    setFRooms(res.data);
                }
            })
    }
    const handleCreate = () => {
        axios
            .post('https://chat-group-sv.herokuapp.com/chat/createRoom', {nameRoom: valueCreateRoom, user: user})
            .then((res) => {
                if (res.data) {
                    console.log(res.data);
                    dispatch({type: 'NEWROOM', newRoom: res.data});
					dispatch({type: 'ROOMNOW', roomNow: res.data});
                }
            })
    }
    const handleClick = (room) => {
			axios
				.post('https://chat-group-sv.herokuapp.com/chat/checkRoom', {_id: room._id, user: user})
				.then((res) => {
					if (res.data) {
                        console.log(res.data.room);
						dispatch({type: 'ROOMNOW', roomNow: res.data.room})
					}
				})
        }
    const handleKeyUp1 = (event) => {
        if (event.keyCode === 13) {
            axios
            .post('https://chat-group-sv.herokuapp.com/chat/findRoom', {nameRoom: valueFindRoom})
            .then((res) => {
                if (res.data) {
                    setIsFound(true);
                    setFRooms(res.data);
                }
            })
        }
    }
    const handleKeyUp2 = (event) => {
        if (event.keyCode === 13) {
            axios
            .post('https://chat-group-sv.herokuapp.com/chat/createRoom', {nameRoom: valueCreateRoom, user: user})
            .then((res) => {
                if (res.data) {
                    console.log(res.data);
                    dispatch({type: 'NEWROOM', newRoom: res.data});
					dispatch({type: 'ROOMNOW', roomNow: res.data});
                }
            })
        }
    }
    useEffect(() => {
        getRooms();
    }, []);
    useEffect(() => {
        document.title = 'Community'
    }, []);
    return(
        <div className='Room'>
            <h3 className='title-com'>Find or create Room!!!</h3>
            <div className='field-room find-room'>
                <input type='text' onChange={handleChange1} onKeyUp={handleKeyUp1} placeholder='Your room you want to find!' />
                <button onClick={handleFind}>Find</button>
            </div>
            <div className='field-room create-room'>
                <input type='text' onChange={handleChange2} placeholder='Your room you want to create!' />
                <Link to='/chat'><button onClick={handleCreate}>Create</button></Link>
            </div>
            <div className='body-room'>
                <div className='users'>
                    {stateOnline.users && stateOnline.users.map(x => (
                    <div className='in4'>
                        <div className='avt'>
                            {x.userID ?
                            <Avatar facebookId={x.userID} size={30} />
                            :(x.sex === 'male'?
                            <img src={boy} alt='avt-boy' width={30} />
                            : <img src={girl} alt= 'avt-girl' width={30} />
                            )}
                        </div>
                        <div className='userZ'><p>{x.name}</p></div>
                    </div>
                    ))}
                </div>
                <div className='room-found'>
                    {isFound ?
                        fRooms.map(z => (
                            <Link to='/chat' className='find-room-link' ><button onClick={() => handleClick(z)}>{z.name}</button></Link>
                        ))
                        : <p>Group's name you searched not Founded</p>
                    }
                </div>
                <div className='rooms'>
                    {rooms && rooms.map(y => (
                    <Link to='/chat' className='find-room-link'>
                        <div className='each-room-avail' onClick={() => handleClick(y)}>
                            <p>{y.name}</p>
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Room;