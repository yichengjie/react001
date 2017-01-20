import React,{Component} from 'react' ;


let DataSource ={
    getComments(){
        return [] ;
    },
    addChangeListener(){

    },
    removeChangeListener(){

    },
    getBlogPost(id){

    }
} ;


class Comment extends Component {

}

class CommentList extends Component {
    constructor(props){
        super(props) ;
        this.state = {
            comments:DataSource.getComments() 
        } ;
    }
    componentDidMount() {
        DataSource.addChangeListener(this.handleChange) ;
    }

    handleChange = () =>{
        this.setState({
            comments:DataSource.getComments() 
        }) ;
    }
    
    componentWillMount () {
        DataSource.removeChangeListener(this.handleChange) ;
    }

    render(){
        return (
            <div>
                {this.state.comments.map(comment=>{
                    return <Comment  comment ={comment} key={comment.id}/>
                })}
            </div>
        ) ;
    }
}


class BlogPost extends Component {
    constructor(){
        super() ;
        this.state ={
            blogPost:DataSource.getBlogPost(props.id) 
        } ;
    }
    componentDidMount(){
        DataSource.addChangeListener(this.handleChange) ;
    }
    componentWillMount(){
        DataSource.removeChangeListener(this.handleChange) ;
    }
    handleChange = () =>{
        this.setState({
            blogPost:DataSource.getBlogPost(this.props.id) 
        }) ;
    }
    render(){
        return <div>hello world</div>
    }
}

const CommentListWithSubscription = withSubscription(
    CommentList,
    function (DataSource) {
        return DataSource.getComments
    }
) ;

const BlogPostWithSubscription = withSubscription(
    BlogPost,
    function (DataSource,props){
        DataSource.getBlogPost(props.id) ;
    }
) ;

function withSubscription(WrappedComponent,selectData){
     class WithSubscription extends Component {
        constructor(props){
            super(props) ;
            this.state = {
               data:selectData(DataSource,props)
            } ;
        }
        componentDidMount(){
            DataSource.addChangeListener(this.handleChange) ;
        }
        componentWillMount(){
            DataSource.removeChangeListener(this.handleChange) ;
        }
        handleChange = ()=>{
            this.setState({
                data:selectData(DataSource,this.props) 
            }) ;
        }
        render (){
            return <WrappedComponent  data={this.state.data} {...this.props}/>
        }
    }

    WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})` ;

    function getDisplayName(WrappedComponent){
        return WrappedComponent.displayName || WrappedComponent.name || 'Component' ;
    }

    return WithSubscription ;
}

// function logProps(InputComponent){
//     InputComponent.props.componentWillReceiveProps = function(nextProps){
//         console.log('Current props : ',this.props) ;
//         console.log('Next props : ',nextProps) ;
//     }
//     return InputComponent ;
// }

function logProps(WrappedComponent){
    return class LP extends Component{
        componentWillReceiveProps (nextProps) {
            console.info('Current props : ' ,this.props) ;
            console.info('Next props : ' ,nextProps) ;
        }
        render(){
            return <WrappedComponent {...this.props}/>
        }
    }
}

function enhance(WrappedComponent){
    class Enhance extends Component {/***/}
    // Must know exactly with method(s) to copy
    Enhance.staticMetod = WrappedComponent.staticMetod ;

    hoistNotReactStatic(Enhance,WrappedComponent) ;

    return Enhance ;
}



