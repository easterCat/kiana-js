import {
    isArrayLike,
    isArray
} from '../objects';

module.exports = {
    flatten: flatten,
    findIndex: findIndex(),
    findLastIndex: findLastIndex(),
    sortedIndex: sortedIndex,
    indexOf: indexOf(),
    lastIndexOf: lastIndexOf()
};

/**
 * 数组扁平化
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow 是否只扁平一层
 * @param  {boolean} strict  是否严格处理元素，下面有解释
 * @param  {Array} startIndex  开始查找的起始位置
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */
function flatten(input, shallow, strict, startIndex) {
    // 递归使用的时候会用到output
    var output = [];
    var idx = output.length;

    for (var i = startIndex || 0, length = input.length; i < length; i++) {
        var value = input[i];
        // 数组 或者 arguments，就进行处理
        // if (isArrayLike(value) && (isArray(value) || _.isArguments(value))) {
        if (isArrayLike(value) && (isArray(value))) {
            // 如果是只扁平一层，遍历该数组，依此填入 output
            if (shallow) {
                var j = 0, len = value.length;
                output.length += len;
                while (j < len) output[idx++] = value[j++];
            }
            // 如果是全部扁平就递归，传入已经处理的 output，递归中接着处理 output
            else {
                value = flatten(value, shallow, strict);
            }
        }
        // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
        else if (!strict) {
            output[idx++] = value;
        }
    }
    return output;
}

function findIndex(array, callback, context) {
    return _createIndexFinder(1);
}

function findLastIndex(array, callback, context) {
    return _createIndexFinder(-1);
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

function indexOf(array, item) {
    return _createIndexOfFinder(1, findIndex, sortedIndex);
}

function lastIndexOf(array, item) {
    return _createIndexOfFinder(-1, findLastIndex);
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

function _cb(fn, context) {
    return function (arg) {
        //如果回调函数存在，则执行回调函数，并且将传入的参数当做参数传入回调函数
        //如果回调函数不存在，则直接将传入的参数返回，什么也不做
        return fn ? fn.call(context, arg) : arg;
    }
}
