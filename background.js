function check_credentials() {
    var credentials = localStorage.getItem('truo_ext_credentials');
    if ( credentials != undefined ) return true;
    else return false;
}

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

                if ( check_credentials() ) {

                    var regex = new RegExp('https://trade.aliexpress.com/');
                    if ( regex.test( sender.tab.url ) ) {

                        // sendResponse({ status: "I will" });

                        // chrome.tabs.executeScript({ code: "alert('Sincronizou!')" });
                        chrome.tabs.executeScript({ file: "sync.js" });

                    }

                }

            } else if ( request.truo_action == 'import_current' ) {

                if ( check_credentials() ) {

                    var stored_token = localStorage.getItem('truo_ext_credentials'),
                        stored_token = JSON.parse( stored_token );

                    //
                    // Remember to change the environment switch
                    //

                    var xhr = new XMLHttpRequest(),
                        the_product_url = sender.tab.url,
                        data = {
                            token: stored_token.token,
                            product_url: the_product_url
                        },
                        data = serialize(data),
                        is_local = false, // ENVIRONMENT SWITCH
                        env = {
                            local: 'http://192.56.1.30/empreendaecommerce/api/public/v1/products/import',
                            prod: 'https://api.truo.com.br/v1/products/import'
                        };

                    // ( is_local ) ?
                    //     xhr.open("POST", env.local, true) :
                    //     xhr.open("POST", env.prod, true);

                    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    // xhr.send(data);

                    sendResponse({
                        code: 200,
                        product_url: the_product_url
                    });

                }

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

                    var user = {
                        token: request.user.token,
                        name: request.user.name,
                        email: request.user.email
                    }
                    localStorage.setItem('truo_ext_credentials', JSON.stringify(user));

                    chrome.storage.local.set({
                        truoAction: 'addToCart',
                        checkoutMessage: request.checkoutMessage,
                        truo_ext_credentials: JSON.stringify(user),
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

            if ( request.truo_action == 'logout' ) {

                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

                    var user = {
                        token: request.user.token,
                        name: request.user.name,
                        email: request.user.email
                    }
                    localStorage.removeItem('truo_ext_credentials');

                    chrome.storage.local.clear();

                });

            }

        }
    );

});

/*
function popupSetUserInfos() {

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

    });

}
*/