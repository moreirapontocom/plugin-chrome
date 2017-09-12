function post_updates(updates) {

    chrome.storage.local.get('truo_ext_credentials', function(stored) {

        if ( stored.truo_ext_credentials ) {

            var data = new FormData(),
                xhr = new XMLHttpRequest(),
                is_local = false, // ENVIRONMENT SWITCH
                env = {
                    local: 'http://192.56.1.30/empreendaecommerce/api/public/v1/products/sync/',
                    prod: 'https://api.truo.com.br/v1/products/sync/'
                };

            data.append("token", stored.truo_ext_credentials.token );
            data.append("orders", JSON.stringify(updates) );

            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function () {
                if ( this.readyState === 4 ) {
                    console.log(this.responseText);
                }
            });

            ( is_local ) ?
                xhr.open("POST", env.local, true) :
                xhr.open("POST", env.prod, true);

            xhr.setRequestHeader("cache-control", "no-cache");
            xhr.send(data);

        }

    });

    next_page();

}

function next_page() {

    var pages = $('body').find('.ui-pagination.ui-pagination-front.ui-pagination-pager.util-right'),
        paginator = pages.find('.ui-label').html(),
        paginator_next = pages.find('.ui-pagination-next.ui-goto-page'),
        current_page,
        next_page,
        self;

    paginator = paginator.split('/'),
    current_page = parseInt( paginator[0] ),
    total_pages = parseInt( paginator[1] );

    if ( total_pages > current_page ) {

        chrome.storage.local.set({ is_sync_running: true });
        paginator_next.get(0).click();

    } else
        chrome.storage.local.set({ is_sync_running: false });

}

function find_products_in_this_page() {

    var products = $('body').find('.order-item-wraper'),
        self,
        updates = [];

    products.each(function() {
        self = $( this ),
        orderId = self.find('.order-info > .first-row > .info-body').html(),
        orderStatus = self.find('.order-body > .order-status > .f-left').html(),
        orderStatus = orderStatus.trim();

        updates.push({
            orderId: orderId,
            orderStatus: orderStatus
        });
    });

    post_updates(updates);
}

find_products_in_this_page();