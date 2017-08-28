function fill_shipping_fields() {

	var email = $('input[name="email"]'),
		name = $('input[name="contactPerson"]'),
		country = $('select[name="country"] option[value="BR"]'),
		address = $('input[name="address"]'),
		address2 = $('input[name="address2"]'),
		city = $('input[name="city"]'),
		province = $('select[name="province"]'),
		zip = $('input[name="zip"]'),
		phoneCountry = $('input[name="phoneCountry"]'),
		mobileNo = $('input[name="mobileNo"]'),
		confirm = $('a.sa-confirm');

	var page = $('#page');

	if ( page.length > 0 ) {

		country.prop('selected', true);

		email.val('moreirapontocom@gmail.com');
		name.val('Lucas Moreira de Souza');
		address.val('Rua Antonio Abrahao Caran')
		address2.val('820/510');
		city.val('Belo Horizonte');
		zip.val('31275-000');
		phoneCountry.val('31');
		mobileNo.val('983645656');

		$('.sa-province-wrapper').find('select').append('<option value="Minas Gerais" selected="selected">Minas Gerais</option>');

		confirm.get(0).click();

		orderReview();

	}

}

function orderReview() {

	if ( $('body').find('.p-message').length > 0 ) {

		var msg = 'Aqui tem uma mensagem para o vendedor XYZ';

		$('body').find('.p-message').each(function() {
			$(this).find('textarea').val( msg ).html( msg );
		});

		setPaymentMethod();

	} else
		setTimeout('orderReview', 2000);

}

function setPaymentMethod() {

	if ( $('body').find('input[type="radio"][value="2"][payment-option="OTHER"][name="paymentType"]').length > 0 ) {

		$('.other-payment-item label').click();
		$('input[type="radio"][value="2"][payment-option="OTHER"][name="paymentType"]').prop('checked', true);

		$('#place-order-btn').click();

	} else
		setTimeout('setPaymentMethod', 2000);

}

window.onload = function() {

	if ( localStorage.getItem('AAA_checkout_method_cpf') !== undefined )
		fill_shipping_fields();

}