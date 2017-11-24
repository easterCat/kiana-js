/*
 //组件开发 : 多组对象，像兄弟之间的关系
 //构造函数（类）
 //拖动
 */
var dragDrog = (function () {

    var init = function (options) {
        var self = this;
        self.obj = null;
        self.disX = 0;
        self.disY = 0;
        self.settings = { //默认参数
            id: '',
            toDown: function () {
            },
            toUp: function () {
            }
        };
        console.log(self);
        extend(self.settings, options);
        self.obj = $(self.settings.id);
        self.obj.onmousedown = function (ev) {
            var oEvt = ev || window.event;
            fnDown(self, oEvt);
            self.settings.toDown();
            document.onmousemove = function (ev) {
                var oEvt = ev || window.event;
                fnMove(self, oEvt);
            };
            document.onmouseup = function () {
                fnUp();
                self.settings.toUp();
            };
            return false;
        };
    };
    var fnDown = function (me, ev) {
        me.disX = ev.clientX - me.obj.offsetLeft;
        me.disY = ev.clientY - me.obj.offsetTop;
    };
    var fnMove = function (me, ev) {
        me.obj.style.left = ev.clientX - me.disX + 'px';
        me.obj.style.top = ev.clientY - me.disY + 'px';
    };
    var fnUp = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    };

    var $ = function (id) {
        return document.getElementById(id);
    };
    //继承
    var extend = function (obj1, obj2) {
        for (var attr in obj2) {
            obj1[attr] = obj2[attr];
        }
    };
    return {
        init: init
    };
})();