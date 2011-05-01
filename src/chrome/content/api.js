!function(global){
	if (global.navigator && global.navigator.payment){ return; }

	var
		callbacks = {},
		body = document.body,
		payment = global.navigator.payment = {
			make: function(obj, callb){
				if (verified('make', obj)){
					var id = +new Date(); // pseudo unique
					pass({
						type: 'make',
						obj: obj,
						id: id
					});
					callbacks[id] = callb;
				}
			},
			made: function(obj, callb){
				if (verified('made', obj)){
					// TODO: factor out double new Dates and stuff.
					var id = +new Date(); // pseudo unique
					pass({
						type: 'made',
						obj: obj,
						id: id
					});
					callbacks[id] = callb;
				}
			},
			subscribe: function(){

			},
			subscribed: function(){

			}
		}
	;

	// Messaging to extension
	var paymentEvent = document.createEvent('Event');
	paymentEvent.initEvent('payment', true, true);

	function pass(obj) {
		paymentPort.innerText = JSON.stringify(obj || {});
		paymentPort.dispatchEvent(paymentEvent);
	}

	function verified(type, obj){
		function verify(arr){
			if (typeof obj === 'undefined'){
				throw new Error('No payment info provided');
				return false;
			}

			arr.forEach(function(key){
				if (!obj[key]){
					throw new Error('Property ' + key + ' is required for payment processing/checking');
					return false;
				}
			});
			return true;
		}

		switch (type){
			case 'make':
				return verify(['amount', 'description', 'item']);
			case 'made':
				return verify(['item']);
		}
		return false;
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
