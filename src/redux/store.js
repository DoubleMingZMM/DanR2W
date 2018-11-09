import { createStore, applyMiddleware, compose } from 'redux'

import combineReducers from './reducers'

import thunkMiddleware from 'redux-thunk'

// import promiseMiddleware from './middleware/promiseMiddleware'

// 使用redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(combineReducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
))

/*if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextCombineReducers = require('./reducers').default
        store.replaceReducer(nextCombineReducers)
    })
}*/

export default store
