import { GET_INFO_SUCCESS, GET_INFO_FAIL } from './action';

/*
 * Daniel
 * 初始化state
 */
const initState = {
  name: '张',
  age: 0
};

/*
 *reducers
 */
export default function reducer(state = initState, action) {
  switch (action.type) {
    case GET_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case GET_INFO_FAIL:
      return {
        ...state,
        name: '姓名请求错误',
        age: 999
      };
    default:
      return state;
  }
}
