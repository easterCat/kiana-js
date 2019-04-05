'use strict';

function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
    return module = {exports: {}}, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math
        ? window : typeof self != 'undefined' && self.Math == Math ? self
            // eslint-disable-next-line no-new-func
            : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
    var core = module.exports = {version: '2.6.5'};
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _aFunction = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
        case 1:
            return function (a) {
                return fn.call(that, a);
            };
        case 2:
            return function (a, b) {
                return fn.call(that, a, b);
            };
        case 3:
            return function (a, b, c) {
                return fn.call(that, a, b, c);
            };
    }
    return function (/* ...args */) {
        return fn.apply(that, arguments);
    };
};

var _isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
};

var _fails = function (exec) {
    try {
        return !!exec();
    } catch (e) {
        return true;
    }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', {
        get: function () {
            return 7;
        }
    }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
    return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(_domCreate('div'), 'a', {
        get: function () {
            return 7;
        }
    }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject(O);
    P = _toPrimitive(P, true);
    _anObject(Attributes);
    if (_ie8DomDefine) try {
        return dP(O, P, Attributes);
    } catch (e) { /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
};

var _objectDp = {
    f: f
};

var _propertyDesc = function (bitmap, value) {
    return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
    };
};

var _hide = _descriptors ? function (object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
    object[key] = value;
    return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
    return hasOwnProperty.call(it, key);
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var IS_WRAP = type & $export.W;
    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    var expProto = exports[PROTOTYPE];
    var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
    var key, own, out;
    if (IS_GLOBAL) source = name;
    for (key in source) {
        // contains in native
        own = !IS_FORCED && target && target[key] !== undefined;
        if (own && _has(exports, key)) continue;
        // export native or passed
        out = own ? target[key] : source[key];
        // prevent global pollution for namespaces
        exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
            // bind timers to global for call from export context
            : IS_BIND && own ? _ctx(out, _global)
                // wrap global constructors for prevent change them in library
                : IS_WRAP && target[key] == out ? (function (C) {
                    var F = function (a, b, c) {
                        if (this instanceof C) {
                            switch (arguments.length) {
                                case 0:
                                    return new C();
                                case 1:
                                    return new C(a);
                                case 2:
                                    return new C(a, b);
                            }
                            return new C(a, b, c);
                        }
                        return C.apply(this, arguments);
                    };
                    F[PROTOTYPE] = C[PROTOTYPE];
                    return F;
                    // make static versions for prototype methods
                })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
        // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
        if (IS_PROTO) {
            (exports.virtual || (exports.virtual = {}))[key] = out;
            // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
            if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
        }
    }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

var toString = {}.toString;

var _cof = function (it) {
    return toString.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
    return _iobject(_defined(it));
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
    index = _toInteger(index);
    return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes


var _arrayIncludes = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
        var O = _toIobject($this);
        var length = _toLength(O.length);
        var index = _toAbsoluteIndex(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare
        if (IS_INCLUDES && el != el) while (length > index) {
            value = O[index++];
            // eslint-disable-next-line no-self-compare
            if (value != value) return true;
            // Array#indexOf ignores holes, Array#includes - not
        } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
            if (O[index] === el) return IS_INCLUDES || index || 0;
        }
        return !IS_INCLUDES && -1;
    };
};

var _library = true;

var _shared = createCommonjsModule(function (module) {
    var SHARED = '__core-js_shared__';
    var store = _global[SHARED] || (_global[SHARED] = {});

    (module.exports = function (key, value) {
        return store[key] || (store[key] = value !== undefined ? value : {});
    })('versions', []).push({
        version: _core.version,
        mode: 'pure',
        copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
    });
});

var id = 0;
var px = Math.random();
var _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var shared = _shared('keys');

var _sharedKey = function (key) {
    return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
    var O = _toIobject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (_has(O, key = names[i++])) {
        ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
    'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)


var _objectKeys = Object.keys || function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
};

var f$1 = Object.getOwnPropertySymbols;

var _objectGops = {
    f: f$1
};

var f$2 = {}.propertyIsEnumerable;

var _objectPie = {
    f: f$2
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
    return Object(_defined(it));
};

// 19.1.2.1 Object.assign(target, source, ...)


var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
var _objectAssign = !$assign || _fails(function () {
    var A = {};
    var B = {};
    // eslint-disable-next-line no-undef
    var S = Symbol();
    var K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function (k) {
        B[k] = k;
    });
    return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
    var T = _toObject(target);
    var aLen = arguments.length;
    var index = 1;
    var getSymbols = _objectGops.f;
    var isEnum = _objectPie.f;
    while (aLen > index) {
        var S = _iobject(arguments[index++]);
        var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
        var length = keys.length;
        var j = 0;
        var key;
        while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
    return T;
} : $assign;

// 19.1.3.1 Object.assign(target, source)


_export(_export.S + _export.F, 'Object', {assign: _objectAssign});

var assign = _core.Object.assign;

var assign$1 = createCommonjsModule(function (module) {
    module.exports = {"default": assign, __esModule: true};
});

var _Object$assign = unwrapExports(assign$1);

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$1 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
    O = _toObject(O);
    if (_has(O, IE_PROTO$1)) return O[IE_PROTO$1];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype;
    }
    return O instanceof Object ? ObjectProto : null;
};

