import compose from './compose' // 这货的作用其实就是 compose(f, g, h)(action) => f(g(h(action)))

/* 传入一坨中间件 */
export default function applyMiddleware(...middlewares) {

  /* 传入 createStore */
  return function(createStore) {

    /* 返回一个函数签名跟 createStore 一模一样的函数，亦即返回的是一个增强版的 createStore */
    return function(reducer, preloadedState, enhancer) {
      // 用原 createStore 先生成一个 store，其包含 getState / dispatch / subscribe / replaceReducer 四个 API
      var store = createStore(reducer, preloadedState, enhancer)
      var dispatch = store.dispatch // 指向原 dispatch
      var chain = [] // 存储中间件的数组
      // 提供给中间件的 API（其实都是 store 的 API）
      var middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action)
      }
      // 给中间件“装上” API，见上面 ⊙Middleware【降低逼格写法】的【锚点-1】 
      chain = middlewares.map(middleware => middleware(middlewareAPI))
      // 串联所有中间件
      dispatch = compose(...chain)(store.dispatch)
      // 例如，chain 为 [M3, M2, M1]，而 compose 是从右到左进行“包裹”的
      // 那么，M1 的 dispatch 参数为 store.dispatch（见【降低逼格写法】的【锚点-2】）
      // 往后，M2 的 dispatch 参数为 M1 的中间件处理逻辑哥（见【降低逼格写法】的【锚点-3】）
      // 同样，M3 的 dispatch 参数为 M2 的中间件处理逻辑哥
      // 最后，我们得到串联后的中间件链：M3(M2(M1(store.dispatch)))
      //（这种形式的串联类似于洋葱，可参考文末的拓展阅读：中间件的洋葱模型）
      // 在此衷心感谢 @ibufu 在 issue8 中指出之前我对此处的错误解读
      return {
        ...store, // store 的 API 中保留 getState / subsribe / replaceReducer
        dispatch  // 新 dispatch 覆盖原 dispatch，往后调用 dispatch 就会触发 chain 内的中间件链式串联执行
      }
    }
  }
}






/** 本代码块记为 code-12 **/
if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
  // 这里就是上面 code-10 的情况，只传入 reducer 和 Store Enhancer 这两个参数
  enhancer = preloadedState
  preloadedState = undefined
}

if (typeof enhancer !== 'undefined') {
  if (typeof enhancer !== 'function') {
    throw new Error('Expected the enhancer to be a function.')
  }
  // 存在 enhancer 就立即执行，返回增强版的 createStore <--------- 记为【锚点 12-1】
  return enhancer(createStore)(reducer, preloadedState)
}

if (typeof reducer !== 'function') {
  throw new Error('Expected the reducer to be a function.')
}

// 除 compose 外，createStore 竟然也在此为我们提供了书写的便利与自由度，实在是太体贴了