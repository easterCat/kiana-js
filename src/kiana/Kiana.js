import {
    flatten,
    findIndex,
    findLastIndex,
    sortedIndex,
    indexOf,
    lastIndexOf,
    unique
} from './arrays';

import {
    extend,
    isElement,
    isArray,
    isObject,
    isPlainObject,
    isWindow,
    isFunction,
    isDate,
    isError,
    isString,
    isArguments,
    isNumber,
    isRegExp,
    isEmpty
} from './objects';

import {
    debounce,
    throttle
} from './functions';

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

    var getLength = property('length');

    // 闭包
    function property(key) {
        return function (obj) {
            //使用void 0替代undefined已防止undefined在低版本浏览器被重写
            return obj === null ? void 0 : obj[key];
        };
    }

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


    /**
     * 遍历相应的数据创建对应的类型判断
     */
    _.isEmpty = isEmpty;
    _.isElement = isElement;
    _.isArray = isArray;
    _.isObject = isObject;
    _.isPlainObject = isPlainObject;
    _.isFunction = isFunction;
    _.isDate = isDate;
    _.isError = isError;
    _.String = isString;
    _.isArguments = isArguments;
    _.isNumber = isNumber;
    _.isRegExp = isRegExp;
    _.isWindow = isWindow;
    _.matcher = function (attrs) {
        attrs = _.extend({}, attrs);
        return function (obj) {
            return _.isMatch(obj, attrs);
        }
    };

    //函数
    _.debounce = debounce;
    _.throttle = throttle;

    //数组去重
    _.uniq = _.unique = unique;
    //将嵌套的数组展开
    _.flatten = function (arr, shallow) {
        // shallow => 是否只展开一层
        // false 为 flatten 方法 strict 变量
        return flatten(arr, shallow, false);
    };
    //将嵌套数组展开后再进行去重
    _.union = function () {
        return _.uniq(flatten(arguments, true, true));
    };
    _.findIndex = findIndex;
    _.findLastIndex = findLastIndex;
    _.sortedIndex = sortedIndex;
    _.indexOf = indexOf;
    _.lastIndexOf = lastIndexOf;
    _.difference = function () {

    };

    // function difference(array,...rest){
    //     rest = flatten(rest, true, true);
    //     return array.filter(function (item) {
    //         return rest.indexOf(item) === -1;
    //     })
    // }

    _.extend = extend;

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