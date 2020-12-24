import * as types from '../constants/actionType';

const initialState = {
  isAuthed: false,
  user: {}
}
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGGED :
      return {...state, isAuthed: true, user: action.dataUser};
    default :
      return state;
  }
}
export default myReducer;