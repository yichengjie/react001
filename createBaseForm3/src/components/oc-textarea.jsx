import React,{Component} from 'react' ;


class OCTextArea extends Component {
  constructor(props){
     super(props) ;
     this.handleChange = this.handleChange.bind(this) ;
  }
  handleChange(event){
    var value = event.target.value ;
    this.props.onChange(value) ;
  }
  render(){
    let {name,value} = this.props ;
    return (
        <textarea className='form-control' 
            name={name} value={value} 
            onChange={this.handleChange} ></textarea>
    ) ;
  } 
}



function OCTextArea(){
    return (
        <textarea className='form-control' name={name} value={value} onChange={onChange} ></textarea>
    ) ;
}
export default OCTextArea ;