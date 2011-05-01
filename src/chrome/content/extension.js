!function(){
	chrome.extension.onConnect.addListener(function(port){
		var script = document.createElement('script');
		script.src = chrome.extension.getURL('content/api.js');
		document.body.appendChild(script);

		// Connect to payment port
		script.onload = function(){
			var confirmationEvent = document.createEvent('Event');
			confirmationEvent.initEvent('confirmation', true, true);

			var confirmationPort = document.getElementById('confirmation-port');

			var paymentPort = document.getElementById('payment-port');
			paymentPort.addEventListener('payment', function(){
				port.postMessage(JSON.parse(this.innerText));
			});

			port.onMessage.addListener(function(obj){
				confirmationPort.innerText = JSON.stringify(obj || {});
				confirmationPort.dispatchEvent(confirmationEvent);
			})
		};
	});
}();
