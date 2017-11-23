/*
 //构造函数（类）
 //第三个插件，tab页
 */
(function () {
    var root = (typeof self === 'object' && self.self === self && self) ||
        (typeof global === 'object' && global.global === global && global) ||
        this || {};

    var tabMenu = function (oParent, options) {
        options = options || {};
        this.settings = {
            event: 'click',
            delay: 0,
            animation: false,
            slideDelay: 50
        };
        options = _extend(this.settings, options);
        return this.init(oParent, options);
    };

    tabMenu.prototype.init = function (oParent, options) {
        var me = this;
        me.parent = $(oParent);
        me.tabBtn = me.parent.getElementsByClassName("tab-btn");
        me.tabDiv = me.parent.getElementsByClassName("tab-con");
        this.changeTab();
        return this;
    };

    tabMenu.prototype.changeTab = function () {
        var me = this;
        var tabBtn = me.tabBtn;
        var tabDiv = me.tabDiv;
        for (var i = 0; i < tabBtn.length; i++) {
            tabBtn[i].index = i;
            addEvent(tabBtn[i], me.setting.event, function () {
                if (me.setting.animation === false) {
                    for (var i = 0; i < tabBtn.length; i++) {
                        tabDiv[i].style.display = 'none';
                        tabBtn[i].className = 'tab-btn';
                    }
                    this.className = 'tab-btn activeBon';
                    tabDiv[this.index].style.display = 'block';
                } else {
                    for (var j = 0; j < tabBtn.length; j++) {
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
    function _extend(obj1, obj2) {
        for (var attr in obj2) {
            obj1[attr] = obj2[attr];
        }

        return obj1;
    }

    //事件绑定
    function addEvent(obj, events, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(events, fn, false);
        } else {
            obj.attachEvent('on' + events, function () {
                //fn.call(obj); //解除绑定时匿名函数不能解绑
                fn.bind(obj); //通过es5 中的bind改变this指向 ie9以下不支持
            });
        }
    }

    //添加给某个对象指定类名
    function addClass(obj, sClass) {
        var aClass = obj.className.split('');
        if (!aClass[0]) {
            obj.className = sClass;
            return;
        }
        for (var i = 0; i < aClass.length; i++) {
            if (aClass[i] === sClass) {
                return;
            }
        }
        obj.className += ' ' + sClass;
    }

    //移除某个对象下指定类名
    //用法示例:对象,类名
    function removeClass(obj, sClass) {
        var aClass = obj.className.split(' ');
        if (!aClass[0]) return;
        for (var i = 0; i < aClass.length; i++) {
            if (aClass[i] === sClass) {
                aClass.splice(i, 1);
                obj.className = aClass.join(' ');
                return;
            }
        }
    }

    //js获取样式
    function getStyle(obj, attr) {
        if (obj.currentStyle) { // IE获取不到简写的复合样式,单边写法可以获取到
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }

    //js原生的运动方法
    function startMove(obj, json, delay, fn) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var bBtn = true;
            for (var attr in json) {
                var iCur = 0;
                if (attr == 'opacity') {
                    iCur = Math.round(getStyle(obj, attr) * 100);
                } else {
                    iCur = parseInt(getStyle(obj, attr));
                }
                var iSpeed = (json[attr] - iCur) / 7;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if (iCur != json[attr]) {
                    bBtn = false;
                }
                if (attr == 'opacity') {
                    obj.style.filter = 'alpha(opacity=' + (iCur + iSpeed) + ')';
                    obj.style.opacity = (iCur + iSpeed) / 100;
                } else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }
            }
            if (bBtn) {
                clearInterval(obj.timer);
                if (fn) {
                    fn.call(obj);
                }
            }
        }, delay);
    }

    if (typeof exports !== 'undefined' && !exports.nodeType) {
        if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = tabMenu;
        }
        exports.tabMenu = tabMenu;
    } else {
        root.tabMenu = tabMenu;
    }
})();