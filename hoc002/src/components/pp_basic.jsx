import React,{Component} from 'react' ;

// Props  Proxy demonstration
function PPHOC(WrappedComponent){
    return class PP extends Component {
        render() {
            const props = Object.assign({},this.props,{
                user:{
                    name:'yicj',
                    email:'626659321@qq.com'
                }
            }) ;
            return (
                <WrappedComponent {...props}/>
            );
        }
    }
} 


class Example extends Component {
    render(){
       return (
           <div>
                <p>
                    As you can see, all original props (date), are being passed 
                    through or proxied,and also new props (user) are being added.
                </p>
                <pre>{JSON.stringify(this.props,null,2)}</pre>
           </div>
       ) ;
    }
}

const EnhancedExample = PPHOC(Example) ;


/**
 * {
    "date": "2017-01-15T07:16:29.990Z",
    "user": {
        "name": "yicj",
        "email": "626659321@qq.com"
    }
   }
 */

const App = ()=>{
    return <EnhancedExample date={(new Date).toISOString()}/> ;
}

export default App ;