chrome.runtime.sendMessage({ truo_action: 'button' });

function setPaymentMethod() {

	chrome.storage.local.get('buyer', function(buyer) {

		if ( $('li[data-channel-name="BOLETO"]').length > 0 ) {

			var cpf_onlyNumbers = buyer.buyer.cpf;

			$('ul.channel-tab').find('li.j-channel-item').each(function() {
				$(this).removeClass('channel-active');
			});
			$('li[data-channel-name="BOLETO"]').addClass('channel-active').get(0).click();

			cpf_onlyNumbers = cpf_onlyNumbers.replace(/\D/g,'');
			$('input[name="cpf"]').val( cpf_onlyNumbers );

			chrome.storage.local.set({ truoAction: 'backToAliExpress' });
			$('#j-paynow').click();

		} else
			setTimeout('setPaymentMethod', 2000);

	});

}

window.onload = function() {

	chrome.storage.local.get('truoAction', function(action) {

		if ( action.truoAction == 'generateBillet' )
			setPaymentMethod();

	});

}