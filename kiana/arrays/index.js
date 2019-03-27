import {isArrayLike, isArray, values} from "../objects/index";

export {
    difference,
    findIndex,
    findLastIndex,
    sortedIndex,
    indexOf,
    lastIndexOf,
    without,
    intersection
};

/**
 * 数组交集
 * @param {Array} array  参数中的第一个数组
 */
function intersection(array) {
    var result = [];
    var argLength = arguments.length;
    var arrLength = array.length;
    var i;
    for (i = 0; i < arrLength; i++) {
        var item = array[i];
        if (result.indexOf(item) > -1) continue;
        var j;
        for (j = 1; j < argLength; j++) {
            if (arguments[j].indexOf(item) === -1) break;
        }
        if (j === argLength) result.push(item);
    }
    return result;
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

        if (typeof idx === "number") {
            if (idx > 0) {
                i = idx >= 0 ? idx : Math.max(length + idx, 0);
            } else {
                length =
                    idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
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

        for (
            idx = dir > 0 ? i : length - 1;
            idx >= 0 && idx < length;
            idx += dir
        ) {
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
