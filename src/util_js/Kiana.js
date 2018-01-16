(function () {
    'use strict';

    //严格模式下，this指向undefined而不是window
    var root = (typeof self === 'object' && self.self === self && self) ||
        (typeof global === 'object' && global.global === global && global) ||
        this ||
        {};

    //js中函数也是一种对象，可以挂载属性和方法
    var _ = function (obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    //导出
    if (typeof exports !== 'undefined' && !exports.nodeType) {
        if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    _.version = '0.0.1';

    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

    var isArrayLike = function (collection) {
        var length = collection.length;
        return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    _.each = function (obj, callback) {
        var length, i = 0;
        if (isArrayLike(obj)) {
            length = obj.length;
            for (; i < length; i++) {
                if (callback.call(obj[i], obj[i], i) === false) {
                    break;
                }
            }
        } else {
            for (i in obj) {
                if (callback.call(obj[i], obj[i], i) === false) {
                    break;
                }
            }
        }
        return obj;
    };

    /**
     * underscore 内部方法根据 this 指向（context 参数）以及 argCount 参数二次操作返回一些回调、迭代方法
     * @param func
     * @param context
     * @returns {*}
     */
    var optimizeCb = function (func, context) {
        if (context === void 0) return func;
        return function () {
            return func.apply(context, arguments);
        }
    };

    var cb = function (value, context, argCount) {
        if (value === null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
        return _.property(value);
    };

    _.iteratee = function (value, context) {
        return cb(value, context, Infinity);
    };

    _.functions = function (obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };

    _.isMatch = function (object, attrs) {
        var keys = _.keys(attrs),
            length = keys.length;
        if (object === null) return !length;
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) {
                return false;
            }
        }
    };

    _.isEqual = function (a, b) {

    };

    _.isEmpty = function (obj) {
        return !!(obj && obj.nodeType === 1);
    };

    /**
     * 判断是否为 DOM 元素
     * @param obj
     * @returns {boolean}
     */
    _.isElement = function (obj) {
        // 确保 obj 不是 null, undefined 等假值
        // 并且 obj.nodeType === 1
        return !!(obj && obj.nodeType === 1);
    };
    /**
     * 判断是否是数组对象
     * @param obj
     * @returns {boolean}
     */
    _.isArray = function (obj) {
        if (Array.isArray) return Array.isArray(obj);
        else return type(obj) === 'array';
    };


    /**
     * 判断是否为对象,这里的对象包括 function 和 object
     * @param obj
     * @returns {boolean}
     */
    _.isObject = function (obj) {
        return type(obj) === 'object';
    };

    _.isPlainObject = function (obj) {
        var proto, Ctor, newobj = {};
        // 排除掉明显不是obj的以及一些宿主对象如Window
        if (!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
            return false;
        }
        /**
         * getPrototypeOf es5 方法，获取 obj 的原型
         * 以 new Object 创建的对象为例的话
         * obj.__proto__ === Object.prototype
         */
        proto = Object.getPrototypeOf(obj);
        // 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
        if (!proto) return true;
        /**
         * 以下判断通过 new Object 方式创建的对象
         * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
         * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
         */
        Ctor = newobj.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
        // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
        return typeof Ctor === "function" && newobj.hasOwnProperty.toString.call(Ctor) === newobj.hasOwnProperty.toString.call(Object);
    };

    /**
     * 遍历相应的数据创建对应的类型判断
     */
    _.each(['Function', 'Date', 'Error', 'String', 'Arguments', 'Number', 'RegExp'], function (item) {
        _['is' + item] = function (obj) {
            return type(obj) === item.toLowerCase();
        }
    });
    /**
     * Window 对象作为客户端 JavaScript 的全局对象，它有一个 window 属性指向自身
     * @param obj
     */
    _.isWindow = function (obj) {
        //如果ibj有一个window属性指向自身，说明是window对象
        return obj !== null && obj === obj.window
    };

    var class2type = {};

    _.each("Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" "), function (item, index) {
        class2type["[object " + item + "]"] = item.toLowerCase();
    });

    function type(obj) {
        if (obj === null) {
            return obj + '';
        }
        return typeof obj === 'object' || typeof obj === 'function' ? class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj;
    }


    _.matcher = function (attrs) {
        attrs = _.extend({}, attrs);
        return function (obj) {
            return _.isMatch(obj, attrs);
        }
    };

    _.debounce = function (func, wait) {
        var timeout;
        return function () {
            clearTimeout(timeout);
            timeout = setTimeout(func, wait);
        }
    };


    _.extend = function () {
        var deep = false;
        var options, copy, src, copyIsArray, clone;
        var length = arguments.length;
        var i = 1;
        // 第一个参数不传布尔值的情况下，target默认是第一个参数
        var target = arguments[0] || {};
        // 如果第一个参数是布尔值，第二个参数是才是target
        if (typeof target === 'boolean') {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        // 如果target不是对象，我们是无法进行复制的，所以设为{}
        if (typeof target !== 'object') {
            target = {};
        }

        for (; i < length; i++) {
            // 获取当前对象
            options = arguments[i];
            // 要求不能为空 避免extend(a,,b)这种情况
            if (options !== null) {
                for (var item in options) {
                    // 目标属性值
                    src = target[name];
                    // 要复制的对象的属性值
                    copy = options[item];
                    // 解决循环引用
                    if (target === copy) {
                        continue;
                    }
                    // 要递归的对象必须是 plainObject 或者数组
                    if (deep && copy && (_.isPlainObject(copy)) || (copyIsArray = Array.isArray(copy))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && _.isPlainObject(src) ? src : {};
                        }
                        // 递归调用
                        target[name] = extend(deep, clone, copy);
                    }
                    else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };

    _.property = function (path) {
        if (!_.isArray(path)) {
            return shallowProperty(path);
        }
        return function (obj) {
            return deepGet(obj, path);
        }
    };

    var shallowProperty = function (key) {
        return function (obj) {
            return obj === null ? void 0 : obj[key];
        }
    };

    var deepGet = function (obj, path) {
        var length = path.length;
        for (var i = 0; i < length; i++) {
            if (obj === null) return void 0;
            obj = obj[path[i]];
        }
        return length ? obj : void 0;
    };

    _.reverse = function (string) {
        return string.split('').reverse().join('');
    };


    _.map = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);

        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);

        for (var i = 0; i < length; i++) {
            var currentKey = keys ? keys[i] : i;
            results[i] = iteratee.call(context, obj[currentKey], currentKey, obj);
        }
        return results;
    };


    _.identity = function (value) {
        return value;
    };


    /**
     * 获取数组中最大值
     * @param arr
     * @returns {*}
     */
    _.getMax = function (arr) {
        var max = arr[0];
        arr.forEach(function (item) {
            if (max < item) max = item;
        });
        return max;
    };

    /**
     * 数组去重
     * @param arr
     * @returns {Array}
     */
    _.unique = function (arr) {
        var hash = [];
        for (var i = 0; i < arr.length; i++) {
            hash[arr[i]] = 0;
        }
        var keys = [];
        var j = 0;
        for (var key in hash) {
            keys[j++] = key;
        }
        return keys;
    };

    _.chain = function (obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
    };


    var result = function (instance, obj) {
        return instance._chain ? _(obj).chain() : obj;
    };

    //在 _.mixin(_) 前添加自己定义的方法
    _.mixin = function (obj) {
        _.each(_.functions(obj), function (name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function () {
                var args = [this._wrapped];
                Array.prototype.push.apply(args, arguments);
                return result(this, func.apply(_, args));
            }
        });
        return _;
    };

    _.mixin(_);

    /**
     * 链式调用返回的是一个对象，此方法用于返回对象里包含的值
     * @returns {*}
     */
    _.prototype.value = function () {
        return this._wrapped;
    };

    _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

    _.prototype.toStrings = function () {
        return '' + this._wrapped;
    }

})();