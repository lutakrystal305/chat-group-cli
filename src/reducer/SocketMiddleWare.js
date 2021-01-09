import * as types from '../constants/actionType';
import io from 'socket.io-client';
import axios from 'axios';

var socket = null;

const SocketMiddleWare = store => next => action => {
    if (action.type === types.AUTHED) {
       
        if (!socket) {
            socket = io('https://chat-group-sv.herokuapp.com',{transports: ['polling']});
            let user = JSON.parse(sessionStorage.getItem('user')) || store.getState().checkLogged.user;
            socket.emit('user-connect',{user: user});
        }
        socket.on('server-send-users-online', (data) => {
            store.dispatch({type: 'USERSONLINE', users: data});
        })
        socket.off('server-send-message').on('server-send-message', data => {
            console.log(data);
            store.dispatch({type: 'BEMESS', from: data.from, message: data.message, to: data.to, date: data.date});        })
    }
    if (socket) {
        if (action.type === 'YOURROOMS') {
            if (action.yourRooms) {
                socket.emit('client-join-rooms', action.yourRooms);
            }
        }
        if (action.type === 'client-send-message') {
            socket.emit('client-send-message', action.message)
        };
        if (action.type === 'ROOMNOW') {
            console.log(action.roomNow);
            if (action.roomNow) {
                socket.emit('client-send-room-now', action.roomNow);
            }
        }
        if (action.type === 'LEAVEROOM') {
            if (action.roomNow) {
                socket.emit('client-leave-room', action.roomNow);
            }
        }
    }
    return next(action);
}
export default SocketMiddleWare;