import { combineReducers ,createStore ,applyMiddleware } from 'redux' ;
import thunk from 'redux-thunk';
import baseForm from '../createBaseForm/index.js' ;

export  function createEditPageStore(reducerObj){
    reducerObj = reducerObj || {} ;
    let reducers = combineReducers({
        baseForm,
        ...reducerObj
    }) ;
    let store = createStore(reducers,applyMiddleware(thunk)) ;
    return store ;
}