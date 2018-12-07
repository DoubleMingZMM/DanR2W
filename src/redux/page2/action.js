export const GET_INFO_SUCCESS = 'page2/GET_INFO_SUCCESS'
export const GET_INFO_FAIL = 'page2/GET_INFO_FAIL'

export function getInfo() {
    return function (dispatch) {
        return fetch('api/v1/user/1')
            .then((response => {
                return response.json()
            }))
            .then((json) => {
                if (json.code === 200) {
                    dispatch({
                        type: GET_INFO_SUCCESS,
                        payload: json.data
                    })
                }
            }).catch(
                () => {
                    dispatch({
                        type: GET_INFO_FAIL
                    })
                }
            )
    }
}
