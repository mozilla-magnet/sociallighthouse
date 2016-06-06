let ipc = require('electron').ipcRenderer;

document.addEventListener('DOMContentLoaded',function() {
	document.getElementById('advertise').addEventListener('click', function() {
		const value = document.getElementById('twitterId').value.trim();
		if (value) {
			ipc.send('advertise', 'https://twitter.com/' + value, 'rest of params');
		}
	});
});
