let ipc = require('electron').ipcRenderer;
let urlencode = require('urlencode');

document.addEventListener('DOMContentLoaded',function() {
	toggleAdvertising(true);
	getAdvertiseButton().addEventListener('click', function() {
		const button = getAdvertiseButton();
		if (button.dataset.advertise !== 'true') {
			ipc.send('stop-advertise');
			toggleAdvertising(true);
			return;
		}
		const value = document.getElementById('twitterId').value.trim();
		var interests = document.getElementById('interests').value.trim();
		if (value && interests) {
			interests = urlencode(interests);
			const cardUrl = urlencode(`https://mozilla-magnet.github.io/sociallighthouse-cards/?twitterHandler=${value}&interests=${interests}`);
			const url = `https://tengam.org/oembed/?url=${cardUrl}&height=460&width=320`;
			ipc.send('advertise', url);
			toggleAdvertising(false);
		}
	});
});

function toggleAdvertising(enable) {
	const button = getAdvertiseButton();
	button.dataset.advertise = enable;
	button.textContent = enable ? 'Advertise' : 'Stop advertising';
}

function getAdvertiseButton() {
	return document.getElementById('advertise');
}
