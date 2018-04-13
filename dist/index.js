'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arrays = require('./src/kiana/arrays');

var arr = _interopRequireWildcard(_arrays);

var _functions = require('./src/kiana/functions');

var func = _interopRequireWildcard(_functions);

var _objects = require('./src/kiana/objects');

var obj = _interopRequireWildcard(_objects);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var kiana = Object.assign({}, arr, func, obj); /**
                                                * Created by easterCat on 2018/4/13.
                                                */

exports.default = kiana;
//# sourceMappingURL=index.js.map