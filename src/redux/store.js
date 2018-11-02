import { createStore, applyMiddleware } from 'redux'

import combineReducers from './reducers'

import thunkMiddleware from 'redux-thunk'

// import promiseMiddleware from './middleware/promiseMiddleware'

let store = createStore(combineReducers, applyMiddleware(thunkMiddleware))

/*if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextCombineReducers = require('./reducers').default
        store.replaceReducer(nextCombineReducers)
    })
}*/

export default store