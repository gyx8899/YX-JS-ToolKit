## JS-Tips

### JS functions
* arguments.callee
> The 5th edition of ECMAScript (ES5) forbids use of arguments.callee() in strict mode. Avoid using arguments.callee() by either giving function expressions a name or use a function declaration where a function must call itself.

[arguments.callee - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments/callee)

* el.matches/matchesSelector not fully support in IE 11
> 对于不支持 Element.matches() 或Element.matchesSelector()，但支持document.querySelectorAll()方法的浏览器，存在以下替代方案

```javascript
if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.matchesSelector || 
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector || 
        Element.prototype.oMatchesSelector || 
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;            
        };
}
```
[Element.matches()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/matches)

#### Demo case:
```javascript
// PopupDismiss JS Plugin
function findAncestor (el, sel) {
	while ((el = el.parentElement) && !matches(el, sel)) {}
	return el;
}

function matches (el, selector) {
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
}
```

### JS 
```javascript
// NodeList to array
[].slice.call(document.querySelectorAll('div'));
Array.prototype.slice.call(document.querySelectorAll('div'));
```