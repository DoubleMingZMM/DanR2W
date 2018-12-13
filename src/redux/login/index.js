import { LOGIN_SUCCESS, LOGIN_FAILED } from './action'

/*
 * Daniel
 * 初始化state
 */
const initState = {
    isLogin: false,
    user: '',
    menus: []
}

/*
 *reducers
 */
export default function reducer (state = initState, action) {
    switch(action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case LOGIN_FAILED:
            return {
                isLogin: false,
                user: '',
                menus: []
            }
        default:
            return state
    }
}
