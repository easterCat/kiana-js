import {
    isArrayLike,
    isArray,
    values,
} from '../objects/index';

export {
    difference,
    flatten,
    findIndex,
    findLastIndex,
    sortedIndex,
    indexOf,
    lastIndexOf,
    unique,
    without,
    max,
    min
}

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
    var output = [], idx = 0;

    for (var i = startIndex || 0, length = input.length; i < length; i++) {
        var value = input[i];
        // 数组 或者 arguments，就进行处理
        // if (isArrayLike(value) && (isArray(value) || _.isArguments(value))) {
        if (isArrayLike(value) && (isArray(value))) {
            // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
            if (!shallow) {
                value = flatten(value, shallow, strict);
            }
            var j = 0, len = value.length;
            output.length += len;
            while (j < len) output[idx++] = value[j++];
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
    })
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
            computed = iteratee(value, index, list);//迭代后的值
            // && 的优先级高于 ||
            if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                result = value;
                lastComputed = computed;
            }
        })
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
    var result = Infinity, item, computed, lastComputed = Infinity;

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
        })
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
    }
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
        }

        else if (sortedIndex && idx && length) {
            idx = sortedIndex(array, item);
            // 如果该插入的位置的值正好等于元素的值，说明是第一个符合要求的值
            return array[idx] === item ? idx : -1;
        }

        // 判断是否是 NaN
        if (item !== item) {
            idx = predicate(array.slice(i, length), isNaN)
            return idx >= 0 ? idx + i : -1;
        }

        for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
            if (array[idx] === item) {
                return idx;
            }
        }
        return -1;
    }
}

function _cb(fn, context) {
    return function (arg) {
        //如果回调函数存在，则执行回调函数，并且将传入的参数当做参数传入回调函数
        //如果回调函数不存在，则直接将传入的参数返回，什么也不做
        return fn ? fn.call(context, arg) : arg;
    }
}
