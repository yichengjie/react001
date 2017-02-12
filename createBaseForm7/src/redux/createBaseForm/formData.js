const profix = 'formData_' ;
const SET_FIELD_VALUE = 'SET_FIELD_VALUE' ;
//////////////////////action start/////////////////////////////
export function setFieldValue(fieldName,fieldValue) {
  return { type: (profix+SET_FIELD_VALUE), fieldName,fieldValue }
}
//////////////////////action end/////////////////////////////
//////////////////////reducer start/////////////////////////////
function formData(state = {}, action) {
  switch (action.type) {
    case (profix+SET_FIELD_VALUE):
      return {...state,...{[action.fieldName]:action.fieldValue}} ;
    default:
      return state
  }
}
//////////////////////reducer end/////////////////////////////

export default formData ;