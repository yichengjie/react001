import {SET_TODO_VALUE} from '../action-type.js' ;
export default function todo(state = '', action) {
  switch (action.type) {
    case SET_TODO_VALUE:
      return action.value ;
    default:
      return state
  }
}