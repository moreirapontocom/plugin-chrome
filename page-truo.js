// This page matches on app.truo.com

window.onload = function() {
    chrome.runtime.sendMessage({ truo_action: 'button' });
};