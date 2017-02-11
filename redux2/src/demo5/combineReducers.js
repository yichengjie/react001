function combineReducers(reducers) {
    /**
     * reducers 
     * {
     *  todos:todosReducer,
     *  filter:filterreducer
     * }
     * 
     * */
    var reducerKeys = Object.keys(reducers)
    var finalReducers = {}
    for (var i = 0; i < reducerKeys.length; i++) {
        var key = reducerKeys[i]
        // [todos,filter]
        //如果是function,则
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key]
        }
    }
    var finalReducerKeys = Object.keys(finalReducers)
    // 返回合成后的 reducer
    return function combination(state = {}, action) {
        var hasChanged = false
        var nextState = {}
        for (var i = 0; i < finalReducerKeys.length; i++) {
            var key = finalReducerKeys[i]
            var reducer = finalReducers[key]
            var previousStateForKey = state[key]                       // 获取当前子 state
            var nextStateForKey = reducer(previousStateForKey, action) // 执行各子 reducer 中获取子 nextState
            nextState[key] = nextStateForKey                           // 将子 nextState 挂载到对应的键名
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey
        }
        return hasChanged ? nextState : state
    }
}



/** 本代码块记为 code-7 **/
var initState = {
  counter: 0,
  todos: []
}

function reducer(state, action) {
  if (!state) state = initState

  switch (action.type) {
    case 'ADD_TODO':
      var nextState = _.cloneDeep(state) // 用到了 lodash 的深克隆
      nextState.todos.push(action.payload) 
      return nextState

    default:
      return state
  }
}