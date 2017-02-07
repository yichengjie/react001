import React,{Component} from 'react' ;


class OCSelect extends Component{
    
  constructor(props){
     super(props) ;
     this.handleChange = this.handleChange.bind(this) ;
  }
  handleChange(event){
    var value = event.target.value ;
    this.props.handleChange(value) ;
    this.props.handleValidate(value) ;
  }

  render(){
      let {name,value,options} = this.props ;
      return (
        <select className='form-control' name ={name} 
            value ={value} onChange={this.handleChange}>
            {options.map(function(t,index){
                return <option value={t.value} key ={index}>{t.name}</option>
            })}
        </select>
      ) ;
  }

}

export default OCSelect ;