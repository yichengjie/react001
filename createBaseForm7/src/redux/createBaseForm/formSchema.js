const profix = 'formSchema_' ;
const INIT_FORM_SCHEMA = 'INIT_FORM_SCHEMA' ;
//////////////////////action start/////////////////////////////
export function initFormSchema(formSchema) {
  return { type: (profix+INIT_FORM_SCHEMA), formSchema }
}
//////////////////////action end/////////////////////////////
//////////////////////reducer start/////////////////////////////
function formSchema(state = [], action) {
  switch (action.type) {
    case (profix+INIT_FORM_SCHEMA):
      return [...action.formSchema] ;
    default:
      return state
  }
}
//////////////////////reducer end/////////////////////////////
export default formSchema ;