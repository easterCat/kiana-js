(function () {
    'use strict'

    //严格模式下，this指向undefined而不是window
    var root = (typeof self === 'object' && self.self === self && self) ||
        (typeof global === 'object' && global.global === global && global) ||
        this ||
        {};

    //js中函数也是一种对象，可以挂载属性和方法
    var _ = function (obj) {
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    root._ = _;

    _.reverse = function (string) {
        return string.split('').reverse().join('');
    }
})();