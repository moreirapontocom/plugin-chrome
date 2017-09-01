chrome.runtime.sendMessage({ truo_action: 'button' });

function goBackToAliExpress() {

    setTimeout(function() {

        window.open('https://trade.aliexpress.com/orderList.htm', '_self');

    }, 2000);

}

window.onload = function() {

    chrome.storage.local.get('truoAction', function(action) {

        if ( action.truoAction == 'backToAliExpress' )
            goBackToAliExpress();

    });

}