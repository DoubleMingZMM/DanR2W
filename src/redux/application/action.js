export const LOGIN_SUCCESS = 'login/GET_INFO_SUCCESS';
export const LOGIN_FAILED = 'login/GET_INFO_FAIL';

export function loginByPassword() {
  return function(dispatch) {
    return fetch('api/v1/login')
      .then(response => {
        return response.json();
      })
      .then((json) => {
        if (json.code === 200) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: json.data
          });
        }
      }).catch(
        () => {
          dispatch({
            type: LOGIN_FAILED
          });
        }
      );
  };
}
