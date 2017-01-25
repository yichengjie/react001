import React,{Component} from 'react'; 

function CommentList({comments}){
    return (
        <ul className="comment-box">
            {
                comments.map( (entry,i)=>{
                    return (
                        <li key={`reponse-${index}`} className="comment-item">
                            <p className="comment-item-name">{entry.name}</p>
                            <p className="comment-item-content">{entry.content}</p>
                        </li>
                    ) ;
                }) 
            }
        </ul>
    ) ;
}

class CommentListContainer extends Component{
    constructor(props){
        super(props) ;
        this.state={
            loading:true,
            error:null,
            value:null
        };
    }

    componentDidMount () {
        console.info( 'CommentListContainer componentDidMount() is called ....') ;
        this.props.promise.then(response =>response.json())
            .then(value=>this.setState({loading:false,value}))
            .catch(error=>this.setState({loading:false,error})) ;
    }

    render() {
        if(this.state.loading){
            return <span>Loading ...</span>
        }else if(this.state.error !== null){
            return <span>Error:{this.state.error.message}</span>
        }else{
            const list = this.state.value.commentList ;
            return <CommentList comments={list} />
        }
    }
}

export default CommentListContainer ;