import isPlainObject from 'lodash/isPlainObject'
import $$observable from 'symbol-observable'

/**
 * 这是 Redux 的私有 action 常量
 * 长得太丑了，你不要鸟就行了
 */
export var ActionTypes = {
  INIT: '@@redux/INIT'
}

/**
 * @param  {函数}  reducer 不多解释了
 * @param  {对象}  preloadedState 主要用于前后端同构时的数据同步
 * @param  {函数}  enhancer 很牛逼，可以实现中间件、时间旅行，持久化等
 * ※ Redux 仅提供 applyMiddleware 这个 Store Enhancer ※
 * @return {Store}
 */
export default function createStore(reducer, preloadedState, enhancer) {
  // 这里省略的代码，到本文的最后再讲述（用于压轴你懂的）

  var currentReducer = reducer
  var currentState = preloadedState    // 这就是整个应用的 state
  var currentListeners = []            // 用于存储订阅的回调函数，dispatch 后逐个执行
  var nextListeners = currentListeners //【悬念1：为什么需要两个 存放回调函数 的变量？】
  var isDispatching = false

  /**
   * 【悬念1·解疑】
   * 试想，dispatch 后，回调函数正在乖乖地被逐个执行（for 循环进行时）
   * 假设回调函数队列原本是这样的 [a, b, c, d]
   *
   * 现在 for 循环执行到第 3 步，亦即 a、b 已经被执行，准备执行 c
   * 但在这电光火石的瞬间，a 被取消订阅！！！
   *
   * 那么此时回调函数队列就变成了 [b, c, d]
   * 那么第 3 步就对应换成了 d！！！
   * c 被跳过了！！！这就是躺枪。。。
   * 
   * 作为一个回调函数，最大的耻辱就是得不到执行
   * 因此为了避免这个问题，本函数会在上述场景中把
   * currentListeners 复制给 nextListeners
   *
   * 这样的话，dispatch 后，在逐个执行回调函数的过程中
   * 如果有新增订阅或取消订阅，都在 nextListeners 中操作
   * 让 currentListeners 中的回调函数得以完整地执行
   *
   * 既然新增是在 nextListeners 中 push，因此毫无疑问
   * 新的回调函数不会在本次 currentListeners 的循环体中被触发
   *
   * （上述事件发生的几率虽然很低，但还是严谨点比较好）
   */
  function ensureCanMutateNextListeners() { // <-------这货就叫做【ensure 哥】吧
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }

  /**
   * 返回 state
   */
  function getState() {
    return currentState
  }

  /**
   * 负责注册回调函数的老司机
   * 
   * 这里需要注意的就是，回调函数中如果需要获取 state
   * 那每次获取都请使用 getState()，而不是开头用一个变量缓存住它
   * 因为回调函数执行期间，有可能有连续几个 dispatch 让 state 改得物是人非
   * 而且别忘了，dispatch 之后，整个 state 是被完全替换掉的
   * 你缓存的 state 指向的可能已经是老掉牙的 state 了！！！
   *
   * @param  {函数} 想要订阅的回调函数
   * @return {函数} 取消订阅的函数
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }

    var isSubscribed = true

    ensureCanMutateNextListeners() // 调用 ensure 哥保平安
    nextListeners.push(listener)   // 新增订阅在 nextListeners 中操作

    // 返回一个取消订阅的函数
    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      isSubscribed = false

      ensureCanMutateNextListeners() // 调用 ensure 哥保平安
      var index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1) // 取消订阅还是在 nextListeners 中操作
    }
  }

  /**
   * 改变应用状态 state 的不二法门：dispatch 一个 action
   * 内部的实现是：往 reducer 中传入 currentState 以及 action
   * 用其返回值替换 currentState，最后逐个触发回调函数
   *
   * 如果 dispatch 的不是一个对象类型的 action（同步的），而是 Promise / thunk（异步的）
   * 则需引入 redux-thunk 等中间件来反转控制权【悬念2：什么是反转控制权？】
   * 
   * @param & @return {对象} action
   */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
        'Have you misspelled a constant?'
      )
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      // 关键点：currentState 与 action 会流通到所有的 reducer
      // 所有 reducer 的返回值整合后，替换掉当前的 currentState
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    // 令 currentListeners 等于 nextListeners，表示正在逐个执行回调函数（这就是上面 ensure 哥的判定条件）
    var listeners = currentListeners = nextListeners

    // 逐个触发回调函数
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]()

      /* 现在逐个触发回调函数变成了：
      var listener = listeners[i]
      listener() // 该中间变量避免了 this 指向 listeners 而造成泄露的问题 */
      // 在此衷心感谢 @BuptStEve 在 issue7 中指出之前我对此处的错误解读
    }

    return action // 为了方便链式调用，dispatch 执行完毕后，返回 action（下文会提到的，稍微记住就好了）
  }

  /**
   * 替换当前 reducer 的老司机
   * 主要用于代码分离按需加载、热替换等情况
   *
   * @param {函数} nextReducer
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer         // 就是这么简单粗暴！
    dispatch({ type: ActionTypes.INIT }) // 触发生成新的 state 树
  }

  /**
   * 这是留给 可观察/响应式库 的接口（详情 https://github.com/zenparsing/es-observable）
   * 如果您了解 RxJS 等响应式编程库，那可能会用到这个接口，否则请略过
   * @return {observable}
   */
  function observable() {略}

  // 这里 dispatch 只是为了生成 应用初始状态
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}