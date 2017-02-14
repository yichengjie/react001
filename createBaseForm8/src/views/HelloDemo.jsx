import React,{Component} from 'react' ;

class HelloComp extends Component {

    constructor(props){
        super(props) ;
        this.state = {
            formData:{
                username:'',
                addr:'',
                email:''
            }
        } ;
    }


    handleChangeFactory(fieldName){
        return (event) => {
            let value = event.target.value ;
            let formData = Object.assign({},this.state.formData,{[fieldName]:value}) ;
            this.setState({formData}) ;
        }
    }

    
    getFieldProp(fieldName){
        return {
            value:this.state.formData[fieldName],
            onChange:this.handleChangeFactory(fieldName)
        } 
    }

    handleSubmit(event){
        console.info(`formData : ${JSON.stringify(this.state.formData,null,2)}`) ;
    }

    handleTest1(event){
        //下面这三个只有最后一条被提交
        this.setFieldValue('username','yicj') ;
        this.setFieldValue('addr','henan') ;
        this.setFieldValue('email','666@qq.com') ;
    }

     handleTest2(event){
        //下面这三个只有最后一条被提交
        this.setFieldValue2('username','yicj') ;
        this.setFieldValue2('addr','henan') ;
        this.setFieldValue2('email','666@qq.com') ;

        this.setFieldValue2('username','yicj222222222222') ;
    }

    setFieldValue(fieldName,value){
        let formData = Object.assign({},this.state.formData,{[fieldName]:value}) ;
        this.setState({formData});
    }

    setFieldValue2(fieldName,value){
        this.setState(function(state){
            let formData = Object.assign({},state.formData,{[fieldName]:value}) ;
            state.formData = formData ;
            //state.formData[fieldName] = value ;
            return state ;
        }) ;
    }



    render() {
        return (
            <div>
                <input type="text" {...this.getFieldProp('username')}/><br/>
                <input type="text" {...this.getFieldProp('addr')}/><br/>
                <input type="text" {...this.getFieldProp('email')}/><br/>
                <button type="button" onClick={()=>this.handleSubmit()}>提交表单</button><br/>
                <button type="button" onClick={()=>this.handleTest1()}>测试1</button><br/>
                <button type="button" onClick={()=>this.handleTest2()}>测试2</button><br/>
            </div>
        );
    }


}

export default HelloComp ;