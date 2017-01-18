import React,{Component} from 'react';

class InputNumber extends Component{
    constructor(props){
        super(props) ;
        this.state = {
            inputValue:this.props.value || ''
        } ;
    }
    handleChange(event){
        var value = event.target.value ;
        this.setState({inputValue:value}) ;
    }
    componentWillReceiveProps(newProps,newState){
        let newValue = newProps.value ;
        console.info('newValue : ' + newValue) ;
        this.setState({inputValue:newValue}) ;
    }
    handleBlur(event){
        let value = event.target.value.trim() ;
        this.props.onChange(genEventByValue(value)) ;
    }
    render(){
         return (
            <input className='form-control' type="text" 
                value={this.state.inputValue}  
                onChange ={this.handleChange.bind(this)}
                onBlur={this.handleBlur.bind(this)}/>
        );
    }
};
/**
 * 生成一个假的event
 */
function genEventByValue(value){
    value = value +'' ;
    return {target:{value}} ;
}


export default InputNumber;