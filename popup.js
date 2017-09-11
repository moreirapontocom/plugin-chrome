function getCredentials() {

    var stored_credentials = localStorage.getItem('truo_ext_credentials'),
        credentials = document.getElementById('credentials'),
        anonymous = document.getElementById('anonymous'),
        name = document.getElementById('user_name'),
        email = document.getElementById('user_email');

    if ( credentials != undefined ) {

        stored_credentials = JSON.parse( stored_credentials );

        name.textContent = stored_credentials.name;
        email.textContent = stored_credentials.email;

        credentials.style.display = 'block';
        anonymous.style.display = 'none';

    }

}

document.addEventListener('DOMContentLoaded', function () {

    // var background = chrome.extension.getBackgroundPage();
    // background.popupSetUserInfos();

    getCredentials();

});