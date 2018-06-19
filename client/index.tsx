import * as React from "react"
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, browserHistory } from 'react-router'

import reducers from './reducers'
import createRoutes from './routes'

import thunkMiddleware from 'redux-thunk'

import logger from 'redux-logger'

let store = createStore(reducers,
    applyMiddleware(
        thunkMiddleware,
        logger,
    ))

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {createRoutes(store)}
        </Router>
    </Provider>
    , document.getElementById('app')
)