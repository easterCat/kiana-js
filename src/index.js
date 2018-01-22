import './index.html';

const _ = require('./kiana/Kiana');

var arr = [11, 22, 11, 3, 4, 5, 4, 3, 22, 11];
console.log(_.unique(arr));


var arr2 = [1, [2, [3, 4]]];
console.log(_.flatten(arr2, false, true));

