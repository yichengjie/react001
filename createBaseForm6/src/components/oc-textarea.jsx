import React,{Component} from 'react' ;
import classNames from 'classnames';

class OCTextArea extends Component {
  constructor(props){
     super(props) ;
     this.handleChange = this.handleChange.bind(this) ;
  }
  handleChange(event){
    var value = event.target.value ;
    this.props.handleChange(value) ;
  }
  render(){
    let {name,value} = this.props ;
    let classStr = classNames('form-control', { 'error-input-border': !this.props.isValid }); // => 'foo bar'
    return (
        <textarea className= {classStr} 
            name={name} value={value} 
            onChange={this.handleChange} ></textarea>
    ) ;
  } 
}

export default OCTextArea ;