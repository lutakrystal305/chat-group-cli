import { combineReducers } from "redux";
import login from "./login";
import checkLogged from './checkLogged';
import register from './register';

const myReducer = combineReducers({
    register,
    login,
    checkLogged
});

export default myReducer;
