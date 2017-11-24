/**
 * Created by fuhuo on 2017/11/22.
 */
(function () {
    var root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global) ||
        this || {};

    function Em() {
        this._events = {};
    }

    Em.prototype.on = function (eventname, listener) {
        if (!eventname || !listener) return;

        if (!_isValidListener(listener)) {
            throw new TypeError('listener must be a function');
        }

        var events = this._events;
        var listeners = events[eventname] = events[eventname] || [];
        //如果listener是一个对象，则返回true
        var listenerIsWrapped = typeof listener === 'object';

        if (_indexOf(listeners, listener) === -1) {
            //如果listener是一个对象，则直接传入listener
            listeners.push(listenerIsWrapped ? listener : {
                listener: listener,
                once: false
            });
        }

        return this;
    };

    Em.prototype.off = function (eventname, listener) {
        var listeners = this._events[eventname];
        if (!listeners) {
            throw new Error("can't find eventname in off function");
        }

        var index;
        for (var i = 0, len = listeners.length; i < len; i++) {
            if (listeners[i] && listeners[i] === listener) {
                index = i;
                break;
            }
        }

        if (index !== 'undefined') {
            listeners.splice(index, 1, null);
        }

        return this;
    };

    Em.prototype.emit = function (eventname, args) {
        var listeners = this._events[eventname];
        if (!listeners) {
            throw new Error("can't find this event");
        }

        for (var i = 0; i < listeners.length; i++) {
            var item = listeners[i];
            if (item) {
                //apply修改this指向之后执行函数
                item.listener.apply(this, args || []);
                if (item.once) {
                    //如果某个事件只能触发一次，则在触发后将其移除
                    this.off(eventname, item.listener);
                }
            }
        }
        return this;
    };

    Em.prototype.once = function (eventname, listener) {
        return this.on(eventname, {
            listener: listener,
            once: true
        })
    };

    Em.prototype.allOff = function (eventname) {
        if (eventname && this._events[eventname]) {
            this._events[eventname] = [];
        } else {
            this._events = {};
        }
    };

    function _isValidListener(listener) {
        if (typeof listener === 'function') {
            return true
        } else if (listener && typeof listener === 'object') {
            return _isValidListener(listener.listener)
        } else {
            return false
        }
    }

    function _indexOf(array, item) {
        if (array.indexOf) {
            return array.indexOf(item);
        } else {
            var result = -1;
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === item) {
                    result = i;
                    break;
                }
            }
            return result;
        }
    }

    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = Em;
        }
        exports.Em = Em;
    } else {
        root.Em = Em;
    }
})();