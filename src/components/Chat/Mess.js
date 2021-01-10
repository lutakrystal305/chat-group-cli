import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Drawer2 from '../material-ui/Drawer2';
import InfiniteScroll from 'react-infinite-scroll-component';
import Avatar from 'react-avatar';
import boy from '../../img/boy.png';
import girl from '../../img/girl.png';
import close from '../../img/close.svg';
import back from '../../img/back.png';
import './Mess.css';

const Mess = () => {
    const [openM, setOpenM] = useState(false);
    const [feel, setFeel] = useState(true);
    const [valueText, setValueText] = useState('');
    const dispatch = useDispatch();
    const authed = useSelector(state => state.checkLogged);
    let user = authed.user;
    if (user = {}) {
        user = JSON.parse(sessionStorage.getItem('user'));
    }
    let avt;
    if (user && user.sex === 'male') {
        avt = boy;
    } else if (user && user.sex === 'female') {
        avt = girl;
    }
    const messageSocket = useSelector(state => state.messageSocket);
    const [items, setItems] = useState([]);
    let list=[];
    const getItems = () => {
        if (messageSocket.messages.length > 0 && feel) {
            list = messageSocket.messages.slice(0,7);
            console.log(list);
            setItems(list);
            setFeel(false);
        }
    }
    
    const [count, setCount] = useState(7);
    const fetchMoreData = () => {
        if (count && messageSocket.messages.length >0) {
            if (count < messageSocket.messages.length) {
                list = messageSocket.messages.slice(count, count +7);
                console.log(list);
                setTimeout(() => {
                    setItems([...items, ...list]);
                }, 1000);
                setCount(count+7);
            } else {

                return;
            }
        }
    }
    console.log(items);
    const getRoom = () => {
        axios
            .post('https://chat-group-sv.herokuapp.com/chat/getRoom', { user })
            .then((res) => {
                if (res.data) {
                    dispatch({type: 'YOURROOMS', yourRooms: res.data.yourRoom});
                    updateRoomNow();
                }
            })
    }
    const updateRoomNow = () => {
        if (!messageSocket.roomNow) {
            dispatch({type: 'ROOMNOW', roomNow: messageSocket.yourRooms[0]});
        } 
    }
    const upMessage = () => {
        if (messageSocket.roomNow) {
            axios
                .post('https://chat-group-sv.herokuapp.com/chat/message', { group : messageSocket.roomNow})
                .then((res) => {
                    dispatch({type: 'APIMESS', messages: res.data})
                })
        }
    }
    
    const handleChange = (event) => {
        setValueText(event.target.value);
    }
    const handleClick = () => {
        dispatch({type: 'client-send-message', message:{message: valueText, to: messageSocket.roomNow, from: user, date: Date.now()}});
        setValueText('');
    }
    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            dispatch({type: 'client-send-message', message:{message: valueText, to: messageSocket.roomNow, from: user, date: Date.now()}});
            setValueText('');
        }
    }
    const handleOpenM = () => {
        setOpenM(true);
    }
    const handleCloseM = () => {
        setOpenM(false);
    }
    
    const handleChangeRoom = (x) => {
        dispatch({type: 'ROOMNOW', roomNow: x})
    }
    
    useEffect(() => {
        getRoom();
    }, [messageSocket.roomNow]);
    useEffect(() => {
        updateRoomNow();
    }, [messageSocket.yourRooms]);
    useEffect(() => {
        upMessage();
    }, [messageSocket.roomNow]);
    useEffect(() => {
        getItems();
    },[messageSocket.messages]);
    useEffect(() => {
        setFeel(true);
    },[messageSocket.roomNow]);
    useEffect(() => {
        if (messageSocket.newMess) {
            setItems([messageSocket.newMess, ...items]);
        }
    }, [messageSocket.newMess]);
    useEffect(() => {
        document.title = 'Messenger'
    }, []);
    return(
        <div className='Mess'>
            <div className={classNames('tab-room', {'open-tab': openM} )}>
                <div className='title-tab-room'>
                    <h3>Your Rooms:</h3>
                    <img src={close} alt='close' width={30} onClick={handleCloseM} />
                    {/*search room!*/}
                </div>
                <div className='body-tab-room'>
                    {messageSocket.yourRooms && messageSocket.yourRooms.map(x => (
                        <div>
                            <Link to={`/chat/${x._id}`} >
                            <div className={classNames('each-room', {'noti': !x.topMess._id && messageSocket.roomNow && x._id !== messageSocket.roomNow._id}, {'roomNow': messageSocket.roomNow && x._id === messageSocket.roomNow._id})} onClick={() => handleChangeRoom(x)}>
                                <h5>{x.name}</h5>
                                {x.topMess ?
                                    <p><span className={classNames({'key': x.topMess.from.name === 'key'})}>{x.topMess.from.name} : </span> {x.topMess.message}</p>
                                    : ''
                                }
                            </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className={classNames('main-chat', {'open-main': !openM})}>
                <div className='title-chat'>
                    <img src={back} alt='back' className='back' onClick={handleOpenM} width={40} />
                    <h4>{messageSocket.roomNow && messageSocket.roomNow.name}</h4>
                    <Drawer2 className='drawer-mess' />
                </div>
                <div className='body-chat'>
                    <div
                        id="scrollableDiv"
                        style={{
                        position: 'relative',
                        height: '100%',
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        }}
                    >
                {/*Put the scroll bar always on the bottom*/}
                        <InfiniteScroll
                        dataLength={items.length}
                        next={fetchMoreData}
                        style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                        inverse={true} //
                        hasMore={true}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="scrollableDiv"
                        >
                        {items && items.map(x => (
                        x.from.name !== 'key' ?
                        (<div title={x.date.toString()} className={classNames('each-message', {'my-message': user.name === x.from.name})}>
                            <div >
                                <div className='user-message'>
                                    <p>{x.from.name}</p>
                                </div>
                                <div className='content-message'>
                                    {x.from.userID ?
                                    <Avatar facebookId={x.userID} size={30} />
                                    :( x.from.sex === 'male' ?
                                        <img src={boy} alt='avt' width={30}/>
                                        : <img src={girl} alt='avt' width={30} />
                                    )}
                                    <p>{x.message}</p>
                                </div>
                            </div>
                        </div>)
                        : (<div className='key-mess'>
                            <p>{x.message}</p>
                        </div>)
                    ))}
                        </InfiniteScroll>
                    </div>
                    
                    
                </div>
                <div className='field-value' >
                        <input type='text' onChange={handleChange} onKeyUp={handleKeyUp} value={valueText} />
                        <div>
                            <button onClick={handleClick}>Send</button>
                        </div>
                </div>
            </div>
        </div>
    )
}
export default Mess;
