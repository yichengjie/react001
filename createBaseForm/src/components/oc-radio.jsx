import React,{Component} from 'react' ;

export default class OCRadio extends Component{
  render(){
      let {name,value,options} = this.props ;
      let radios = options.map((item,index)=>{
          let curValue = item.value ;
          let curLabel = item.name ;
          return (
              <label key={index}>
                <input type="radio" name={name}  
                    value={curValue} 
                    checked={value === curValue} 
                    onChange={this.props.onChange}/>
                {'  ' +curLabel}
                &nbsp; &nbsp; 
              </label>
          ) ;
      }) ;

      return <span>{radios}</span> ;
  }
}