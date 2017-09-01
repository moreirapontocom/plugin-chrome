chrome.runtime.sendMessage({ truo_action: 'button' });

function fill_shipping_fields() {

	chrome.storage.local.get('buyer', function(buyer) {

		var customer = buyer.buyer,
			email = $('input[name="email"]'),
			name = $('input[name="contactPerson"]'),
			country = $('select[name="country"]'),
			address = $('input[name="address"]'),
			address2 = $('input[name="address2"]'),
			city = $('input[name="city"]'),
			province = $('select[name="province"]'),
			province_txt = $('input[name="province"]'),
			zip = $('input[name="zip"]'),
			phoneCountry = $('input[name="phoneCountry"]'),
			mobileNo = $('input[name="mobileNo"]'),
			cpf = $('input[name="cpf"]'),
			cpf_onlyNumbers = customer.cpf,
			confirm = $('a.sa-confirm'),
			page = $('#page');

		if ( page.length > 0 ) {

			email.val( customer.email );
			name.val( customer.name );
			country.val( customer.country ).trigger('change');
			address.val( customer.address )
			address2.val( customer.address2 );
			city.val( customer.city );
			zip.val( customer.zip );
			phoneCountry.val( customer.phoneCountry );
			mobileNo.val( customer.mobileNo );

			cpf_onlyNumbers = cpf_onlyNumbers.replace(/\D/g,'');
			cpf.val( cpf_onlyNumbers );

			$('.sa-province-wrapper')
				.find('select')
					.prepend('<option value="' + customer.province + '" selected="selected">' + customer.province + '</option>')
					.parent()
				.find('input')
					.val( customer.province );

			confirm.get(0).click();
			orderReview();

		}

	});

}

function orderReview() {

	chrome.storage.local.get('checkoutMessage', function(msg) {

		if ( $('body').find('.item-product').length > 0 ) {

			var msg = msg.checkoutMessage;

			$('body').find('.item-product').each(function() {

				// Fill the custom note to seller
				$(this).find('textarea').val( msg ).html( msg );

				// Select the shipping method
				// The default method is China Post Air Mail (CPAM) but it could be changed.
				$(this).find('input[type="radio"][value="CPAM"]').prop('checked', true);

			});

			setPaymentMethod();

		} else
			setTimeout('orderReview', 2000);

	});

}

function setPaymentMethod() {

	if ( $('body').find('input[type="radio"][value="2"][payment-option="OTHER"][name="paymentType"]').length > 0 ) {

		// Set the payment method
		// Will use only BILLET (other methods) method for now
		$('.other-payment-item label').click();
		$('input[type="radio"][value="2"][payment-option="OTHER"][name="paymentType"]').prop('checked', true);

		chrome.storage.local.set({ truoAction: 'generateBillet' });
		$('#place-order-btn').click();

	} else
		setTimeout('setPaymentMethod', 2000);

}

window.onload = function() {

	chrome.storage.local.get('truoAction', function(action) {

		if ( action.truoAction == 'orderFulfilment' )
			fill_shipping_fields();

	});

}