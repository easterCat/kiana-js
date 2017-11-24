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