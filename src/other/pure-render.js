function shallowEqual(obj1,obj2){

}
function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}
function shouldComponentUpdate(nextProps, nextState) {
  return shallowCompare(this, nextProps, nextState);
}
function pureRende(component) {
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
}
module.exports = pureRender;


class PersonOrigin  extends Component {
  render() {
    console.log("我re-render了");
    const {name,age} = this.props;

      return (
        <div>
          <span>姓名:</span>
          <span>{name}</span>
          <span> age:</span>
          <span>{age}</span>
        </div>
      )
  }
}
const Person = pureRender(PersonOrigin)