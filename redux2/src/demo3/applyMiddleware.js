// 警告：这只是一种“单纯”的实现方式！
// 这 *并不是* Redux 的 API.

function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()
  let dispatch = store.dispatch ;
  
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  )

  return Object.assign({}, store, { dispatch })
}


// function logger(store) {
//   return function wrapDispatchToAddLogging(next) {
//     return function dispatchAndLog(action) {
//       console.log('dispatching', action)
//       let result = next(action)
//       console.log('next state', store.getState())
//       return result
//     }
//   }
// }

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}


//然后是将它们引用到 Redux store 中：

import { createStore, combineReducers, applyMiddleware } from 'redux'

// applyMiddleware 接收 createStore()
// 并返回一个包含兼容 API 的函数。
let createStoreWithMiddleware = applyMiddleware(logger, crashReporter)(createStore)

// 像使用 createStore() 一样使用它。
let todoApp = combineReducers(reducers)
let store = createStoreWithMiddleware(todoApp)