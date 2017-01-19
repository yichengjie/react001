import React from 'react';
//import Portal from 'react-portal';
import Portal from './PortalComp.jsx' 


export default class App extends React.Component {

  state={
    isOpen:true
  }
  handleClick = (event)=>{
    this.setState({isOpen:!this.state.isOpen}) ;
  }
  render() {
    const button = <button>Open portal with pseudo modal</button>;
    return (
      <div>
        <button type="button" onClick={this.handleClick}>test</button>
        <p>hello world</p>
        <Portal closeOnEsc closeOnOutsideClick isOpen={this.state.isOpen}>
          <PseudoModal ref ="xxxx">
            <h2>Pseudo Modal</h2>
          </PseudoModal>
        </Portal>
      </div>
      
    );
  }

}

export class PseudoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'yicj'
    } ;
  }

  render() {
    //console.info('this.props.closePortal : ' , this.props.closePortal) ;
    var ttt = this.props.children.type ;
    console.info('************************> ' , typeof ttt) ;

    return (
      <div>
        {this.props.children}
        <p><button onClick={this.props.closePortal}>Close this</button></p>
      </div>
    );
  }
}
