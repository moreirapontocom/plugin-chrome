chrome.runtime.onInstalled.addListener(function() {

    /*
    chrome.tabs.query({ 'active': true }, function(tab) {

        var match = 'https://trade.aliexpress.com/';
            regex = new RegExp( match ),
            current_tab = tab[0];

        if ( regex.test( current_tab.url ) )
            console.log('achou');

        // chrome.tabs.executeScript(null, {
        //     file: "content_script.js"
        // });
    });
    */

    /*
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api.example.com/data.json", true);
    xhr.onreadystatechange = function() {
        if ( xhr.readyState == 4 ) {
            // JSON.parse does not evaluate the attacker's scripts.
            var resp = JSON.parse(xhr.responseText);
        }
    }
    xhr.send();
    */

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {

            // Check if user is logged in on extension

            // Enable the action button on browser
            if ( request.truo_action == 'button' ) { chrome.pageAction.show( sender.tab.id ); }

            if ( request.truo_action == 'orders' ) {
                sendResponse({ status: "Start to order, Sr!" });
            }

            if ( request.truo_action == 'sync_orders' ) {

                var regex = new RegExp('https://trade.aliexpress.com/');
                if ( regex.test( sender.tab.url ) ) {
                    sendResponse({ status: "I will" });

                    chrome.tabs.executeScript({ code: "alert('Sincronizou!')" });

                }

            }
        }
    );

    // Listening for messages outside the extension (background or pages)
    chrome.runtime.onMessageExternal.addListener(
        function(request, sender, sendResponse) {

            // Response to check if plugin is installed
            if ( request.truo_action == 'has_plugin' ) { sendResponse({ status: "yes" }); }

            // Called on frontend > products:get:pending
            if ( request.truo_action == 'order_this' ) {

                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

                    chrome.storage.local.set({
                        truoAction: 'addToCart',
                        buyerName: request.buyerName,
                        buyerCPF: request.buyerCPF,
                        buyerEmail: request.buyerEmail,
                    });

                    chrome.tabs.create({
                        url: request.product,
                        active: true
                    });

                });

            }

        }
    );

});