// most Object methods by ES6 should accept primitives


var _objectSap = function (KEY, exec) {
    var fn = (_core.Object || {})[KEY] || Object[KEY];
    var exp = {};
    exp[KEY] = exec(fn);
    _export(_export.S + _export.F * _fails(function () {
        fn(1);
    }), 'Object', exp);
};

// 19.1.2.9 Object.getPrototypeOf(O)


_objectSap('getPrototypeOf', function () {
    return function getPrototypeOf(it) {
        return _objectGpo(_toObject(it));
    };
});

var getPrototypeOf = _core.Object.getPrototypeOf;

var getPrototypeOf$1 = createCommonjsModule(function (module) {
    module.exports = {"default": getPrototypeOf, __esModule: true};
});

var _Object$getPrototypeOf = unwrapExports(getPrototypeOf$1);

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
    return function (that, pos) {
        var s = String(_defined(that));
        var i = _toInteger(pos);
        var l = s.length;
        var a, b;
        if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
        a = s.charCodeAt(i);
        return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
            ? TO_STRING ? s.charAt(i) : a
            : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
};

var _redefine = _hide;

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    _anObject(O);
    var keys = _objectKeys(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
    return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */
};
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = _domCreate('iframe');
    var i = _enumBugKeys.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    _html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
    return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
        Empty[PROTOTYPE$1] = _anObject(O);
        result = new Empty();
        Empty[PROTOTYPE$1] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO$2] = O;
    } else result = createDict();
    return Properties === undefined ? result : _objectDps(result, Properties);
};

var _wks = createCommonjsModule(function (module) {
    var store = _shared('wks');

    var Symbol = _global.Symbol;
    var USE_SYMBOL = typeof Symbol == 'function';

    var $exports = module.exports = function (name) {
        return store[name] || (store[name] =
            USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
    };

    $exports.store = store;
});

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
    if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {configurable: true, value: tag});
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () {
    return this;
});

var _iterCreate = function (Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, {next: _propertyDesc(1, next)});
    _setToStringTag(Constructor, NAME + ' Iterator');
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate(Constructor, NAME, next);
    var getMethod = function (kind) {
        if (!BUGGY && kind in proto) return proto[kind];
        switch (kind) {
            case KEYS:
                return function keys() {
                    return new Constructor(this, kind);
                };
            case VALUES:
                return function values() {
                    return new Constructor(this, kind);
                };
        }
        return function entries() {
            return new Constructor(this, kind);
        };
    };
    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
        IteratorPrototype = _objectGpo($anyNative.call(new Base()));
        if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
            // Set @@toStringTag to native iterators
            _setToStringTag(IteratorPrototype, TAG, true);
        }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES) {
        VALUES_BUG = true;
        $default = function values() {
            return $native.call(this);
        };
    }
    // Define iterator
    if ((FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
        _hide(proto, ITERATOR, $default);
    }
    if (DEFAULT) {
        methods = {
            values: DEF_VALUES ? $default : getMethod(VALUES),
            keys: IS_SET ? $default : getMethod(KEYS),
            entries: $entries
        };
        if (FORCED) for (key in methods) {
            if (!(key in proto)) _redefine(proto, key, methods[key]);
        } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
    this._t = String(iterated); // target
    this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
    var O = this._t;
    var index = this._i;
    var point;
    if (index >= O.length) return {value: undefined, done: true};
    point = $at(O, index);
    this._i += point.length;
    return {value: point, done: false};
});

var _iterStep = function (done, value) {
    return {value: value, done: !!done};
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
    this._t = _toIobject(iterated); // target
    this._i = 0;                   // next index
    this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
        this._t = undefined;
        return _iterStep(1);
    }
    if (kind == 'keys') return _iterStep(0, index);
    if (kind == 'values') return _iterStep(0, O[index]);
    return _iterStep(0, [index, O[index]]);
}, 'values');

