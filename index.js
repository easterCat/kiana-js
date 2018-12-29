'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

/**
 * Created by easterCat on 2018/1/22.
 */

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

var obj = /*#__PURE__*/Object.freeze({
  keys: keys,
  values: values,
  extend: extend,
  isElement: isElement,
  isArray: isArray,
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
  pick: pick,
  isArrayLike: isArrayLike
});

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
        if (isArrayLike(value) && isArray(value)) {
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
        obj = isArrayLike(obj) ? obj : values(obj);

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
        obj = isArrayLike(obj) ? obj : values(obj);

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

var arr = /*#__PURE__*/Object.freeze({
  difference: difference,
  flatten: flatten,
  findIndex: findIndex,
  findLastIndex: findLastIndex,
  sortedIndex: sortedIndex,
  indexOf: indexOf,
  lastIndexOf: lastIndexOf,
  unique: unique,
  without: without,
  max: max,
  min: min
});

/**
 * Created by easterCat on 2018/1/24.
 */

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
    var timeout, context, args;
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

var func = /*#__PURE__*/Object.freeze({
  debounce: debounce,
  throttle: throttle
});

function setCookie(key, val, time) {
    var date = new Date();
    var expiresDays = time;
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
    document.cookie = key + "=" + val + ";expires=" + date.toGMTString();
}

function getCookie(key) {
    var getCookie = document.cookie.replace(/[ ]/g, "");
    var arrCookie = getCookie.split(";");
    var tips = void 0;
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (key === arr[0]) {
            tips = arr[1];
            break;
        }
    }
    return tips;
}

function removeCookie(key) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = key + "=v; expires =" + date.toGMTString();
}

var cookie = /*#__PURE__*/Object.freeze({
  set: setCookie,
  get: getCookie,
  remove: removeCookie
});

/**
 * Created by easterCat on 2018/4/13.
 */

var index = {
    arr: arr,
    func: func,
    obj: obj,
    cookie: cookie
};

module.exports = index;
