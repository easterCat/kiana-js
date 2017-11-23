/*
//组件开发 : 多组对象，像兄弟之间的关系( 代码复用的一种形式 )
//构造函数（类）
//第一个插件，拖动
*/
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
/*
 * version:0.0.0
 * author:eaterCat
 * this is a plugin about select
 * */

function multiSelect() {
	this.settings = {
		toolbox: false,
		callback: function() {}
	};
}

multiSelect.prototype = {
	init: function(oparent, options) {
		var me = this;
		extend(me.settings, options);
		me.selectLi = $("selLeftCon").getElementsByClassName('select-li');
		me.alSelectLi = $(oparent).getElementsByClassName("select-li");
		me.addBtn = $("addAnBtn");
		me.delBtn = $("delAnBtn");
		me.addAllBtn = $("addAllBtn");
		me.delAllBtn = $("delAllBtn");
		me.selLeftCon = $("selLeftCon").getElementsByClassName("select-left-ul")[0];
		me.selRightCon = $("selRightCon").getElementsByClassName("select-right-ul")[0];
		me.initClickEvent(); //初始化单击事件
		me.initBtnEvent(); //初始化按钮事件
		me.settings.callback();
	},
	//选项点击事件
	initClickEvent: function() {
		var me = this;
		var selectLi = me.selectLi;
		me.clickEvent();
		me.dblClickEvent();
	},
	//单击事件
	clickEvent: function(i) {
		var me = this;
		var selectUl = me.selLeftCon;
		var selectLi = me.selectLi;
		//console.log(selectLi);
		for(var i = 0; i < selectLi.length; i++) {
			//console.log(i);
			selectLi[i].index = i;
			selectLi[i].onclick = loop();
		}

		function loop() {
			var _this = this;
			for(var j = 0; j < selectLi.length; j++) {
				removeClass(selectLi[j], 'select-active');
			}
			addClass(selectLi[_this.index], 'select-active');
		}
		selectUl.addEventListener('click', function() {
			for(var i = 0; i < selectLi.length; i++) {
				console.log(i);
				selectLi[i].index = i;
				selectLi[i].onclick = loop();
			}

			function loop() {
				var _this = this;
				for(var i = 0; i < selectLi.length; i++) {
					removeClass(selectLi[i], 'select-active');
				}
				addClass(selectLi[_this.index], 'select-active');
			}
		});
	},
	//双击事件
	dblClickEvent: function(i) {
		var me = this;
		var selectLi = me.selectLi;
		for(var i = 0; i < selectLi.length; i++) {
			selectLi[i].index = i;
			selectLi[i].ondblclick = loop();
		}

		function loop() {
			var op = this.parentNode;
			var _this = this;
			if(hasClass(op, 'select-left-ul') === true) {
				var opi = me.selRightCon;
				op.removeChild(_this);
				opi.appendChild(_this);
			}
		}
	},
	//按钮点击事件
	initBtnEvent: function() {
		var me = this;
		var ad = me.addBtn,
			de = me.delBtn,
			adl = me.addAllBtn,
			del = me.delAllBtn;
		var selectLi = me.selectLi;
		var alSelectLi = me.alSelectLi;
		var selLeftCon = me.selLeftCon;
		var selRightCon = me.selRightCon;
		//添加按钮点击事件
		ad.onclick = function() {
			for(var i = 0; i < selectLi.length; i++) {
				if(hasClass(selectLi[i], "select-active")) {
					selRightCon.appendChild(selectLi[i]);
				}
			}
		};
		del.onclick = function() {
			for(var i = 0; i < selectLi.length; i++) {
				if(hasClass(selectLi[i], "select-active")) {
					selLeftCon.appendChild(selectLi[i]);
				}
			}
		};
		adl.onclick = function() {
			window.confirm("是否确认全部添加?");
			for(var i = 0; i < alSelectLi.length; i++) {
				console.log(i);
				selRightCon.appendChild(alSelectLi[i]);
			}
		};
		del.onclick = function() {
			window.confirm("是否确认全部删除?");
			for(var i = 0; i < alSelectLi.length; i++) {
				selLeftCon.appendChild(alSelectLi[i]);
			}
		};
	}
};

//继承
function extend(obj1, obj2) {
	for(var attr in obj2) {
		obj1[attr] = obj2[attr];
	}
}

function $(id) {
	return document.getElementById(id);
}

