import * as types from '../constants/actionType';

const initialState = {
  isLogged: false
}
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGGED :
      return {isLogged: true};
    default :
      return state;
  }
}
export default myReducer;