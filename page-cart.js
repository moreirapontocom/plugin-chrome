window.onload = function() {

	if ( localStorage.getItem('AAA_checkout_method', '47716891804') !== undefined ) {

		var btn_buyNow = $('input[type="submit"].buy-now');
		if ( btn_buyNow.length > 0 )
			$( btn_buyNow ).click();

	}

}