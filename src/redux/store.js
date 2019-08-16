/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-15 19:48:04
 * @LastEditors: Daniel
 * @LastEditTime: 2019-08-16 14:28:57
 */
import { createStore, applyMiddleware, compose } from 'redux';

import combineReducers from './reducers';

import thunkMiddleware from 'redux-thunk';
import { logger } from './middlewares';

// import promiseMiddleware from './middleware/promiseMiddleware'

// 使用redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers, composeEnhancers(
  applyMiddleware(thunkMiddleware, logger)
));

/* if (module.hot) {
    module.hot.accept('./reducers', () => {
        const nextCombineReducers = require('./reducers').default
        store.replaceReducer(nextCombineReducers)
    })
} */

export default store;
