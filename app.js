let ipc = require('electron').ipcRenderer;
let urlencode = require('urlencode');

document.addEventListener('DOMContentLoaded',function() {
	const twHandler = document.getElementById('twitterId');
	const intrst = document.getElementById('interests');
	toggleAdvertising(true);
	getAdvertiseButton().addEventListener('click', function() {
		const button = getAdvertiseButton();
		if (button.dataset.advertise !== 'true') {
			ipc.send('stop-advertise');
			toggleAdvertising(true);
			return;
		}
		const value = twHandler.value.trim();
		var interests = intrst.value.trim();
		if (value) {
			interests = urlencode(interests);
			const cardUrl = `https://tengam.org/sociallighthouse?twitterId=${value}&interests=${interests}`;
			ipc.send('advertise', cardUrl);
			toggleAdvertising(false);
		}
	});

	function toggleAdvertising(enable) {
		const button = getAdvertiseButton();
		button.dataset.advertise = enable;
		twHandler.disabled = !enable;
		intrst.disabled = !enable;
		button.textContent = enable ? 'Broadcast' : 'Stop broadcast';
	}

	function getAdvertiseButton() {
		return document.getElementById('advertise');
	}

});
