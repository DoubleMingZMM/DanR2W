import { loginByPassword } from '@/api/login/';
// import { push } from 'connected-react-router'
import { Cache } from '@/utils/';
const { LocalStorage } = Cache;
const localStorage = new LocalStorage();

export const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
export const LOGIN_FAILED = 'login/LOGIN_FAILED';

// 和下面的是一样的写法
/* export function LoginByPassword(payload) {
    return async function (dispatch) {
        const response  = await loginByPassword(payload)
        if (response.code === 200) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })
        } else {
            dispatch({
                type: LOGIN_FAILED
            })
        }
    }
} */
export const LoginByPassword = (payload) => async(dispatch) => {
  const values = {
    ...payload
  };
  delete values['history'];
  const response = await loginByPassword(values);
  if (response.code === 200) {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });
    localStorage.put('isLogin', true);
    localStorage.put('menus', response.data.menus);
    payload.history.push('/dashboard');
  } else {
    localStorage.flush();
    dispatch({
      type: LOGIN_FAILED
    });
  }
};

