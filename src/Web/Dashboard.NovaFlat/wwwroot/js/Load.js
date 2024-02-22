var load = function () {
    var pageBlocked = false;
    var handlerActivo = false;

    $(document).ready(function () {
            $(document).ajaxSend(function () {
                if (!pageBlocked) {
                  
                    $(".loader").css("display", "");
                    pageBlocked = true;
                }
            }).ajaxStop(function () {
                $(".loader").css("display", "none");
                pageBlocked = false;
            });

    });

    var onload = function () {

    }

    return {
        init: function () {
        },
        onload: function () {
            window.onload = function () {
                $(".loader").css("display", "");
            }
        }
    }
}(jQuery);