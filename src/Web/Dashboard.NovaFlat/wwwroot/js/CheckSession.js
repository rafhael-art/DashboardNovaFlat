function checkSession(callback) {
    webApp.Ajax({
        url: baseUrl + "Login/VerifySession",
        async: false
    }, function (response) {
        callback();
    }, function (response) {

    }, function (XMLHttpRequest, textStatus, errorThrown) {

    });
}

function redireccionarLogin(titulo, mensaje) {
    setTimeout(function () {
        var urlLogin = baseUrl + 'Login/Index';
        window.location.href = urlLogin;
    }, 100);
}