var proceed_to_cart = function() {

	setTimeout(function() {
		var btn_goToCart = $('body').find('.ui-add-shopcart-dialog a.ui-button');
		if ( btn_goToCart.length > 0 )
			$('.ui-add-shopcart-dialog a.ui-button').get(0).click();

		else proceed_to_cart();
	}, 1000);

}

window.onload = function() {

	chrome.runtime.sendMessage({ truo_action: 'button' });
	chrome.storage.local.get('truoAction', function(action) {

	    if ( action.truoAction == 'addToCart' ) {

			$('#j-add-cart-btn').get(0).click();
			// proceed_to_cart();
			alert('Go shopping!!');

		}
	});

}