//添加某个对象下指定类名
function addClass(obj, sClass) {
	var aClass = obj.className.split('');
	if(!aClass[0]) {
		obj.className = sClass;
		return;
	}
	for(var i = 0; i < aClass.length; i++) {
		if(aClass[i] == sClass) {
			return;
		}
	}
	obj.className += ' ' + sClass;
}

//移除某个对象下指定类名
function removeClass(obj, sClass) {
	var aClass = obj.className.split(' ');
	if(!aClass[0]) return;
	for(var i = 0; i < aClass.length; i++) {
		if(aClass[i] == sClass) {
			aClass.splice(i, 1);
			obj.className = aClass.join(' ');
			return;
		}
	}
}

//判断对象是否具有某个类名
function hasClass(obj, sClass) {
	var bool = false;
	var aClass = obj.className.split(' ');
	if(!aClass[0]) {
		return bool;
	}
	for(var i = 0; i < aClass.length; i++) {
		if(aClass[i] == sClass) {
			bool = true;
			return bool;
		}
	}
}
/*
//vaesion:1.0
// author:eaterCat
//constructer(class)
//this is the second plugin，poplayer
*/

function popLayer() {
	//var this = new Object();
	this.popBtn = null;
	this.settings = {
		w: 300,
		h: 300,
		title: '',
		direction: 'center',
		mark: false,
		animation: {
			switchState: false,
			animaStyle: 'fade', //两个参数{滑动:'slide'，渐隐:'fade'}
			speed: 100,
			opacity: 100
		},
		callback: function() {}
	};
}

popLayer.prototype = {
	init: function(options) {
		var me = this;
		extend(me.settings, options);
		me.create();
		me.fnClose();
		me.settings.callback();
	},
	create: function() {
		var me = this;
		me.outLayer = document.createElement('div');
		me.outLayer.className = 'out-layer';
		me.outLayer.innerHTML = '<div class="out-head"><span class="out-title">' + me.settings.title + '</span><span class="out-close">X</span></div><div class="content"></div>';
		document.body.appendChild(me.outLayer);
		if(me.settings.animation.switchState === true) {
			me.setLocation(me.settings.direction);
			me.animationStyle(me.settings.animation.animaStyle, me.settings.animation.speed);
		} else {
			me.setLocation(me.settings.direction);
		}
	},
	//生成弹出层的js
	animationStyle: function() {
		var me = this;
		//当动画样式设置为slide的时候，执行以下
		if(me.settings.animation.animaStyle === 'slide') {
			me.outLayer.style.height = 0;
			me.animation = startMove(me.outLayer, {
				height: me.settings.h
			}, me.settings.animation.speed);
		}
		if(me.settings.animation.animaStyle === 'fade') {
			me.outLayer.style.opacity = 0;
			me.animation = startMove(me.outLayer, {
				opacity: 100
			}, me.settings.animation.speed);
		}
	},
	setLocation: function(direction) {
		var me = this;
		me.outLayer.style.width = me.settings.w + 'px';
		me.outLayer.style.height = me.settings.h + 'px';
		var half_h = viewHeight() - me.outLayer.offsetHeight;
		var scroll_h = document.body.scrollTop;
		var half_w = viewWidth() - me.outLayer.offsetWidth;
		switch(direction) {
			case 'center':
				me.outLayer.style.left = half_w / 2 + 'px';
				me.outLayer.style.top = half_h / 2 + scroll_h + 'px';
				break;
			case 'left':
				me.outLayer.style.left = 0 + 'px';
				me.outLayer.style.top = half_h / 2 + scroll_h + 'px';
				break;
			case 'right':
				me.outLayer.style.left = half_w + 'px';
				me.outLayer.style.top = half_h / 2 + scroll_h + 'px';
				break;
		}
	},
	//关闭按钮
	fnClose: function() {
		var me = this;
		var closeBtn = me.outLayer.getElementsByTagName('span')[1];
		closeBtn.onclick = function() {
			document.body.removeChild(me.outLayer);
		};
	}
};

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
//返回当前屏幕的宽度
function viewWidth() {
	return document.documentElement.clientWidth;
}
//返回当前屏幕的高度
function viewHeight() {
	return document.documentElement.clientHeight;
}

