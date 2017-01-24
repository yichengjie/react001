import React,{Component} from 'react'; 
import CommentListContainer from './comment-list.jsx' ;
import CommentForm from './comment-form.jsx' ;

class CommentBox extends Component{
    constructor(props){
        super(props) ;
        this.state={
            comments:fetch('/api/response.json')
        }
    }
    handleSubmitComment(value){
        fetch('/api/submit.json',{
            method:'POST',
            body:`value=${value}`
        })
        .then(response=>response.json())
        .then(value=>{
            if(value.ok){
                this.setState({comments:fetch('/api/response.json')}) ;
            }
        })
    }
    render(){
        return (
            <div>
                <CommentListContainer comments={this.state.comments} />
                <CommentForm onSubmitComment = {this.handleSubmitComment} />
            </div>
        ) ;
    }
}