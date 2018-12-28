var chai = require('chai');//引入断言库
var expect = chai.expect;//使用expect语法
var index = require('../index');

describe('我现在要测某一个页面的几个功能', function () {
    describe('现在要测XX功能', function () {
        it('某个变量的值应该是数字', function () {
            //写断言
            var color = index.unique([1, 2, 2, 2, 3, 3, 3, 3, 4]);
            expect(color).is.not.empty;
        })
    });
    describe('现在要测YY功能', function () {
        it('某个数组长度应该不小于10', function () {
            //写断言
        })
    });
})
