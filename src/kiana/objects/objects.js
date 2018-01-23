/**
 * Created by easterCat on 2018/1/22.
 */
module.exports = {
    isArrayLike: isArrayLike,
    isArray: isArray,
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
    if (Array.isArray) return Array.isArray(obj);
    else return type(obj) === 'array';
}


