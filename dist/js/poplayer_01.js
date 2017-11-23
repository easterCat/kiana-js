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