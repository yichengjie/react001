import React,{Component} from 'react' ;
import ReactDOM from 'react-dom';

export default class Protal extends Component{
    
    openPortal(props = this.props){
        this.setState({active:true}) ;
        this.renderPortal(props) ;
        this.props.onOpen(this.node) ;
    }

    closePortal(isUnmounted = false){
        const resetPortalState =()=>{
            if(this.node){
                React.unmountComponentAtNode(this) ;
                document.body.removeChild(this.node) ;
            }
            this.protal = null ;
            this.node = null ;
            if(isUnmounted !==true){
                this.setState({active:false}) ;
            }
        };
        if(this.state.active){
            if(this.props.beforeClose){
                this.props.beforeClose(this.node,resetPortalState) ;
            }else{
                resetPortalState() ;
            }
            this.props.onClose() ;
        }
    }
    renderPortal(props){
        if(!this.node){
            this.node = document.createElement('div') ;
            //将节点增加到Dom之前，执行css防止无效的重绘
            this.applyClassNameAndStyle(props) ;
            document.body.appendChild(this.node) ;
        }else{
            //当新的props传下来的时候，更新css
            this.applyClassNameAndStyle(props) ;
        }
        let children = props.children ;
        if(typeof props.children.type === 'function'){
            children = React.cloneElement(props.children,{closePortal:this.closePortal}) ;
        }
        this.protal = React.unstable_renderSubstreeIntoContainer(
            this,children,this.node,this.props
        ) ;
    }
    render(){
        if(this.props.openByClickOn){
            return React.cloneElement(this.props.openByClickOn,{onClick:this.handleWrapperClick}) ;
        }
        return null ;
    }
}

/**
 * <Portal ref ="myPortal">
 *   <Modal title ="My Modal">
 *      Modal Content
 *   </Modal>
 * </Portal>
 */

