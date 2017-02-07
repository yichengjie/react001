import React,{Component} from 'react' ;
import {genSimulationEventByValue} from '../common/common.js' ;

class InputDate extends Component{
    constructor(props){
        super(props) ;
        this.handleInputChange = this.handleInputChange.bind(this) ;
    }
    componentDidMount() {
        //let elem = ReactDOM.findDOMNode(this.myInput) ;
        let elem = this.myInput ;
        var minDate = new Date() ;
        //配置日期控件
        var optionObj = {} ;
        optionObj.dateFormat = "yy-mm-dd" ;
        optionObj.onSelect = (dateText,picker) =>{
            this.props.onChange(dateText) ;
        };
        optionObj.minDate = minDate ;
        optionObj.showButtonPanel = true ;
        $(elem).datepicker(optionObj);
    }
    handleInputChange(event){
       var value = event.target.value ;
       this.props.onChange(value) ;
    }
    render(){
       return (
            <input type="text" 
                value={this.props.value || ''}
                className ="form-control" 
                onChange={this.handleInputChange}
                ref ={ t=>this.myInput= t}/>
       ) ;
    }
};

export default InputDate;