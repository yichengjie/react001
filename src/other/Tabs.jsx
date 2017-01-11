/**
 * <Tabs>
        <Pane label="Tab 1">
            <div>This is my tab 1 contents!</div>
        </Pane>
        <Pane label="Tab 2">
            <div>This is my tab 2 contents!</div>
        </Pane>
        <Pane label="Tab 3">
            <div>This is my tab 3 contents!</div>
        </Pane>
    </Tabs>
 */
import '../styles/tabs.css' ;
import React,{Component} from 'react' ;


class Pane extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        console.info(' this.props : ' ,  this.props) ;
        console.info('nextProps : ' , nextProps);
        console.info('pane -> this.props !== nextProps : ' + this.props !== nextProps) ;
        console.info('pane -> this.state !== nextState : ' + this.state !== nextState) ;
        return this.props !== nextProps || this.state !== nextState;
    }
    
    render(){
        console.info('pane render is call... ') ;
        return (
            <div>
                {this.props.children}
            </div>
        ) ;
    }
} 

class Tabs extends Component{
    constructor(props){
        super() ;
        this.state = {
            selected : props.selected || 0 
        } ;
    }
    _renderTitles(){
        function labels (child,index){
            let activeClass = (this.state.selected === index ? 'active' :'') ;
            return (
                <li key ={index}>
                    <a href="#"
                        className={activeClass}
                        onClick={this.handleClick.bind(this,index)}>
                        {child.props.label}
                    </a>
                </li>
            ) ;
        }
        return (
            <ul className="tabs__labels">
                {this.props.children.map(labels.bind(this))}
            </ul>
        ) ;
    }
    _renderContent(){
        return (
            <div className="tabs__content">
                {this._renderTitles()}
                {this.props.children[this.state.selected]}
            </div>
        ) ;
    }

    handleClick(index,event){
        event.preventDefault() ;
        this.setState({
            selected:index
        }) ;
    }
    shouldComponentUpdate(nextProps, nextState) {
  	    return this.props !== nextProps || this.state !== nextState;
    }
    render(){
        console.info('tabs render method is call...') ;
        return (
            <div className="tabs">
                {this._renderContent()}
            </div>
        ) ;
    }
}

Pane.PropTypes={
    label:React.PropTypes.string.isRequired,
    children:React.PropTypes.element.isRequired
} ;

Tabs.propTypes={
    selected:React.PropTypes.number,
    children:React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.element
    ]).isRequired
} ;

class App extends Component {
    render(){
        return (
            <Tabs selected={1}>
                 <Pane label="Tab 1">
                    <div>This is my tab 1 contents!</div>
                </Pane>
                <Pane label="Tab 2">
                    <div>This is my tab 2 contents!</div>
                </Pane>
                <Pane label="Tab 3">
                    <div>This is my tab 3 contents!</div>
                </Pane>
            </Tabs>
        ) ;
    }
}


export default App ;