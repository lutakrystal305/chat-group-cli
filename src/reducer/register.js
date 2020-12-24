import * as types from '../constants/actionType';

const initialState = {
  isRegister: false
}
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER :
      return {isRegister: true};
    case types.DONEREGISTER :
      return {isRegister: false};
    default :
      return state;
  }
}
export default myReducer;