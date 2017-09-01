chrome.runtime.sendMessage({ truo_action: 'button' });

chrome.storage.local.get('truoAction', function(action) {

	if ( action.truoAction == 'buyAllProductsInCart' ) {

		var btn_buyNow = $('input[type="submit"].buy-now');
		if ( btn_buyNow.length > 0 ) {

			chrome.storage.local.set({ truoAction: 'orderFulfilment' });
			$( btn_buyNow ).click();

		}

	}
});