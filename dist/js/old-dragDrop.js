/*
//组件开发 : 多组对象，像兄弟之间的关系
//构造函数（类）
//拖动
*/
var dragDown = (function(){
	
})();
function Drag() {
	this.obj = null;
	this.disX = 0;
	this.disY = 0;
	this.settings = { //默认参数
		id: '',
		toDown: function() {},
		toUp: function() {}
	};
}
Drag.prototype.init = function(options) {
	var me = this;
	extend(me.settings, options);
	me.obj = $(me.settings.id);
	me.obj.onmousedown = function(ev) {
		var oEvt = ev || window.event;
		me.fnDown(oEvt);
		me.settings.toDown();
		document.onmousemove = function(ev) {
			var oEvt = ev || window.event;
			me.fnMove(oEvt);
		};
		document.onmouseup = function() {
			me.fnUp();
			me.settings.toUp();
		};
		return false;
	};
};
Drag.prototype.fnDown = function(ev) {
	this.disX = ev.clientX - this.obj.offsetLeft;
	this.disY = ev.clientY - this.obj.offsetTop;
};
Drag.prototype.fnMove = function(ev) {
	this.obj.style.left = ev.clientX - this.disX + 'px';
	this.obj.style.top = ev.clientY - this.disY + 'px';
};
Drag.prototype.fnUp = function() {
	document.onmousemove = null;
	document.onmouseup = null;
};
/*
//拖动drag结束
*/

//通过$获取id
function $(id) {
	return document.getElementById(id);
}
//继承
function extend(obj1, obj2) {
	for(var attr in obj2) {
		obj1[attr] = obj2[attr];
	}
}