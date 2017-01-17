import React,{Component} from 'react' ;
import ReactDOM from 'react-dom' ;

class Portal extends Component{


    _renderOverlay(){
        let overlay = !this.props.children ? null :
        React.Children.only(this.props.children) ;
        if(overlay !== null){
            this._mountOverlayTarget() ;
            //Save reference for feture access.
            this._overlayInstance = 
            ReactDOM.render(overlay,this._overlayTarget) ;
        }else{
            //Unrender if the component is null for transitions to null
            this._unrenderOverlay() ;
            this._unmountOverlayTarget() ;
        }
    }

    _unmountOverlayTarget(){
        if(this._overlayTarget){
            this.getContainerDOMNode().removeChild(this._overlayTarget) ; 
            this._overlayTarget = null ;
        }
    }

    _unrenderOlver(){
        if(this._overlayTarget){
            React.unmountComponentAtNode(this._overlayTarget) ;
            this._overlayTarget = null ;
        }
    }

    componentDidMount() {
        this._renderOverlay() ;
    }

    
    componentWillMount() {
        this._unrenderOlver() ;
        this._unmountOverlayTarget() ;
    }
    
    

    render(){
        return null ;
    }
}