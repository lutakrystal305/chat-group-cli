import { combineReducers } from "redux";
import login from "./login";
import checkLogged from './checkLogged';
import register from './register';
import messageSocket from './messageSocket';

const myReducer = combineReducers({
    register,
    login,
    checkLogged,
    messageSocket
});

export default myReducer;
