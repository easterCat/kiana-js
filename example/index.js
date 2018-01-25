/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by easterCat on 2018/1/22.
 */
module.exports = {
    isArrayLike: isArrayLike,
    isArray: isArray,
    extend: extend,
    isElement: isElement,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isWindow: isWindow,
    isFunction: isFunction,
    isDate: isDate,
    isError: isError,
    isString: isString,
    isArguments: isArguments,
    isNumber: isNumber,
    isRegExp: isRegExp,
    isEmpty: isEmpty,
    keys: keys,
    values: values,
    pick: pick
};

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

function isArrayLike(collection) {
    var length = collection.length;
    return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
}

/**
 * 判断是否是数组对象
 * @param obj
 * @returns {boolean}
 */
function isArray(obj) {
    if (Array.isArray) return Array.isArray(obj);else return type(obj) === 'array';
}

/**
 * 返回一个对象可枚举属性组成的数组
 * @param obj
 * @returns {Array}
 */
function keys(obj) {
    if (!isObject(obj)) {
        return [];
    }
    if (Object.keys) {
        return Object.keys(obj);
    }
    var keys = [];

    for (var type in obj) {
        if (obj.hasOwnProperty(type)) {
            keys.push(type);
        }
    }

    return keys;
}

function values(obj) {
    if (isObject(obj)) {
        if (Object.values) {
            return Object.values(obj);
        }

        var _keys = keys(obj);
        var length = _keys.length;
        var result = [];

        for (var i = 0; i < length; i++) {
            result[i] = obj[_keys[i]];
        }

        return result;
    } else {
        return {};
    }
}

/**
 * 对象合并，将源对象复制到目标对象
 * @returns {*|{}}
 */
