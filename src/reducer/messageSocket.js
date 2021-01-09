import * as types from '../constants/actionSocket';
import axios from 'axios';

const initialState = {
    isNoti: false,
    newMess: null,
    roomNow: null,
    messages: [],
    members: [],
    users: [],
    rooms: [],
    yourRooms: []
};
const myReducer = (state = initialState, action) => {
    const upMessage = (x) => {
        axios
            .post('https://chat-group-sv.herokuapp.com/chat/upMess', x)
            .then((res) => {
                if (res.data) {
                    console.log(res.data);
                }
            })
    }
    let b;
    let c;
    const addTop = (x) => {
        console.log(x.to);
        state.yourRooms.forEach((y) => {
            if (y._id.toString() === x.to._id) {
                y.topMess = x;
            }
        })
    }
    switch (action.type) {
        case types.NEWROOM:
            return {...state, yourRooms: [action.newRoom, ...state.yourRooms]};
        case types.ROOMNOW:
            return {...state, roomNow: action.roomNow};
        case types.USERSONLINE :
            return {...state, users: action.users};
        case types.GETMEM :
            return {...state, members: action.members};
        case types.BEROOMS : 
            return {...state, rooms: action.rooms};
        case types.YOURROOMS : 
            return {...state, yourRooms: action.yourRooms};
        case types.BEMESS : {
            upMessage({from: action.from, message:action.message, to: action.to, date: action.date});
            let a;
            for (let i=0; i< state.yourRooms.length; i++) {
                if (state.yourRooms[i]._id.toString() === action.to._id) {
                    a = i
                }
            }
            if (action.to._id !== state.roomNow._id) {
                addTop({from: action.from, message:action.message, to: action.to, date: action.date})
                return {...state, isNoti: true, yourRooms: [state.yourRooms[a], ...state.yourRooms.slice(0,a), ...state.yourRooms.slice(a+1)]};
            } else {
                addTop({from: action.from, message:action.message, to: action.to, date: action.date});
                let chat=  {from: action.from, message: action.message, to:action.to, date:action.date};
                return {...state, newMess: chat, messages: [chat, ...state.messages], yourRooms: [state.yourRooms[a], ...state.yourRooms.slice(0,a), ...state.yourRooms.slice(a+1)]};
            }
        }     
        case types.APIMESS :
            return {...state, messages: action.messages};
        case types.LEAVEROOM: {
            let a = action.roomNow;
            console.log(state.yourRooms);
            let b = state.yourRooms.findIndex((x) => x._id === a._id);
            axios
                .post('https://chat-group.sv.herokuapp.com/chat/leaveRoom', {room: a, user: action.user})
                .then((res) => {
                    if (res.data) {
                        console.log(res.data);
                    }
                })
            return {...state, yourRooms: [...state.yourRooms.slice(0,b),...state.yourRooms.slice(b+1)]};
        }
        default :
            return state;
    }
}
export default myReducer;
