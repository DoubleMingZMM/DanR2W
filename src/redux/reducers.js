import { combineReducers } from 'redux';

import page1 from './page1/page1';
import page2 from './page2/page2';
import login from './login/';

export default combineReducers({
  page1,
  page2,
  login
});
