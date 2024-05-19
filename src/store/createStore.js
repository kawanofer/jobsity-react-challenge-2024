import { applyMiddleware, compose, createStore } from 'redux'

export default (reducers, middlewares) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  return createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares))
  )
}
