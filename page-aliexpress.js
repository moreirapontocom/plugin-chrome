chrome.runtime.sendMessage({ truo_action: 'button' });

function create_sync_bar() {

    chrome.storage.local.get('truo_ext_credentials', function(stored) {

        if ( stored.truo_ext_credentials ) {

            var stored_credentials = stored.truo_ext_credentials.token,
                ali_box = $('.col-xs-60 > .grid-col-container:nth-child(4) .me-ui-box'),
                truo_sync_bar = '<div class="truo-sync-bar">' +
                                    '<div class="text">' +
                                        'Truo' +
                                        '<span>&raquo; <a href="https://app.truo.com.br/?utm_source=aliexpress-orders" target="_blank">app.truo.com.br</a></span>' +
                                    '</div>' +
                                    '<button type="button" class="btn-primary" id="js-truo-sync-orders">Sincronizar pedidos</button>' +
                                '</div>';

            ali_box.prepend( truo_sync_bar );

            // Ask extension to sync

            var syncButton = document.getElementById('js-truo-sync-orders');
            syncButton.addEventListener("click", function() {

                chrome.runtime.sendMessage({ truo_action: 'sync_orders' });

            }, false);

            chrome.storage.local.get('is_sync_running', function(action) {
                if ( action.is_sync_running == true ) {
                    $('#js-truo-sync-orders').trigger('click');
                }
            });

        }

    });

}

// window.onload = function() {

    create_sync_bar();

// }