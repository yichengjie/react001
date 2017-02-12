import { combineReducers } from 'redux' ;
import formData from './createBaseForm/formData.js' ;
import formSchema from './createBaseForm/formSchema.js' ;
import formError from './createBaseForm/formError.js' ;
import formHide from './createBaseForm/formHide.js' ; 

export default combineReducers({
  formData,
  formSchema,
  formError,
  formHide
})