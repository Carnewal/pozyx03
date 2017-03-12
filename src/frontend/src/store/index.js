import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createLogger from 'redux-logger'
import { routerReducer } from 'react-router-redux'
import reducers from 'frontend/reducers'
import createSagaMiddleware from 'redux-saga'
import websocketSaga from '../sagas/websocketSaga'

const sagaMiddleware = createSagaMiddleware()
const logger = createLogger()
const finalCreateStore = compose(
  applyMiddleware(
    logger,
    sagaMiddleware
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore)
const store = finalCreateStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  {} // Initial State
)
sagaMiddleware.run(websocketSaga)

export default store