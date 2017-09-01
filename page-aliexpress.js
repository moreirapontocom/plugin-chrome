chrome.runtime.sendMessage({ truo_action: 'button' });

function create_sync_bar() {

    var ali_box = $('.col-xs-60 > .grid-col-container:nth-child(4) .me-ui-box'),
        truo_sync_bar = '<div class="truo-sync-bar">' +
                            '<div class="text">' +
                                'Truo' +
                                '<span>&raquo; <a href="https://app.truo.com.br/?utm_source=aliexpress-orders" target="_blank">app.truo.com.br</a></span>' +
                            '</div>' +
                            '<button type="button" class="btn-primary" id="js-truo-sync-orders">Sincronizar vendas</button>' +
                        '</div>';

    ali_box.prepend( truo_sync_bar );

    // Ask extension to sync

    var syncButton = $('#js-truo-sync-orders');
    syncButton.addEventListener("click", function() {

        chrome.runtime.sendMessage({ truo_action: 'sync_orders' }, function(response) {
            console.log(response.status);
        });

    }, false);

}

window.onload = function() {

    create_sync_bar();

}