# popupDismiss.js
> Help trigger your popup element and dismiss it anywhere.

## API
### Default logic
* Click the *"trigger" element* could toggle the *'target' element*'s show or not;
* Click the elements **outer** of 'target' element could trigger dismiss event; (data-dismiss-scope could custom this logic, but almost not.)
* Click the elements **inner** of 'target' element could trigger dismiss event; (data-popup-dismiss could custom trigger or not)

### API Table - Dom attribute
|State|data-[xxx]|value|description|
|---|---|---|---|
|*|data-toggle|popupDismiss|popupDismiss|This is plugin name.<br>The element which has this data attribute is the "trigger" element.|
|*|data-target|[selector]|This is the "target" (Modal) element's query selector.|
| |data-toggle-class|[class]|Using this class's style to control showing "target" element or not.|
| |data-popup-dismiss|[true/false]|Control the element which has this data attribute could trigger dismiss event or not|
| |data-popup-handler|[function name]|This handler function will be called when trigger popup.<br>Such as show/hide target in js or other logic.|
| |data-dismiss-handler|[function name]|This handler function will be called when trigger dismiss.<br>Such as show/hide target in js or other logic.|
| |data-dismiss-scope|[selector]|This attribute could designated the only scope where can trigger dismiss event.|

### API - JS function
```javascript
// 1. Instance for special element(s) or jQuery element(s);
popupDismiss(elements);
popupDismiss($elements);

// 2. Delegate on special element; Default on body
popupDismissDelegate(document.getElementById('containerId'));
```

## Usage in HTML
### [Demo Page: popupDismiss](https://gyx8899.github.io/YX-JS-ToolKit/popupDismiss/jsPlugin/index.html)
### Case 1. Normal modal popup:
*This case use class 'open' style to control modal display or not;*
```html
<button data-toggle="popupDismiss" 
	data-target="#modal" 
	data-toggle-class="open">
	Show Modal
</button>
<div id="modal">
	<div>Modal Title</div>
	<div>Modal Description</div>
</div>
```
### Case 2. Normal dropdown list popup
*This case need control "target" element's showing in handler function; (Also can use data-toggle-class)*
```html
<button data-toggle="popupDismiss" 
	data-target=".dropdown-list"
	data-popup-handler="popupHandler"
	data-dismiss-handler="dismissHandler">
	Dropdown list
</button>
//  1. data-popup-dismiss="false": Disable dismiss event when click on this element and all children elements;
//  2. data-popup-dismiss="true": Enable dismiss event when click on this element and all children elements;
<!--<ul class="dropdown-list" data-popup-dismiss="false">-->
<ul class="dropdown-list">
	<li>No.1</li>
	<li>No.2</li>
	<!--<li data-popup-dismiss="false">No.3</li>-->
	<!--<li data-popup-dismiss="true">No.3</li>-->
	<li>No.3</li>
	<li>No.4</li>
</ul>
```
#### Case 3. Normal multiple same dom and class target when need popup special one. 
```html
<div class="social-share">
	<div data-toggle="popupDismiss" 
		data-target="parent .social-share-popup"
		data-toggle-class="open">
		Share(popup share list)
	</div>
	<ul class="social-share-popup">
		<li>facebook</li>
		<li>twitter</li>
		<li>instagram</li>
	</ul>
</div>
<div class="social-share">
	<div data-toggle="popupDismiss" 
		data-target="parent .social-share-popup"
		data-toggle-class="open">
		Share(popup share list)
	</div>
	<ul class="social-share-popup">
		<li>facebook</li>
		<li>twitter</li>
		<li>instagram</li>
	</ul>
</div>
...
```

## Usage in JS
```javascript
//	1. To special items: these argument elements should already on document before this js script run;
popupDismiss(document.querySelectorAll('[data-toggle="popupDismiss"]'));
popupDismiss(document.querySelectorAll('.trigger-parent'));
popupDismiss(document.querySelectorAll('#tapId'));
popupDismiss(document.querySelector('[data-toggle="popupDismiss"]'));
popupDismiss($('[data-toggle="popupDismiss"]'));
popupDismiss($('.trigger-parent'));
popupDismiss($('#tapId'));

//	2. To all items on body: Support all static and dynamical added elements
popupDismiss();

//	3. To all subItems on one special container: Support all static and dynamical added elements
popupDismissDelegate(document.getElementById('containerId'));

```

## Attention
* IE >= 9

## License
[MIT][mit]


[mit]: http://opensource.org/licenses/MIT