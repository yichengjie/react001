import React,{Component} from 'react'; 
import CommentListContainer from './comment-list.jsx' ;
import CommentForm from './comment-form.jsx' ;

export default class CommentBox extends Component{
    constructor(props){
        super(props) ;
        this.state={
            promise:fetch('/api/response.json')
        }
        this.handleSubmitComment = this.handleSubmitComment.bind(this) ;
    }
    handleSubmitComment(value){
        console.info('handleSubmitComment() is called ...') ;
        fetch('/api/submit.json',{
            method:'POST',
            body:`value=${value}`
        })
        .then(response=>response.json())
        .then(value=>{
            
            if(value.ok){
                this.setState({promise:fetch('/api/response.json')}) ;
            }
        })
    }
    render(){
        console.info('CommentBox render () is called ....')  ;
        return (
            <div>
                <CommentListContainer promise={this.state.promise} />
                <CommentForm onSubmitComment = {this.handleSubmitComment} />
            </div>
        ) ;
    }
}