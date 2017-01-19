import React,{Component} from 'react' ;
import {genSimulationEventByValue} from '../common/common.js' ;


class InputDate extends Component{
    componentDidMount() {
        //let elem = ReactDOM.findDOMNode(this.myInput) ;
        let elem = this.myInput ;
        var minDate = new Date() ;
        //配置日期控件
        var optionObj = {} ;
        optionObj.dateFormat = "yy-mm-dd" ;
        optionObj.onSelect = (dateText,picker) =>{
            this._inner_handleChange(dateText) ;
        };
        optionObj.minDate = minDate ;
        optionObj.showButtonPanel = true ;
        $(elem).datepicker(optionObj);
    }
    _inner_handleChange(value){
        let simulationEvent = genSimulationEventByValue(value) ;
        this.props.onChange(simulationEvent) ;
    }
    handleInputChange(event){
       var value = event.target.value ;
       this._inner_handleChange(value) ;
    }
    render(){
       return (
            <input type="text" 
                value={this.props.value || ''}
                className ="form-control" 
                onChange={this.handleInputChange.bind(this)}
                ref ={ t=>this.myInput= t}/>
       ) ;
    }
};

export default InputDate;