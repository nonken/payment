!function(global){
	if (global.navigator && global.navigator.payment){ return; }

	var
		callbacks = {},
		body = document.body,
		payment = global.navigator.payment = {
			pay: function(amount, description, callb){
				var id = +new Date(); // pseudo unique
				sendPayment({
					amount: amount,
					description: description,
					id: id
				});

				callbacks[id] = callb;
			}
		}
	;

	// Messaging to extension
	var paymentEvent = document.createEvent('Event');
	paymentEvent.initEvent('payment', true, true);

	function sendPayment(obj) {
		paymentPort.innerText = JSON.stringify(obj || {});
		paymentPort.dispatchEvent(paymentEvent);
	}

	var paymentPort = document.createElement('div');
	paymentPort.setAttribute('id', 'payment-port');
	paymentPort.style.display = 'none';
	body.appendChild(paymentPort);

	// Messaging from extension
	var confirmationPort = document.createElement('div');
	confirmationPort.setAttribute('id', 'confirmation-port');
	confirmationPort.style.display = 'none';
	body.appendChild(confirmationPort);

	confirmationPort.addEventListener('confirmation', function(){
		var
			data = JSON.parse(this.innerText),
			callbId = data.transaction.id
		;

		callbacks[callbId] && callbacks[callbId](!data.success, data.transaction);
	});

}(window);
