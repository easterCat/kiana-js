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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

__webpack_require__(1);

var _arrays = __webpack_require__(2);

var obj = {
    difference: _arrays.difference,
    flatten: _arrays.flatten,
    findIndex: _arrays.findIndex,
    findLastIndex: _arrays.findLastIndex,
    sortedIndex: _arrays.sortedIndex,
    indexOf: _arrays.indexOf,
    lastIndexOf: _arrays.lastIndexOf,
    unique: _arrays.unique,
    without: _arrays.without,
    max: _arrays.max,
    min: _arrays.min,
    keys: _arrays.keys,
    values: _arrays.values,
    extend: _arrays.extend,
    isElement: _arrays.isElement,
    isArray: _arrays.isArray,
    isObject: _arrays.isObject,
    isPlainObject: _arrays.isPlainObject,
    isWindow: _arrays.isWindow,
    isFunction: _arrays.isFunction,
    isDate: _arrays.isDate,
    isError: _arrays.isError,
    isString: _arrays.isString,
    isArguments: _arrays.isArguments,
    isNumber: _arrays.isNumber,
    isRegExp: _arrays.isRegExp,
    isEmpty: _arrays.isEmpty,
    pick: _arrays.pick,
    debounce: _arrays.debounce,
    throttle: _arrays.throttle
};

exports.default = obj;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = "module.exports = __webpack_public_path__ + \"index.html\";";

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.min = exports.max = exports.without = exports.difference = exports.unique = exports.lastIndexOf = exports.indexOf = exports.sortedIndex = exports.findLastIndex = exports.findIndex = exports.flatten = undefined;

var _index = __webpack_require__(3);

exports.flatten = flatten;
exports.findIndex = findIndex;
exports.findLastIndex = findLastIndex;
exports.sortedIndex = sortedIndex;
exports.indexOf = indexOf;
exports.lastIndexOf = lastIndexOf;
exports.unique = unique;
exports.difference = difference;
exports.without = without;
exports.max = max;
exports.min = min;

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by easterCat on 2018/1/22.
 */
exports.isArrayLike = isArrayLike;
exports.isArray = isArray;
exports.extend = extend;
exports.isElement = isElement;
exports.isObject = isObject;
exports.isPlainObject = isPlainObject;
exports.isWindow = isWindow;
exports.isFunction = isFunction;
exports.isDate = isDate;
exports.isError = isError;
exports.isString = isString;
exports.isArguments = isArguments;
exports.isNumber = isNumber;
exports.isRegExp = isRegExp;
exports.isEmpty = isEmpty;
exports.keys = keys;
exports.values = values;
exports.pick = pick;


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

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map