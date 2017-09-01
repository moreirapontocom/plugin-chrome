chrome.runtime.sendMessage({ truo_action: 'button' });

var proceed_to_cart = function() {

	setTimeout(function() {

		var btn_goToCart = $('body').find('.ui-add-shopcart-dialog a.ui-button'); // Find the "Added to cart" modal
		if ( btn_goToCart.length > 0 ) {

			// Just setting up the next plugin action
			// This will help me to get back when more than one product should be bought
			chrome.storage.local.set({ truoAction: 'buyAllProductsInCart' });

			// Click to open the cart
			// This modal has two buttons.
			// The first one (which is clicked below) is an A tag
			// The second one is a button tag
			$('.ui-add-shopcart-dialog a.ui-button').get(0).click();

		} else proceed_to_cart();

	}, 1000);

}

chrome.storage.local.get('truoAction', function(action) {

console.log(action.truoAction);

	if ( action.truoAction == 'addToCart' ) {

		$('#j-add-cart-btn').get(0).click(); // Add this item to cart
		proceed_to_cart();

	}

});