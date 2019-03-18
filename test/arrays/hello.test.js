// const chai = require("chai"); //引入断言库
// const expect = require("chai.expect"); //使用expect语法
// const k = require("../../index");

// describe("对数组的方法进行测试", function() {
//     describe("现在要测XX功能", function() {
//         console.log(flatten);
//         it("某个变量的值应该是数字", function() {
//             //写断言
//             var color = flatten.unique([1, 2, 2, 2, 3, 3, 3, 3, 4]);
//             expect(color).is.not.empty;
//         });
//     });
//     describe("现在要测YY功能", function() {
//         it("某个数组长度应该不小于10", function() {
//             //写断言
//         });
//     });
// });

describe("测试reverse方法", function() {
    it("基本使用", function() {
        expect("DCBA").toEqual(reverse("ABCD"));
    });
});
