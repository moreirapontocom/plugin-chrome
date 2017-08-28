var proceed_to_cart = function() {

	setTimeout(function() {
		var btn_goToCart = $('body').find('.ui-add-shopcart-dialog a.ui-button');
		if ( btn_goToCart.length > 0 )
			$('.ui-add-shopcart-dialog a.ui-button').get(0).click();

		else proceed_to_cart();
	}, 1000);

}

window.onload = function() {

	var plugin_hash = window.location.hash;
	if ( plugin_hash == '#ee' ) {

		localStorage.setItem('AAA_checkout_method', '47716891804');

		$('#j-add-cart-btn').get(0).click();
		proceed_to_cart();

	}

}