function extend() {
    var deep = false;
    var name, options, src, copy, clone, copyIsArray;
    var length = arguments.length;
    // 记录要复制的对象的下标,默认从1开始
    var i = 1;
    // 第一个参数不传布尔值的情况下，target默认是第一个参数
    var target = arguments[0] || {};
    // 如果target不是对象，我们是无法进行复制的，所以设为{}
    if (typeof target === 'boolean') {
        deep = target;
        target = arguments[i] || {};
        //因为第一个下标是boolean，所有复制的对象下标从2开始
        i++;
    }
    // 如果target不是对象，我们是无法进行复制的，所以设为{}
    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && !isFunction(target)) {
        target = {};
    }

    for (; i < length; i++) {
        options = arguments[i];
        if (options !== null) {
            for (name in options) {
                if (options.hasOwnProperty(name)) {
                    src = target[name]; // 要复制的对象的属性值
                    copy = options[name]; // 要复制的对象的属性值

                    // 解决循环引用
                    if (target === copy) {
                        continue;
                    }

                    // 要递归的对象必须是 plainObject 或者数组
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        target[name] = extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
    }
    return target;
}

function pick() {}

/**
 * 判断是否为 DOM 元素
 * @param obj
 * @returns {boolean}
 */
function isElement(obj) {
    // 确保 obj 不是 null, undefined 等假值
    // 并且 obj.nodeType === 1
    return !!(obj && obj.nodeType === 1);
}

function isPlainObject(obj) {
    var proto,
        Ctor,
        newobj = {};
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
}

/**
 * 判断是否为对象,这里的对象包括 function 和 object
 * @param obj
 * @returns {boolean}
 */
function isObject(obj) {
    return _type(obj) === 'object';
}

function isEmpty(obj) {
    return !!(obj && obj.nodeType === 1);
}

function isFunction(obj) {
    return _type(obj) === /**/'function';
}
function isDate(obj) {
    return _type(obj) === 'date';
}
function isError(obj) {
    return _type(obj) === 'error';
}
function isString(obj) {
    return _type(obj) === 'string';
}
function isArguments(obj) {
    return _type(obj) === 'arguments';
}
function isNumber(obj) {
    return _type(obj) === 'number';
}
function isRegExp(obj) {
    return _type(obj) === 'regexp';
}

/**
 * Window 对象作为客户端 JavaScript 的全局对象，它有一个 window 属性指向自身
 * @param obj
 */
function isWindow(obj) {
    //如果ibj有一个window属性指向自身，说明是window对象
    return obj !== null && obj === obj.window;
}

var class2type = {};

"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").forEach(function (item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
});

function _type(obj) {
    if (obj === null) {
        return obj + '';
    }
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function' ? class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

var _ = __webpack_require__(3);
window._ = _;
// test();


function test() {
    var arr = [11, 22, 11, 3, 4, 5, 4, 3, 22, 11];
    console.log(_.unique(arr));

    var arr2 = [1, [5], [2, [3, 4]]];
    console.log(_.flatten(arr2, false));

    var arr3 = [1, 2, 3, 4, 5, 6, 7];
    console.log(_.findIndex(arr3, function (item) {
        return item === 3;
    }));
    console.log(_.findLastIndex(arr3, function (item) {
        return item === 3;
    }));

    console.log(_.sortedIndex(arr3, 6));
    console.log(_.indexOf(arr3, 3));

    var obj = {
        a: {
            y: 3
        }
    };

    var obj2 = {
        c: 3
    };

    var obj3 = {
        d: 5,
        a: {
            u: 3
        }
    };

    console.log(_.pick({ name: 'moe', age: 50, userid: 'moe1' }, 'name', 'age'));

    var obj4 = {
        a: 1, b: 2, c: 3, d: 4
    };

    console.log(_.keys(obj4));
    console.log(_.union([1, 2, 3], [101, 2, 1, 10], [2, 1]));
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = "module.exports = __webpack_public_path__ + \"index.html\";";

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _arrays = __webpack_require__(6);

var _objects = __webpack_require__(0);

var _functions = __webpack_require__(7);

(function () {
    'use strict';

    //严格模式下，this指向undefined而不是window

    var root = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' && self.self === self && self || (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && global.global === global && global || this || {};

    //js中函数也是一种对象，可以挂载属性和方法
    var _ = function _(obj) {
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

    var isArrayLike = function isArrayLike(collection) {
        var length = collection.length;
        return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    _.each = function (obj, callback) {
        var length,
            i = 0;
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
    var optimizeCb = function optimizeCb(func, context) {
        if (context === void 0) return func;
        return function () {
            return func.apply(context, arguments);
        };
    };

    var cb = function cb(value, context, argCount) {
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

    _.isEqual = function (a, b) {};

    //对象
    _.keys = _objects.keys;
    _.values = _objects.values;
    _.extend = _objects.extend;
    _.pick = _objects.pick;
    _.isEmpty = _objects.isEmpty;
    _.isElement = _objects.isElement;
    _.isArray = _objects.isArray;
    _.isObject = _objects.isObject;
    _.isPlainObject = _objects.isPlainObject;
    _.isFunction = _objects.isFunction;
    _.isDate = _objects.isDate;
    _.isError = _objects.isError;
    _.String = _objects.isString;
    _.isArguments = _objects.isArguments;
    _.isNumber = _objects.isNumber;
    _.isRegExp = _objects.isRegExp;
    _.isWindow = _objects.isWindow;
    _.matcher = function (attrs) {
        attrs = _.extend({}, attrs);
        return function (obj) {
            return _.isMatch(obj, attrs);
        };
    };

    //函数
    _.debounce = _functions.debounce;
    _.throttle = _functions.throttle;

    //数组
    _.max = _arrays.max;
    _.min = _arrays.min;
    _.uniq = _.unique = _arrays.unique;
    _.flatten = function (arr, shallow) {
        return (0, _arrays.flatten)(arr, shallow, false);
    };
    _.union = function () {
        return _.uniq((0, _arrays.flatten)(arguments, true, true));
    };
    _.findIndex = _arrays.findIndex;
    _.findLastIndex = _arrays.findLastIndex;
    _.sortedIndex = _arrays.sortedIndex;
    _.indexOf = _arrays.indexOf;
    _.lastIndexOf = _arrays.lastIndexOf;
    _.difference = _arrays.difference;
    _.without = _arrays.without;

    _.property = function (path) {
        if (!_.isArray(path)) {
            return shallowProperty(path);
        }
        return function (obj) {
            return deepGet(obj, path);
        };
    };

    var shallowProperty = function shallowProperty(key) {
        return function (obj) {
            return obj === null ? void 0 : obj[key];
        };
    };

    var deepGet = function deepGet(obj, path) {
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

    _.chain = function (obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
    };

    var result = function result(instance, obj) {
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
            };
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
    };
})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(5)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(0);

module.exports = {
    flatten: flatten,
    findIndex: findIndex(),
    findLastIndex: findLastIndex(),
    sortedIndex: sortedIndex,
    indexOf: indexOf(),
    lastIndexOf: lastIndexOf(),
    unique: unique,
    difference: difference,
    without: without,
    max: max,
    min: min
};

/**
 * 数组扁平化
 * _.flatten/
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow true只扁平一层,false为全部展开
 * @param  {boolean} strict  是否严格处理元素，下面有解释
 * @param  {Number} startIndex  开始查找的起始位置
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */
function flatten(input, shallow, strict, startIndex) {
    // 递归使用的时候会用到output
    var output = [],
        idx = 0;

    for (var i = startIndex || 0, length = input.length; i < length; i++) {
        var value = input[i];
        // 数组 或者 arguments，就进行处理
        // if (isArrayLike(value) && (isArray(value) || _.isArguments(value))) {
        if ((0, _index.isArrayLike)(value) && (0, _index.isArray)(value)) {
            // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
            if (!shallow) {
                value = flatten(value, shallow, strict);
            }
            var j = 0,
                len = value.length;
            output.length += len;
            while (j < len) {
                output[idx++] = value[j++];
            }
        }
        // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
        else if (!strict) {
                output[idx++] = value;
            }
    }
    return output;
}

/**
 * 返回一个删除所有指定值后的 array副本
 * @param array
 * @returns {*}
 */
function without(array) {
    // slice.call(arguments, 1)将 arguments 转为数组（同时去掉第一个元素）
    // 之后便可以调用 _.difference 方法
    return difference(array, Array.prototype.slice.call(arguments, 1));
}

function difference(array) {
    //将参数数组展开一层
    var rest = flatten(arguments, true, true, 1);
    return array.filter(function (item) {
        return rest.indexOf(item) === -1;
    });
}

/**
 * 数组去重
 * @param array 传入的数组
 * @param isSorted 判断是否是已经排序过得数组
 * @param iteratee 迭代函数
 * @returns {Array}
 */
function unique(array, isSorted, iteratee) {
    var res = [];
    var seen = [];

    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        //如果迭代函数存在，就返回操作后的值
        var computed = iteratee ? iteratee(item, i, array) : item;
        if (isSorted) {
            if (!i || seen !== computed) {
                res.push(item);
            }
            seen = computed;
        } else if (iteratee) {
            if (seen.indexOf(computed) === -1) {
                seen.push(computed);
                res.push(item);
            }
        } else if (res.indexOf(item) === -1) {
            res.push(item);
        }
    }

    return res;
}

/**
 * 获取数组中最大值
 * @param obj 传入的数组或对象
 * @param iteratee 迭代函数
 * @param context
 * @returns {number}
 */
function max(obj, iteratee, context) {
    var result = -Infinity,
        computed,
        lastComputed = -Infinity,
        item;

    //如果只是传入数组或对象，没有迭代函数，则正常比较
    if (!iteratee && obj) {
        obj = (0, _index.isArrayLike)(obj) ? obj : (0, _index.values)(obj);

        for (var i = 0, length = obj.length; i < length; i++) {
            item = obj[i];
            if (item > result) {
                result = item;
            }
        }
    } else {
        iteratee = _cb(iteratee, context);

        // result 保存结果元素
        // lastComputed 保存计算过程中出现的最值
        // 遍历元素
        obj.forEach(function (value, index, list) {
            computed = iteratee(value, index, list); //迭代后的值
            // && 的优先级高于 ||
            if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                result = value;
                lastComputed = computed;
            }
        });
    }

    return result;
}

/**
 * 获取数组中最小值
 * @param obj
 * @param iteratee
 * @param context
 * @returns {Number}
 */
function min(obj, iteratee, context) {
    var result = Infinity,
        item,
        computed,
        lastComputed = Infinity;

    if (!iteratee && obj) {
        obj = (0, _index.isArrayLike)(obj) ? obj : (0, _index.values)(obj);

        for (var i = 0, length = obj.length; i < length; i++) {
            item = obj[i];

            if (item < result) {
                result = item;
            }
        }
    } else {
        iteratee = _cb(iteratee, context);

        obj.forEach(function (value, index, list) {
            //类似于iteratee.call(context,value,index,list);
            computed = iteratee(value, index, list);

            if (computed < lastComputed || computed === Infinity && result === Infinity) {
                result = value;
                lastComputed = computed;
            }
        });
    }

    return result;
}

function findIndex(array, callback, context) {
    return _createIndexFinder(1);
}

function findLastIndex(array, callback, context) {
    return _createIndexFinder(-1);
}

function indexOf(array, item) {
    return _createIndexOfFinder(1, findIndex, sortedIndex);
}

function lastIndexOf(array, item) {
    return _createIndexOfFinder(-1, findLastIndex);
}

function sortedIndex(array, obj, iteratee, context) {
    iteratee = _cb(iteratee, context);
    var low = 0;
    var high = array.length;
    while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (iteratee(array[mid]) < iteratee(obj)) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    return high;
}

function _createIndexFinder(dir) {
    return function (array, callback, context) {
        var length = array.length;
        var index = dir > 0 ? 0 : length - 1;

        for (; index >= 0 && index < length; index += dir) {
            if (callback.call(context, array[index], index, array)) {
                return index;
            }
        }
        return -1;
    };
}

function _createIndexOfFinder(dir, predicate, sortedIndex) {
    //idx设定开始查找的位置
    return function (array, item, idx) {
        var length = array.length;
        var i = 0;

        if (typeof idx === 'number') {
            if (idx > 0) {
                i = idx >= 0 ? idx : Math.max(length + idx, 0);
            } else {
                length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
            }
        } else if (sortedIndex && idx && length) {
            idx = sortedIndex(array, item);
            // 如果该插入的位置的值正好等于元素的值，说明是第一个符合要求的值
            return array[idx] === item ? idx : -1;
        }

        // 判断是否是 NaN
        if (item !== item) {
            idx = predicate(array.slice(i, length), isNaN);
            return idx >= 0 ? idx + i : -1;
        }

        for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
            if (array[idx] === item) {
                return idx;
            }
        }
        return -1;
    };
}

function _cb(fn, context) {
    return function (arg) {
        //如果回调函数存在，则执行回调函数，并且将传入的参数当做参数传入回调函数
        //如果回调函数不存在，则直接将传入的参数返回，什么也不做
        return fn ? fn.call(context, arg) : arg;
    };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Created by easterCat on 2018/1/24.
 */
module.exports = {
    debounce: debounce,
    throttle: throttle
};

/**
 * 函数防抖
 * @param func
 * @param wait
 * @param immediate
 * @returns {debounced}
 */
function debounce(func, wait, immediate) {
    var timeout, result;
    var debounced = function debounced() {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);

        if (immediate) {
            var callnow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait);
            if (callnow) result = func.apply(context, args);
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args);
            }, wait);
        }
        return result;
    };

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}

/**
 * 函数节流 鼠标移入能立刻执行，停止触发的时候还能再执行一次！
 * @param func 回调函数
 * @param wait 延时时间
 * @param options leading:false禁用第一次执行,trailing: false 禁用结束后再执行一次
 * @returns {throttled}
 */
function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous_time = 0;
    if (!options) options = {};

    var later = function later() {
        //leading为false将初始时间设为0
        previous_time = options.leading === false ? 0 : Date.now();
        timeout = null;
        func.apply(func, args);
        if (!timeout) context = args = null;
    };

    var throttled = function throttled() {
        var now_time = Date.now();
        if (!previous_time && options.leading === false) previous_time = now_time;
        //下次触发func的剩余时间
        var remaining = wait - (now_time - previous_time);
        context = this;
        args = arguments;
        // 如果没有剩余的时间了或者你改了系统时间,则进行首次执行
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous_time = now_time;
            console.log(remaining);
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            //条件满足，利用延时函数在结束后再执行一次
            timeout = setTimeout(later, remaining);
        }
    };

    throttled.cancel = function () {
        clearTimeout(timeout);
        previous_time = 0;
        timeout = null;
    };

    return throttled;
}

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map