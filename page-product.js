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

function import_current() {

	chrome.runtime.sendMessage({ truo_action: 'import_current' }, function(response) {
		if ( response.code == 200 ) {

			// Socket connection
			var socket = io.connect('https://app.truo.com.br:8080'),
				stored_token = localStorage.getItem('truo_ext_credentials');
			
			stored_token = JSON.parse( stored_token );
			console.log('page-product.js > import_current() > token: ', stored_token);

			socket.emit('should_update_products', {
				userToken: stored_token.token,
				product_url: response.product_url
			});
			// end Socket connection

			$('.truo-button-float')
				.removeClass('disabled')	
				.addClass('success')
				.find('div')
					.css('visibility', 'visible')
					.parent()
				.find('button')
					.addClass('emoji')	
					.html('&#x1F44D;')
					.off('click');

		}
	});

}

function get_button_importer() {
	var shipping_infos = $('body').find('#j-product-operate-wrap'),
		shipping_to = shipping_infos.find('#j-shipping-country'),
		shipping_company = shipping_infos.find('#j-shipping-company')
		button_class_warning = 'warning';

	if ( shipping_infos.length > 0 && shipping_to.html() == 'Brazil' && shipping_company.html() == 'China Post Registered Air Mail' )
		button_class_warning = '';

	var body = $('body'),
		button = '<div class="truo-button-float ' + button_class_warning + '" id="js-truo-button-float">' + 
					'<div>Produto Importado!</div>' +
					'<button type="button">T</button>' + 
				'</div>',
		buttonClick;

	body.append( button );

	buttonClick = document.getElementById('js-truo-button-float');
	buttonClick.addEventListener('click', function() {

		var button_area = $('.truo-button-float');

		button_area.addClass('disabled');

		if ( button_area.hasClass('warning') ) {
			if ( confirm('Parece que este produto não é entregue pelo China Air Post Mail.\nTem certeza?') )
				import_current();
		} else
			import_current();

	});
}

window.onload = function() {

	chrome.storage.local.get('truoAction', function(action) {

		// When user come from Truo
		if ( action.truoAction == 'addToCart' ) {

			$('#j-add-cart-btn').get(0).click(); // Add this item to cart
			proceed_to_cart();

		} else {

			// When user come from other refer or is just navigating on Ali Express
			// Insert our plugin button to import into Truo's products list

			// First: check if user is logged into Truo
			chrome.storage.local.get('truo_ext_credentials', function(stored) {
				get_button_importer();
			});

		}

	});

}