import React,{Component} from 'react' ;
import {isString} from '../common/common.js' ;
let splitStr = "$$_" ;

class OCInputTwo extends Component {
    handleInputChange(type,event){
        let eventValue = event.target.value ;
        let oldValue = this.props.value ;
        let arr = splitValue(oldValue) ;
        let value1 = '' ;
        let value2 = '' ;
        if(type==='1'){
           value1 = eventValue ;
           value2 = arr[1] ;
        }else if(type==='2'){
           value1 = arr[0] ;
           value2 = eventValue ;
        }
        let retStr = assembleValue(value1,value2) ;
        this.props.onChange(retStr) ;
    }

    render(){
        let {value,onChange} = this.props ;
        let arr = splitValue(value) ;
        return (
            <span className="input-two">
                <input className="form-control"  type="text" 
                     value={arr[0]} onChange={this.handleInputChange.bind(this,'1')}/>
                <span className="split-line">-</span>
                <input className="form-control"  type="text" 
                    value={arr[1]} onChange={this.handleInputChange.bind(this,'2')}/> 
            </span>
        ) ;
    }
}
export default OCInputTwo ;
//a$$_b -- > ['a','b']
function splitValue(value){
    if(value!=null && isString(value)){
        value = value.trim() ;
        var arr = value.split(splitStr) ;
        if(arr.length==1){
            arr.push('') ;
            return arr;
        }
        return [arr[0],arr[1]] ;
    }else{
        return ['',''] ;
    }
}
function assembleValue(value1,value2){
    return value1+splitStr+value2 ;
}