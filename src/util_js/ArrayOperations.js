/**
 * Created by easterCat on 2017/11/24.
 */
(function (win) {

    /**
     * 获取数组中最大值
     * @param arr
     * @returns {*}
     */
    function getMax(arr) {
        var max = arr[0];
        for (var i = 0; i < arr.length; i++) {
            if (max < arr[i]) {
                max = arr[i];
            }
        }
        return max;
    }

    /**
     * 数组去重
     * @param arr
     * @returns {Array}
     */
    function unique(arr) {
        var hash = [];
        for (var i = 0; i < arr.length; i++) {
            hash[arr[i]] = 0;
        }
        var keys = [];
        var j = 0;
        for (var key in hash) {
            keys[j++] = key;
        }
        return keys;
    }

    win.au = {
        getMax: getMax,
        unique: unique
    }
})(window);