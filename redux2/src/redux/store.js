import { createStore } from 'redux'
import todoApp from './reducers.js'
let store = createStore(todoApp)

export default store ;