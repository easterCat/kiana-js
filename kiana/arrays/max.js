/**
 * 获取数组中最大值
 * @param obj 传入的数组或对象
 * @param iteratee 迭代函数
 * @param context
 * @returns {number}
 */
export function max(obj, iteratee, context) {
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
            if (
                computed > lastComputed ||
                (computed === -Infinity && result === -Infinity)
            ) {
                result = value;
                lastComputed = computed;
            }
        });
    }

    return result;
}
