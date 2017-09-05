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

	// When user come from Truo
	if ( action.truoAction == 'addToCart' ) {

		$('#j-add-cart-btn').get(0).click(); // Add this item to cart
		proceed_to_cart();

	} else {

		// When user come from other refer or is just navigating on Ali Express
		// Insert our plugin button to import into Truo's products list

		var body = $('body'),
			button = '<div class="truo-button-float" id="js-truo-button-float">' + 
						'<button type="button">T</button>' + 
					 '</div>';

		body.append( button );

		var buttonClick = document.getElementById('js-truo-button-float');

		buttonClick.addEventListener('click', function() {
			chrome.runtime.sendMessage({ truo_action: 'import_current' }, function(response) {

				if ( response.code == 200 )
					alert('Pronto!');

			});
		});

	}

});