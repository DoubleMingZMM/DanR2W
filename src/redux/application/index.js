import { LOGIN_SUCCESS, LOGIN_FAILED } from './action';

/*
 * Daniel
 * 初始化state
 */
const initState = {
  islogin: false,
  user: ''
};

/*
 *reducers
 */
export default function reducer(state = initState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case LOGIN_FAILED:
      return {
        islogin: false,
        user: ''
      };
    default:
      return state;
  }
}
