# Advanced-Frontend/Daily-Interview-Question
[Daily-Interview-Question] Advanced-Frontend/Daily-Interview-Question: 我是木易杨，公众号「高级前端进阶」作者

## 2 parseInt
```javascript
// 第 2 题：['1', '2', '3'].map(parseInt) what & why ?
var new_array = arr.map(function callback(currentValue, index, array) {}); // Return element for new_array }[, thisArg])
parseInt(string, radix);

parseInt('1', 0) //radix为0时，且string参数不以“0x”和“0”开头时，按照10为基数处理。这个时候返回1
parseInt('2', 1) //基数为1（1进制）表示的数中，最大值小于2，所以无法解析，返回NaN
parseInt('3', 2) //基数为2（2进制）表示的数中，最大值小于3，所以无法解析，返回NaN

// parseInt 基数是一个介于2和36之间的整数 可能第二点这个说法不太准确

```

## 3 防抖和节流
防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行。

## 4 介绍下 Set、Map、WeakSet 和 WeakMap 的区别
