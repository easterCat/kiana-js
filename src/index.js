import './index.html';

const _ = require('./kiana/Kiana');

var arr = [11, 22, 11, 3, 4, 5, 4, 3, 22, 11];
console.log(_.unique(arr));


var arr2 = [1, [5], [2, [3, 4]]];
console.log(_.flatten(arr2, false));

var arr3 = [1, 2, 3, 4, 5, 6, 7];
console.log(_.findIndex(arr3, function (item) {
    return item === 3;
}));
console.log(_.findLastIndex(arr3, function (item) {
    return item === 3;
}));

console.log(_.sortedIndex(arr3, 6));
console.log(_.indexOf(arr3, 3));

var obj = {
    a: {
        y: 3
    }
};

var obj2 = {
    c: 3
}

var obj3 = {
    d: 5,
    a: {
        u: 3
    }
}


console.log(_.pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age'));


