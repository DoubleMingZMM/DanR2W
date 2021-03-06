import { INCREMENT, DECREMENT, RESET } from './action';

/*
* Daniel
* 初始化state
*/
const initState = {
  count: 0
};

/*
*reducers
*/
export default function reducer(state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        count: state.count + 1
      };
    case DECREMENT:
      return {
        count: state.count - 1
      };
    case RESET:
      return {
        count: 0
      };
    default:
      return state;
  }
}
