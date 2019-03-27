/**
 * 数组去重
 * @param array 传入的数组
 * @param isSorted 判断是否是已经排序过得数组
 * @param iteratee 迭代函数
 * @returns {Array}
 */
export function unique(array, isSorted, iteratee) {
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
