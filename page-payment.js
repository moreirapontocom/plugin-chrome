function setPaymentMethod() {

	if ( $('li[data-channel-name="BOLETO"]').length > 0 ) {

		$('ul.channel-tab').find('li.j-channel-item').each(function() {
			$(this).removeClass('channel-active');
		});
		$('li[data-channel-name="BOLETO"]').addClass('channel-active').get(0).click();

		$('input[name="cpf"]').val( localStorage.getItem('AAA_checkout_method') );
		$('#j-paynow').click();

	} else
		setTimeout('setPaymentMethod', 2000);

}

window.onload = function() {

	if ( localStorage.getItem('AAA_checkout_method') !== undefined )
		setPaymentMethod();

}