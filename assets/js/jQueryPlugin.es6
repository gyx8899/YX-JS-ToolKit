(function (root, factory, plug) {
	return factory(root.jQuery, plug);
})(window, function ($, plug) {
	$.fn[plug] = function () {
		let $fields = this.find('input');
		$fields.on('keyup', function () {
			console.log('aaaaa');
		});
	}
}, 'dnValidator');