import React,{Component} from 'react' ;

function createForm (WrapperComponent){
    return class HOCComponent extends Component{
        constructor(props){
            super(props) ;
            this.state={} ;
            let self = this ;
            this.form = {
                getFieldProps(name){
                    //self.setState({[name]:''}) ; 
                    return {
                        value:'111',
                        onChange:function handleChange(event){
                           console.info('onChange is call .. ' + event.target.value) ; 
                        }
                    } ;
                }
            } ;
        }
        render(){
           //console.info('props : ' ,this.props) ;
           return <WrapperComponent form={this.form}  {...this.props}/> 
        }
    }
}

export default createForm ;

