/**
 * @功能描述:责任链模式
 * @auth:yicj
 * @data:2016-12-20
 * @email:626659321@qq.com
 */
export var nextFlagStr = 'nextSuccessor' ;
var Chain = function(fn){
	this.fn = fn ;
	this.successor = null ;
};
Chain.prototype.setNextSuccessor = function(successor){
	return this.successor = successor ;
};
//执行func
Chain.prototype.passRequest = function(){
	var ret = this.fn.apply(this,arguments) ;
	if(ret === nextFlagStr){
		return this.successor && this.successor.passRequest.apply(this.successor,arguments) ;
	}
	return ret ;
};
//异步操作时专用
//手动指定successor，因为异步操作不知道什么时候传递个下一个successor
Chain.prototype.next = function(){
	return this.successor && this.successor.passRequest.apply(this.successor,arguments) ;
};
export default Chain ;
