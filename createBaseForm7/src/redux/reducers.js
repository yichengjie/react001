import { combineReducers } from 'redux' ;
import formData from './createBaseForm/formData.js' ;
import formSchema from './createBaseForm/formSchema.js' ;

export default combineReducers({
  formData,
  formSchema,
})