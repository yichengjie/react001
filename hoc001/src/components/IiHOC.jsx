function iiHOC(WrappedComponent){
    return class Enhancer extends WrappedComponent{
        render() {
            if(this.props.loggedIn){
                return super.render() ;
            }else{
                return null ;
            }
        }
    }
}