//js获取样式
function getStyle(obj, attr) {
	if(obj.currentStyle) { // IE获取不到简写的复合样式,单边写法可以获取到
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

//js原生的运动方法
function startMove(obj, json, delay, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bBtn = true;
		for(var attr in json) {
			var iCur = 0;
			if(attr == 'opacity') {
				iCur = Math.round(getStyle(obj, attr) * 100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}
			var iSpeed = (json[attr] - iCur) / 7;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur != json[attr]) {
				bBtn = false;
			}
			if(attr == 'opacity') {
				obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
				obj.style.opacity = (iCur + iSpeed) / 100;
			} else {
				obj.style[attr] = iCur + iSpeed + 'px';
			}
		}
		if(bBtn) {
			clearInterval(obj.timer);
			if(fn) {
				fn.call(obj);
			}
		}
	}, delay);
}
/*
//构造函数（类）
//第三个插件，tab页
*/
function tabMenu() {
	this.tabMenu = null;
	this.tabBtn = null;
	this.tabDiv = null;
	this.iNow = 0;
	this.setting = {
		event: 'click',
		delay: 0,
		animation: false,
		slideDelay: 50
	};
}

tabMenu.prototype.init = function(oParent, options) {
	var me = this;
	extend(me.setting, options);
	me.parent = $(oParent);

	me.tabBtn = me.parent.getElementsByClassName("tab-btn");
	me.tabDiv = me.parent.getElementsByClassName("tab-con");
	this.changeTab();
};

tabMenu.prototype.changeTab = function() {
	//console.log(this); //此处的this指向tabMenu
	var me = this;
	var tabBtn = me.tabBtn;
	var tabDiv = me.tabDiv;
	for(var i = 0; i < tabBtn.length; i++) {
		console.log(this); //此处的this指向tabMenu,输出3次
		tabBtn[i].index = i;
		// alert(me.setting.event);
		addEvent(tabBtn[i], me.setting.event, function() {
			//console.log(this); //当前的this是当前点击的btn
			//console.log(me.setting.animation);
			if(me.setting.animation === false) {
				for(var i = 0; i < tabBtn.length; i++) {
					tabDiv[i].style.display = 'none';
					tabBtn[i].className = 'tab-btn';
				}
				this.className = 'tab-btn activeBon';
				tabDiv[this.index].style.display = 'block';
			} else {
				for(var j = 0; j < tabBtn.length; j++) {
					tabDiv[j].style.display = 'none';
					tabDiv[j].style.opacity = 0;
					tabDiv[j].style.height = 0;
					tabBtn[j].className = 'tab-btn';
				}
				this.className = 'tab-btn activeBon';
				tabDiv[this.index].style.display = 'block';
				startMove(tabDiv[this.index], {
					opacity: 100,
					height: 200
				}, me.setting.slideDelay);
			}
		});
	}
};

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

//事件绑定
function addEvent(obj, events, fn) {
	if(obj.addEventListener) {
		obj.addEventListener(events, fn, false);
	} else {
		obj.attachEvent('on' + events, function() {
			//fn.call(obj); //解除绑定时匿名函数不能解绑
			fn.bind(obj); //通过es5 中的bind改变this指向 ie9以下不支持
		});
	}
}

//添加给某个对象指定类名
function addClass(obj, sClass) {
	var aClass = obj.className.split('');
	if(!aClass[0]) {
		obj.className = sClass;
		return;
	}
	for(var i = 0; i < aClass.length; i++) {
		if(aClass[i] == sClass) {
			return;
		}
	}
	obj.className += ' ' + sClass;
}

//移除某个对象下指定类名
//用法示例:对象,类名   
function removeClass(obj, sClass) {
	var aClass = obj.className.split(' ');
	if(!aClass[0]) return;
	for(var i = 0; i < aClass.length; i++) {
		if(aClass[i] == sClass) {
			aClass.splice(i, 1);
			obj.className = aClass.join(' ');
			return;
		}
	}
}

//js获取样式
function getStyle(obj, attr) {
	if(obj.currentStyle) { // IE获取不到简写的复合样式,单边写法可以获取到
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

//js原生的运动方法
function startMove(obj, json, delay, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bBtn = true;
		for(var attr in json) {
			var iCur = 0;
			if(attr == 'opacity') {
				iCur = Math.round(getStyle(obj, attr) * 100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			}
			var iSpeed = (json[attr] - iCur) / 7;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			if(iCur != json[attr]) {
				bBtn = false;
			}
			if(attr == 'opacity') {
				obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
				obj.style.opacity = (iCur + iSpeed) / 100;
			} else {
				obj.style[attr] = iCur + iSpeed + 'px';
			}
		}
		if(bBtn) {
			clearInterval(obj.timer);
			if(fn) {
				fn.call(obj);
			}
		}
	}, delay);
}