function fill_shipping_fields() {

	var email = $('input[type="email"]'),
		name = $('input[name="contactPerson"]'),
		country = $('select[name="country"]'),
		address = $('input[name="address"]'),
		address2 = $('input[name="address2"]'),
		city = $('input[name="city"]'),
		province = $('input[name="province"]'),
		phoneCountry = $('input[name="phoneCountry"]'),
		mobileNo = $('input[name="mobileNo"]'),
		confirm = $('a.sa-confirm');

	if ( email.length > 0 ) {

		email.val('moreirapontocom@gmail.com');
		name.val('Lucas Moreira de Souza');
		// country.prop('');
		address.val('Rua Antônio Abrahao Caran');
		address2.val('820/510');
		city.val('Belo Horizonte');
		province.val('Minas Gerais');
		zip.val('31275-000');
		phoneCountry.val('31');
		mobileNo.val('983645656');

		// confirm.get(0).click();

	}

}

window.onload = function() {

	fill_shipping_fields();

}