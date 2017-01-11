//es6
const Pane = (props) => <div>{props.children}</div>
//es5
var Pane2 = function (props){
    return <div>{props.children}</div>
}
Pane.propTypes = {
    label:React.propTypes.string.isRequired,
    children:React.propTypes.element.isRequired
} ;






