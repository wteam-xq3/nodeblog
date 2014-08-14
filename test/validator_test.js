// 测试 validator 3.x 模块(版本3是大改版本)
var validator = require('validator');

// XSS 过滤 已被移除
var o_str = 'the whitespace will disappeart';
var v_result = validator.trim(o_str, 't');
// var v_result2 = validator.trim(o_str, 't').xss();

console.log(o_str);
console.log(v_result);
// console.log(v_result2);