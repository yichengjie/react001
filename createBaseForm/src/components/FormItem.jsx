import React,{Component} from 'react' ;
import OCDate from './oc-date.jsx' ;

function FormItem ({type,label,name,rule,form,options}){
    return (
        <div className="form-group">
            <label  className="col-sm-2 control-label">{label}</label>
            <div className="col-sm-5">
                {InputCompFactory({form,type,name,rule,options})}
            </div>
            <span className="error-tip col-sm-3">{form.getFieldError(name)}</span>
        </div>
    ) ;
}
export default FormItem ;


/**
 * 获取输入框
 */
function InputCompFactory(param){
    let {form,type,name,rule,options} = param ;
    let inputComp = null ;
    if(['text','email'].includes(type)){
        //value = {} onChange={}
       inputComp = <input type={type}  className='form-control' {...form.getFieldProps(name,{rule})}/> ;
    }else if('textarea' === type){
        inputComp = <textarea className='form-control' {...form.getFieldProps(name,{rule})} ></textarea>
    }else if('date' === type){
        inputComp = <OCDate {...form.getFieldProps(name,{rule})} />
    }else if('select' === type){
        inputComp = (
            <select className='form-control' {...form.getFieldProps(name,{rule})} >
                {options.map(function(t,index){
                    return <option value={t.value} key ={index}>{t.name}</option>
                })}
            </select>
        ) ;
    }else{
       inputComp = null ; 
    }
    return inputComp ;
}




// export default class FormItem extends Component{
//     render(){
//         let {type,label,name,options,form} = this.props ;
//         return (
//             <div>
//                 <label htmlFor="">{label}</label>
//                 <input type = {type} {...form.getFieldProps(name,options)} />
//                 <span className="error-tip">{form.getFieldError(name)}</span>
//                 <br/>
//                 <br/>
//             </div>
//         ) ;
//     }
// }