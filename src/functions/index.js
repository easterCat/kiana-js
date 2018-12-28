/**
 * Created by easterCat on 2018/1/24.
 */

export {
    debounce,
    throttle
}

/**
 * 函数防抖
 * @param func
 * @param wait
 * @param immediate
 * @returns {debounced}
 */
function debounce(func, wait, immediate) {
    var timeout, result;
    var debounced = function () {
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
    var timeout, context, args, result;
    var previous_time = 0;
    if (!options) options = {};

    var later = function () {
        //leading为false将初始时间设为0
        previous_time = options.leading === false ? 0 : Date.now();
        timeout = null;
        func.apply(func, args);
        if (!timeout) context = args = null;
    };

    var throttled = function () {
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