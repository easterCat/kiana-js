import {isArray, isArrayLike} from "../objects";

/**
 * 数组扁平化
 * @param  {Array} input   要处理的数组
 * @param  {boolean} shallow true只扁平一层,false为全部展开
 * @param  {boolean} strict  是否严格处理元素，下面有解释
 * @param  {Number} startIndex  开始查找的起始位置
 * 源码地址：https://github.com/jashkenas/underscore/blob/master/underscore.js#L528
 */
export function flatten(input, shallow, strict, startIndex) {
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
            while (j < len) output[idx++] = value[j++];
        }
        // 不是数组，根据 strict 的值判断是跳过不处理还是放入 output
        else if (!strict) {
            output[idx++] = value;
        }
    }
    return output;
}
