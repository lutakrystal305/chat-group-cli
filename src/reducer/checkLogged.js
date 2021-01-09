import * as types from '../constants/actionType';

const initialState = {
  isAuthed: false,
  user: {}
}
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHED :
      sessionStorage.setItem('isAuthed', true);
      return {...state, isAuthed: true, user: action.dataUser};
    case types.UNAUTHED : 
      return {...state, isAuthed: false, user:{} };
    default :
      return state;
  }
}
export default myReducer;