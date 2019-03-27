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

            if (
                computed < lastComputed ||
                (computed === Infinity && result === Infinity)
            ) {
                result = value;
                lastComputed = computed;
            }
        });
    }

    return result;
}
