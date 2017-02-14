const profix = 'basefrom_formHide_' ;
const SET_FIELD_HIDE = profix+'SET_FIELD_HIDE' ;
//////////////////////action start/////////////////////////////
export function setFieldHide(fieldName,hideFlag) {
  return { type: SET_FIELD_HIDE, fieldName,hideFlag}
}
//////////////////////action end/////////////////////////////
//////////////////////reducer start/////////////////////////////
function formHide(state = {}, action) {
  switch (action.type) {
    case SET_FIELD_HIDE:
      return {...state,...{[action.fieldName]:action.hideFlag}} ;
    default:
      return state
  }
}
//////////////////////reducer end/////////////////////////////
export default formHide ;