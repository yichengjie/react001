import { createStore } from 'redux' ;
import reducers from './reducers.js' ;
let store = createStore(reducers) ;
export default store ;