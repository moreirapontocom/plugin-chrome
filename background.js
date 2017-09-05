var serialize = function(obj) {
    var str = [];
    for ( var p in obj )
        if ( obj.hasOwnProperty(p) ) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

function post_to_api(params) {
    
    return new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest(),
            data = {
                token: params.token,
                product_url: params.product_url
            },
            data = serialize(data);
        xhr.open("POST", params.url, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {

            // var resp = JSON.parse(xhr.responseText);
            var response = JSON.parse(xhr.response);
            resolve(response);
            console.log('back: ', response.code);
            // if ( response.status == 200 )
                // sendResponse({ status: 200 });

        }
        // xhr.onreadystatechange = function() {
        //     if ( xhr.readyState == 4 ) {

        //         // JSON.parse does not evaluate the attacker's scripts.
        //         var resp = JSON.parse(xhr.responseText);
        //         if ( resp.code == 200 )
        //             sendResponse({ status: 200 });

        //     }
        // }
        xhr.send(data);

    });
}

chrome.runtime.onInstalled.addListener(function() {

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

                    // chrome.tabs.executeScript({ code: "alert('Sincronizou!')" });
                    chrome.tabs.executeScript({ file: "sync.js" });

                }

            } else if ( request.truo_action == 'import_current' ) {

                var xhr = new XMLHttpRequest(),
                    data = {
                        token: '8ee68f53571a0c7fb6867e3498f4aec78f5afe94',
                        product_url: sender.tab.url
                    },
                    data = serialize(data);
                xhr.open("POST", 'http://192.56.1.30/empreendaecommerce/api/public/v1/products/import', true);
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.send(data);
                sendResponse({ code: 200 });

            }
        }
    );

    // Listening for messages outside the extension
    chrome.runtime.onMessageExternal.addListener(
        function(request, sender, sendResponse) {

            // Response to check if plugin is installed
            if ( request.truo_action == 'has_plugin' ) { sendResponse({ status: "yes" }); }

            // Called on frontend > products:get:pending
            if ( request.truo_action == 'order_this' ) {

                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

                    chrome.storage.local.set({
                        truoAction: 'addToCart',
                        checkoutMessage: request.checkoutMessage,
                        buyer: {
                            name: request.buyer.name,
                            cpf: request.buyer.cpf,
                            email: request.buyer.email,
                            country: request.buyer.country,
                            address: request.buyer.address,
                            address2: request.buyer.address2,
                            city: request.buyer.city,
                            province: request.buyer.province,
                            zip: request.buyer.zip,
                            phoneCountry: request.buyer.phoneCountry,
                            mobileNo: request.buyer.mobileNo
                        }
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