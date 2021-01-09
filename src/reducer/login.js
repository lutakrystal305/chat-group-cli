import * as types from '../constants/actionType';

const initialState = {
  isLogged: false,
  token: ''
}
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGGED :
      return {...state, isLogged: true, token: action.token};
    case types.LOGOUT :
      return {...state, isLogged: false, token: ''};
    default :
      return state;
  }
}
export default myReducer;