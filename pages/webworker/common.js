function sendMessage()
{
	let inputElement = document.getElementById('inputLabel');
	mySharedWorker.postMessage({
		type: 'post',
		event: 'chat',
		message: inputElement.value
	});
	inputElement.value = '';
}

$("#inputLabel").keyup(function (ev) {
	// 13 is ENTER
	if (ev.which === 13)
	{
		sendMessage();
	}
});

// Util
function logInfo(output)
{
	let history = $('#logger').text();
	$('#logger').text(history + (history ? '\n' : '') + (new Date()).toLocaleTimeString() + ' -- ' + output);
	var textarea = document.getElementById('logger');
	textarea.scrollTop = textarea.scrollHeight;
}