var TO_STRING_TAG = _wks('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
    'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
    'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
    'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
    'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
    var NAME = DOMIterables[i];
    var Collection = _global[NAME];
    var proto = Collection && Collection.prototype;
    if (proto && !proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
}

var f$3 = _wks;

var _wksExt = {
    f: f$3
};

var iterator = _wksExt.f('iterator');

var iterator$1 = createCommonjsModule(function (module) {
    module.exports = {"default": iterator, __esModule: true};
});

unwrapExports(iterator$1);

var _meta = createCommonjsModule(function (module) {
    var META = _uid('meta');


    var setDesc = _objectDp.f;
    var id = 0;
    var isExtensible = Object.isExtensible || function () {
        return true;
    };
    var FREEZE = !_fails(function () {
        return isExtensible(Object.preventExtensions({}));
    });
    var setMeta = function (it) {
        setDesc(it, META, {
            value: {
                i: 'O' + ++id, // object ID
                w: {}          // weak collections IDs
            }
        });
    };
    var fastKey = function (it, create) {
        // return primitive with prefix
        if (!_isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
        if (!_has(it, META)) {
            // can't set metadata to uncaught frozen object
            if (!isExtensible(it)) return 'F';
            // not necessary to add metadata
            if (!create) return 'E';
            // add missing metadata
            setMeta(it);
            // return object ID
        }
        return it[META].i;
    };
    var getWeak = function (it, create) {
        if (!_has(it, META)) {
            // can't set metadata to uncaught frozen object
            if (!isExtensible(it)) return true;
            // not necessary to add metadata
            if (!create) return false;
            // add missing metadata
            setMeta(it);
            // return hash weak collections IDs
        }
        return it[META].w;
    };
// add metadata on freeze-family methods calling
    var onFreeze = function (it) {
        if (FREEZE && meta.NEED && isExtensible(it) && !_has(it, META)) setMeta(it);
        return it;
    };
    var meta = module.exports = {
        KEY: META,
        NEED: false,
        fastKey: fastKey,
        getWeak: getWeak,
        onFreeze: onFreeze
    };
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var defineProperty = _objectDp.f;
var _wksDefine = function (name) {
    var $Symbol = _core.Symbol || (_core.Symbol = {});
    if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, {value: _wksExt.f(name)});
};

// all enumerable object keys, includes symbols


var _enumKeys = function (it) {
    var result = _objectKeys(it);
    var getSymbols = _objectGops.f;
    if (getSymbols) {
        var symbols = getSymbols(it);
        var isEnum = _objectPie.f;
        var i = 0;
        var key;
        while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
    }
    return result;
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
    return _cof(arg) == 'Array';
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
    f: f$4
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN = _objectGopn.f;
var toString$1 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
    ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
    try {
        return gOPN(it);
    } catch (e) {
        return windowNames.slice();
    }
};

var f$5 = function getOwnPropertyNames(it) {
    return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(_toIobject(it));
};

var _objectGopnExt = {
    f: f$5
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$6 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
    O = _toIobject(O);
    P = _toPrimitive(P, true);
    if (_ie8DomDefine) try {
        return gOPD(O, P);
    } catch (e) { /* empty */
    }
    if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
    f: f$6
};

// ECMAScript 6 symbols shim


var META = _meta.KEY;


var gOPD$1 = _objectGopd.f;
var dP$1 = _objectDp.f;
var gOPN$1 = _objectGopnExt.f;
var $Symbol = _global.Symbol;
var $JSON = _global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$2 = 'prototype';
var HIDDEN = _wks('_hidden');
var TO_PRIMITIVE = _wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared('symbol-registry');
var AllSymbols = _shared('symbols');
var OPSymbols = _shared('op-symbols');
var ObjectProto$1 = Object[PROTOTYPE$2];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = _global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors && _fails(function () {
    return _objectCreate(dP$1({}, 'a', {
        get: function () {
            return dP$1(this, 'a', {value: 7}).a;
        }
    })).a != 7;
}) ? function (it, key, D) {
    var protoDesc = gOPD$1(ObjectProto$1, key);
    if (protoDesc) delete ObjectProto$1[key];
    dP$1(it, key, D);
    if (protoDesc && it !== ObjectProto$1) dP$1(ObjectProto$1, key, protoDesc);
} : dP$1;

var wrap = function (tag) {
    var sym = AllSymbols[tag] = _objectCreate($Symbol[PROTOTYPE$2]);
    sym._k = tag;
    return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
    return typeof it == 'symbol';
} : function (it) {
    return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
    if (it === ObjectProto$1) $defineProperty(OPSymbols, key, D);
    _anObject(it);
    key = _toPrimitive(key, true);
    _anObject(D);
    if (_has(AllSymbols, key)) {
        if (!D.enumerable) {
            if (!_has(it, HIDDEN)) dP$1(it, HIDDEN, _propertyDesc(1, {}));
            it[HIDDEN][key] = true;
        } else {
            if (_has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
            D = _objectCreate(D, {enumerable: _propertyDesc(0, false)});
        }
        return setSymbolDesc(it, key, D);
    }
    return dP$1(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
    _anObject(it);
    var keys = _enumKeys(P = _toIobject(P));
    var i = 0;
    var l = keys.length;
    var key;
    while (l > i) $defineProperty(it, key = keys[i++], P[key]);
    return it;
};
var $create = function create(it, P) {
    return P === undefined ? _objectCreate(it) : $defineProperties(_objectCreate(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
    var E = isEnum.call(this, key = _toPrimitive(key, true));
    if (this === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return false;
    return E || !_has(this, key) || !_has(AllSymbols, key) || _has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
    it = _toIobject(it);
    key = _toPrimitive(key, true);
    if (it === ObjectProto$1 && _has(AllSymbols, key) && !_has(OPSymbols, key)) return;
    var D = gOPD$1(it, key);
    if (D && _has(AllSymbols, key) && !(_has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
    return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
    var names = gOPN$1(_toIobject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
        if (!_has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
    }
    return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
    var IS_OP = it === ObjectProto$1;
    var names = gOPN$1(IS_OP ? OPSymbols : _toIobject(it));
    var result = [];
    var i = 0;
    var key;
    while (names.length > i) {
        if (_has(AllSymbols, key = names[i++]) && (IS_OP ? _has(ObjectProto$1, key) : true)) result.push(AllSymbols[key]);
    }
    return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
    $Symbol = function Symbol() {
        if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
        var tag = _uid(arguments.length > 0 ? arguments[0] : undefined);
        var $set = function (value) {
            if (this === ObjectProto$1) $set.call(OPSymbols, value);
            if (_has(this, HIDDEN) && _has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
            setSymbolDesc(this, tag, _propertyDesc(1, value));
        };
        if (_descriptors && setter) setSymbolDesc(ObjectProto$1, tag, {configurable: true, set: $set});
        return wrap(tag);
    };
    _redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
        return this._k;
    });

    _objectGopd.f = $getOwnPropertyDescriptor;
    _objectDp.f = $defineProperty;
    _objectGopn.f = _objectGopnExt.f = $getOwnPropertyNames;
    _objectPie.f = $propertyIsEnumerable;
    _objectGops.f = $getOwnPropertySymbols;

    if (_descriptors && !_library) {
        _redefine(ObjectProto$1, 'propertyIsEnumerable', $propertyIsEnumerable, true);
    }

    _wksExt.f = function (name) {
        return wrap(_wks(name));
    };
}

_export(_export.G + _export.W + _export.F * !USE_NATIVE, {Symbol: $Symbol});

for (var es6Symbols = (
    // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
    'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;) _wks(es6Symbols[j++]);

for (var wellKnownSymbols = _objectKeys(_wks.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export(_export.S + _export.F * !USE_NATIVE, 'Symbol', {
    // 19.4.2.1 Symbol.for(key)
    'for': function (key) {
        return _has(SymbolRegistry, key += '')
            ? SymbolRegistry[key]
            : SymbolRegistry[key] = $Symbol(key);
    },
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: function keyFor(sym) {
        if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
        for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
    },
    useSetter: function () {
        setter = true;
    },
    useSimple: function () {
        setter = false;
    }
});

_export(_export.S + _export.F * !USE_NATIVE, 'Object', {
    // 19.1.2.2 Object.create(O [, Properties])
    create: $create,
    // 19.1.2.4 Object.defineProperty(O, P, Attributes)
    defineProperty: $defineProperty,
    // 19.1.2.3 Object.defineProperties(O, Properties)
    defineProperties: $defineProperties,
    // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: $getOwnPropertyNames,
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export(_export.S + _export.F * (!USE_NATIVE || _fails(function () {
    var S = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    // WebKit converts symbol values to JSON as null
    // V8 throws on boxed symbols
    return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
    stringify: function stringify(it) {
        var args = [it];
        var i = 1;
        var replacer, $replacer;
        while (arguments.length > i) args.push(arguments[i++]);
        $replacer = replacer = args[1];
        if (!_isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
        if (!_isArray(replacer)) replacer = function (key, value) {
            if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
            if (!isSymbol(value)) return value;
        };
        args[1] = replacer;
        return _stringify.apply($JSON, args);
    }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$2][TO_PRIMITIVE] || _hide($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag(_global.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var symbol = _core.Symbol;

var symbol$1 = createCommonjsModule(function (module) {
    module.exports = {"default": symbol, __esModule: true};
});

unwrapExports(symbol$1);

var _typeof_1 = createCommonjsModule(function (module, exports) {

    exports.__esModule = true;


    var _iterator2 = _interopRequireDefault(iterator$1);


    var _symbol2 = _interopRequireDefault(symbol$1);

    var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj;
    };

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {default: obj};
    }

    exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
        return typeof obj === "undefined" ? "undefined" : _typeof(obj);
    } : function (obj) {
        return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
    };
});

var _typeof = unwrapExports(_typeof_1);

var isEnum$1 = _objectPie.f;
var _objectToArray = function (isEntries) {
    return function (it) {
        var O = _toIobject(it);
        var keys = _objectKeys(O);
        var length = keys.length;
        var i = 0;
        var result = [];
        var key;
        while (length > i) if (isEnum$1.call(O, key = keys[i++])) {
            result.push(isEntries ? [key, O[key]] : O[key]);
        }
        return result;
    };
};

// https://github.com/tc39/proposal-object-values-entries

var $values = _objectToArray(false);

_export(_export.S, 'Object', {
    values: function values(it) {
        return $values(it);
    }
});

var values = _core.Object.values;

var values$1 = createCommonjsModule(function (module) {
    module.exports = {"default": values, __esModule: true};
});

var _Object$values = unwrapExports(values$1);

// 19.1.2.14 Object.keys(O)


_objectSap('keys', function () {
    return function keys(it) {
        return _objectKeys(_toObject(it));
    };
});

var keys = _core.Object.keys;

var keys$1 = createCommonjsModule(function (module) {
    module.exports = {"default": keys, __esModule: true};
});

var _Object$keys = unwrapExports(keys$1);

/**
 * Created by easterCat on 2018/1/22.
 */

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

function isArrayLike(collection) {
    var length = collection.length;
    return typeof length === "number" && length >= 0 && length <= MAX_ARRAY_INDEX;
}

/**
 * 判断是否是数组对象
 * @param obj
 * @returns {boolean}
 */
function isArray(obj) {
    if (Array.isArray) return Array.isArray(obj); else return type(obj) === "array";
}

/**
 * 返回一个对象可枚举属性组成的数组
 * @param obj
 * @returns {Array}
 */
function keys$2(obj) {
    if (!isObject(obj)) {
        return [];
    }
    if (_Object$keys) {
        return _Object$keys(obj);
    }
    var keys = [];

    for (var type in obj) {
        if (obj.hasOwnProperty(type)) {
            keys.push(type);
        }
    }

    return keys;
}

function values$2(obj) {
    if (isObject(obj)) {
        if (_Object$values) {
            return _Object$values(obj);
        }

        var _keys = keys$2(obj);
        var length = _keys.length;
        var result = [];

        for (var i = 0; i < length; i++) {
            result[i] = obj[_keys[i]];
        }

        return result;
    } else {
        return {};
    }
}

/**
 * 对象合并，将源对象复制到目标对象
 * @returns {*|{}}
 */
function extend() {
    var deep = false;
    var name, options, src, copy, clone, copyIsArray;
    var length = arguments.length;
    // 记录要复制的对象的下标,默认从1开始
    var i = 1;
    // 第一个参数不传布尔值的情况下，target默认是第一个参数
    var target = arguments[0] || {};
    // 如果target不是对象，我们是无法进行复制的，所以设为{}
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        //因为第一个下标是boolean，所有复制的对象下标从2开始
        i++;
    }
    // 如果target不是对象，我们是无法进行复制的，所以设为{}
    if ((typeof target === "undefined" ? "undefined" : _typeof(target)) !== "object" && !isFunction(target)) {
        target = {};
    }

    for (; i < length; i++) {
        options = arguments[i];
        if (options !== null) {
            for (name in options) {
                if (options.hasOwnProperty(name)) {
                    src = target[name]; // 要复制的对象的属性值
                    copy = options[name]; // 要复制的对象的属性值

                    // 解决循环引用
                    if (target === copy) {
                        continue;
                    }

                    // 要递归的对象必须是 plainObject 或者数组
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        target[name] = extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
    }
    return target;
}

function pick() {
}

/**
 * 判断是否为 DOM 元素
 * @param obj
 * @returns {boolean}
 */
function isElement(obj) {
    // 确保 obj 不是 null, undefined 等假值
    // 并且 obj.nodeType === 1
    return !!(obj && obj.nodeType === 1);
}

function isPlainObject(obj) {
    var proto,
        Ctor,
        newobj = {};
    // 排除掉明显不是obj的以及一些宿主对象如Window
    if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") {
        return false;
    }
    /**
     * getPrototypeOf es5 方法，获取 obj 的原型
     * 以 new Object 创建的对象为例的话
     * obj.__proto__ === Object.prototype
     */
    proto = _Object$getPrototypeOf(obj);
    // 没有原型的对象是纯粹的，Object.create(null) 就在这里返回 true
    if (!proto) return true;
    /**
     * 以下判断通过 new Object 方式创建的对象
     * 判断 proto 是否有 constructor 属性，如果有就让 Ctor 的值为 proto.constructor
     * 如果是 Object 函数创建的对象，Ctor 在这里就等于 Object 构造函数
     */
    Ctor = newobj.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    // 在这里判断 Ctor 构造函数是不是 Object 构造函数，用于区分自定义构造函数和 Object 构造函数
    return typeof Ctor === "function" && newobj.hasOwnProperty.toString.call(Ctor) === newobj.hasOwnProperty.toString.call(Object);
}

/**
 * 判断是否为对象,这里的对象包括 function 和 object
 * @param obj
 * @returns {boolean}
 */
function isObject(obj) {
    return _type(obj) === "object";
}

function isEmpty(obj) {
    return !!(obj && obj.nodeType === 1);
}

function isFunction(obj) {
    return _type(obj) === "function";
}

function isDate(obj) {
    return _type(obj) === "date";
}

function isError(obj) {
    return _type(obj) === "error";
}

function isString(obj) {
    return _type(obj) === "string";
}

function isArguments(obj) {
    return _type(obj) === "arguments";
}

function isNumber(obj) {
    return _type(obj) === "number";
}

function isRegExp(obj) {
    return _type(obj) === "regexp";
}

/**
 * Window 对象作为客户端 JavaScript 的全局对象，它有一个 window 属性指向自身
 * @param obj
 */
function isWindow(obj) {
    //如果ibj有一个window属性指向自身，说明是window对象
    return obj !== null && obj === obj.window;
}

var class2type = {};

"Boolean Number String Function Array Date RegExp Object Error Null Undefined".split(" ").forEach(function (item, index) {
    class2type["[object " + item + "]"] = item.toLowerCase();
});

function _type(obj) {
    if (obj === null) {
        return obj + "";
    }
    return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[Object.prototype.toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
}

var obj = /*#__PURE__*/Object.freeze({
    keys: keys$2,
    values: values$2,
    extend: extend,
    isElement: isElement,
    isArray: isArray,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isWindow: isWindow,
    isFunction: isFunction,
    isDate: isDate,
    isError: isError,
    isString: isString,
    isArguments: isArguments,
    isNumber: isNumber,
    isRegExp: isRegExp,
    isEmpty: isEmpty,
    pick: pick,
    isArrayLike: isArrayLike
});

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
                length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
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

        for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
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

var arr = /*#__PURE__*/Object.freeze({
    difference: difference,
    findIndex: findIndex,
    findLastIndex: findLastIndex,
    sortedIndex: sortedIndex,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    without: without,
    intersection: intersection
});

/**
 * Created by easterCat on 2018/1/24.
 */

/**
 * 函数防抖
 * @param func
 * @param wait
 * @param immediate
 * @returns {debounced}
 */
function debounce(func, wait, immediate) {
    var timeout, result;
    var debounced = function debounced() {
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
    var timeout, context, args;
    var previous_time = 0;
    if (!options) options = {};

    var later = function later() {
        //leading为false将初始时间设为0
        previous_time = options.leading === false ? 0 : Date.now();
        timeout = null;
        func.apply(func, args);
        if (!timeout) context = args = null;
    };

    var throttled = function throttled() {
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

var func = /*#__PURE__*/Object.freeze({
    debounce: debounce,
    throttle: throttle
});

function setCookie(key, val, time) {
    var date = new Date();
    var expiresDays = time;
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000); //格式化为cookie识别的时间
    document.cookie = key + "=" + val + ";expires=" + date.toGMTString();
}

function getCookie(key) {
    var getCookie = document.cookie.replace(/[ ]/g, "");
    var arrCookie = getCookie.split(";");
    var tips = void 0;
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (key === arr[0]) {
            tips = arr[1];
            break;
        }
    }
    return tips;
}

function removeCookie(key) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = key + "=v; expires =" + date.toGMTString();
}

var cookie = /*#__PURE__*/Object.freeze({
    setCookie: setCookie,
    getCookie: getCookie,
    removeCookie: removeCookie
});

function today(type) {
    var date = new Date();
    var seperater = "-";
    var year = date.getFullYear();
    var month = _patch_zero(date.getMonth() + 1);
    var day = _patch_zero(date.getDate());
    var time_arr = [year, seperater, month, seperater, day];

    return time_arr.join("");
}

function yesterday(type) {
    var date = new Date();
    var seperater = "-";
    var year = date.getFullYear();
    var month = _patch_zero(date.getMonth() + 1);
    var day = _patch_zero(date.getDate() - 1);
    var time_arr = [year, seperater, month, seperater, day];

    return time_arr.join("");
}

function _patch_zero(num) {
    return num < 0 ? "0" + num : num;
}

var time = /*#__PURE__*/Object.freeze({
    today: today,
    yesterday: yesterday
});

//https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
var ua = window.navigator.userAgent.toLowerCase();

function getBrowserInfo() {
    var browserName = void 0;
    var browserVersion = void 0;

    if (navigator) {
        if (ua.match(/msie/) != null || ua.match(/trident/) != null) {
            browserName = "IE";
            browserVersion = ua.match(/msie ([\d.]+)/) != null ? ua.match(/msie ([\d.]+)/)[1] : ua.match(/rv:([\d.]+)/)[1];
        } else if (ua.match(/micromessenger/) != null) {
            browserName = "微信";
        } else if (ua.match(/firefox/) != null) {
            browserName = "火狐";
        } else if (ua.match(/ubrowser/) != null) {
            browserName = "UC";
        } else if (ua.match(/opera/) != null) {
            browserName = "Opera";
        } else if (ua.match(/bidubrowser/) != null) {
            browserName = "百度";
        } else if (ua.match(/metasr/) != null) {
            browserName = "搜狗";
        } else if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
            browserName = "QQ";
        } else if (ua.match(/maxthon/) != null) {
            browserName = "遨游";
        } else if (ua.match(/chrome/) != null) {
            var is360 = this._mime("type", "application/vnd.chromium.remoting-viewer");
            if (is360) {
                browserName = "360";
            } else {
                browserName = "Chrome";
            }
        } else if (ua.match(/safari/) != null) {
            browserName = "Safari";
        }
    } else {
        browserName = "UnKnown";
    }

    console.group("浏览器信息");
    console.log("浏览器名称:", browserName);
    console.log("浏览器版本:", browserVersion);
    console.groupEnd();

    return browserName;
}

function inBrowser() {
    return typeof window !== "undefined";
}

function isWx() {
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/micromessenger/i)) {
        return true;
    } else {
        return false;
    }
}

var browser = /*#__PURE__*/Object.freeze({
    getBrowserInfo: getBrowserInfo,
    inBrowser: inBrowser,
    isWx: isWx
});

//判断是否是移动端
//https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

// mozilla/5.0 (linux; android 6.0; nexus 5 build/mra58n) applewebkit/537.36 (khtml, like gecko) chrome/72.0.3626.109 mobile safari/537.36
// Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Mobile Safari/537.36
var ua$1 = window.navigator.userAgent.toLocaleLowerCase();

function isMobile() {
    if (ua$1.match(/android/i) || ua$1.match(/webos/i) || ua$1.match(/iphone/i) || ua$1.match(/ipad/i) || ua$1.match(/ipod/i) || ua$1.match(/blackberry/i) || ua$1.match(/windows phone/i)) {
        return true;
    } else {
        return false;
    }
}

function isIphone() {
    if (ua$1.match(/iphone/i)) {
        return true;
    } else {
        return false;
    }
}

function isAndroid() {
    if (ua$1.match(/android/i)) {
        return true;
    } else {
        return false;
    }
}

var mobile = /*#__PURE__*/Object.freeze({
    isMobile: isMobile,
    isIphone: isIphone,
    isAndroid: isAndroid
});


var localStorage = /*#__PURE__*/Object.freeze({});

var $JSON$1 = _core.JSON || (_core.JSON = {stringify: JSON.stringify});
var stringify = function stringify(it) { // eslint-disable-line no-unused-vars
    return $JSON$1.stringify.apply($JSON$1, arguments);
};

var stringify$1 = createCommonjsModule(function (module) {
    module.exports = {"default": stringify, __esModule: true};
});

var _JSON$stringify = unwrapExports(stringify$1);

function initSession() {
    sessionStorage.clear();
}

function getSession(name) {
    if (sessionStorage.getItem(name)) {
        return JSON.parse(sessionStorage.getItem(name));
    }
}

function setSession(name, data) {
    var store = sessionStorage.getItem(name);
    if (store) {
        console.warn(name + "=>数据在sessionStorage已存在,执行替换操作");
        sessionStorage.removeItem(name);
    }
    sessionStorage.setItem(name, _JSON$stringify(data));
}

var sessionStorage$1 = /*#__PURE__*/Object.freeze({
    initSession: initSession,
    getSession: getSession,
    setSession: setSession
});

function MyDate() {
    this.date = this.getDate();
}

MyDate.prototype.getDate = function (date) {
    var date = date ? new Date(date) : new Date();

    //https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date
    return {
        year: date.getFullYear(), //年份
        month: date.getMonth() + 1, //月份的问题是值是0-11,所以+1
        day: date.getDate(), //日期
        quarter: Math.floor((date.getMonth() + 1) / 3), //季度
        weekday: date.getDay() + 1, //星期的问题是值是0-6,所以+1
        hour: date.getHours(), //时间,24小时
        halfhour: date.getHours - 12 > 0 ? date.getHours - 12 : 12, //时间,12小时
        quantum: date.getHours - 12 > 0 ? "pm" : "am", //时间段,上午和下午
        minute: date.getMinutes(), //分
        second: date.getSeconds(), //秒
        msecond: date.getMilliseconds(), //毫秒
        timestamp: date.getTime() //自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
    };
};

/**
 * 获取日期
 * @param {*} day
 */
MyDate.prototype.getDay = function (day) {
    var today = new Date();
    var targetDay = today.getTime() + 1000 * 60 * 60 * 24 * day;
    var targetDate = new Date().setTime(targetDay);
    var date = this.getDate(targetDate);
    var seperator = "-";
    var timearr = [date.year, seperator, this.patchZero(date.month), seperator, this.patchZero(date.day)];
    return timearr.join("");
};

/**
 * 获取今天
 * @param {} seperator
 */
MyDate.prototype.getToday = function (seperator) {
    return this.getDay(0);
};

/**
 * 获取昨天
 */
MyDate.prototype.getYesterday = function (seperator) {
    return this.getDay(-1);
};

/**
 * 获取近7天
 * @param {*} time
 */
MyDate.prototype.getNearSevenDay = function (seperator) {
    return this.getDay(-7);
};
/**
 * 获取近30天
 * @param {*} time
 */
MyDate.prototype.getNearThirtyDay = function (seperator) {
    return this.getDay(-30);
};

/**
 * 获取时间戳
 * @param {} time
 */
MyDate.prototype.timeStamp = function (time) {
    var d = time ? new Date(time).getTime() : new Date().getTime();
    return d;
};

/**
 * 函数执行的耗时
 * @param {} callback
 */
MyDate.prototype.elapsedTime = function (callback) {
    var start = new Date().getTime();
    callback && callback();
    var end = new Date().getTime();
    var elapsed = end - start;
    return elapsed;
};

/**
 * 如果月份,天数小于10,就在前面补0变成01,08这种形式
 * @param {传入月份,天数} num
 */
MyDate.prototype.patchZero = function (num) {
    return num >= 10 ? num : "0" + num;
};

var d = new MyDate();

var date = /*#__PURE__*/Object.freeze({
    d: d
});

//https://github.com/kennethjiang/js-file-download/blob/master/file-download.js
//https://developer.mozilla.org/zh-CN/docs/Web/API/Blob

function fileDownload(data, filename, mime) {
    var blob;
    if (/image/.test(mime)) {
        blob = _base64ToBlob(data);
    } else {
        blob = _dataToBlob(mime);
    }

    if (window.navigator.msSaveBlob) {
        // if browser is IE
        window.navigator.msSaveBlob(blob, filename); //filename文件名包括扩展名，下载路径为浏览器默认路径
    } else {
        var blobURL = window.URL.createObjectURL(blob);
        var aLink = document.createElement('a');
        aLink.style.display = 'none';
        aLink.href = blobURL;
        aLink.setAttribute('download', filename);
        if (!aLink.download) {
            aLink.setAttribute('target', '_blank');
        }
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
        window.URL.revokeObjectURL(blobURL);
    }
}

function _base64ToBlob(url) {
    //arr[0] : data:image/png;base64
    //arr[1] : iVBORw0KGgoAAAANSUhEUgAAAXIAAAKrCAYAAADs/Q......
    var arr = url.split(',');
    var bstr = atob(arr[1]);
    var mime = arr[0].match(/:(.*?);/)[1];
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

function _dataToBlob(mime) {
    return new Blob([data], {type: mime || 'application/octet-stream'});
}

/**
 * @Author : easterCat
 * @Date : 2019/3/21
 * @Last Modified by : easterCat
 * @Last Modified time : 2019/3/21
 */

/**
 * 重置当前元素节点
 * @param id
 */
function resetElement(id) {
    var element = _id(id);
    if (element) {
        var parentElement = element.parentNode;
        parentElement.removeChild(element);

        var newElement = document.createElement("div");
        newElement.setAttribute("id", id);
        parentElement.appendChild(newElement);
        return "reset";
    } else {
        return "new";
    }
}

function _id(id) {
    return document.getElementById(id);
}

/**
 * @Author : easterCat
 * @Date : 2019/3/21
 * @Last Modified by : easterCat
 * @Last Modified time : 2019/3/21
 */

//https://github.com/sudodoki/copy-to-clipboard
function copyText(text) {
    var range = document.createRange();
    var selection = document.getSelection();
    var mark = document.createElement('span');

    mark.textContent = text;
    mark.style.all = 'unset';
    mark.style.position = 'fixed';
    mark.style.top = "0px";
    mark.style.clip = 'rect(0, 0, 0, 0)';
    mark.style.whiteSpace = 'pre';
    mark.style.webkitUserSelect = 'text';
    mark.style.MozUserSelect = 'text';
    mark.style.msUserSelect = 'text';
    mark.style.userSelect = 'text';

    document.body.appendChild(mark);
    range.selectNode(mark);
    selection.addRange(range);
    var successful = document.execCommand('copy');
    if (!successful) {
        throw new Error('copy command was unsuccessful');
    }
}

var index = _Object$assign({}, arr, func, obj, cookie, time, browser, mobile, localStorage, sessionStorage$1, date, {fileDownload: fileDownload}, {resetElement: resetElement}, {copyText: copyText});

module.exports = index;
