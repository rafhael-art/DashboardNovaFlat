var urlConsultaEstadoFlota = baseUrl + 'UnidadFlotaLima/ListaConsultaVehiculos';
var urlListarClase = baseUrl + 'UnidadFlotaLima/GetClase';
var urlListarEstadoUnidad = baseUrl + 'ConsultaEstadoFlota/GetEstado';
var DataTableConsultaUnidadFlota = null;
var urlExportarXlsx = baseUrl + 'ConsultaEstadoFlota/Exportar_Xlsx';
var urlListarDepartamento = baseUrl + 'UnidadFlota/GetDepartamento';
var urlListarProvincia = baseUrl + 'UnidadFlota/GetProvincia';
var urlListarDistrito = baseUrl + 'UnidadFlota/GetDistrito';


var ConsultaEstadoFlota = function () {

    var eventos = function () {
        $("#btn-descagarXlsx").on("click", function () {
            var param = "?clase=" + $("#txtclase").val() +
                "&placa=" + $("#txtplaca").val() +
                "&txtestado=" + $("#txtestado").val() +
                "&departamento=" + $("#txtDepartamento").val() +
                "&provincia=" + $("#txtProvincia").val() +
                "&distrito=" + $("#txtDistrito").val() +
                "&evento=" + $("#txtNumEvento").val()

            location.href = urlExportarXlsx + param;

        });
    };

    var comboClase = function () {
        webApp.Ajax({
            url: urlListarClase,
            async: false
        }, function (response) {
            $("#txtclase").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#txtclase").append('<option value="' + item.clase + '">' + item.clase + '</option>');
            });
            $("#txtclase").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }


    var comboDepatamento = function () {
        webApp.Ajax({
            url: urlListarDepartamento,
            async: false,

        }, function (response) {
            $("#txtDepartamento").append('<option value="">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#txtDepartamento").append('<option value="' + item.ubicc_icod_ubicacion + '">' + item.ubicc_vnombre_ubicacion + '</option>');
            });
            $("#txtDepartamento").val("");

        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });

        $("#txtDepartamento").on('change', (e) => {

            var valorOpcion = $("#txtDepartamento option:selected").val();
            removeOptions(document.getElementById("txtProvincia"));
            comboProvincia();

        })
    }


    var comboProvincia = function () {

        var parametro = { cod: $("#txtDepartamento option:selected").val() };
        webApp.Ajax({
            url: urlListarProvincia,
            async: false,
            parametros: parametro
        }, function (response) {
            $("#txtProvincia").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#txtProvincia").append('<option value="' + item.ubicc_icod_ubicacion + '">' + item.ubicc_vnombre_ubicacion + '</option>');
            });
            $("#txtProvincia").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
        $("#txtProvincia").on('change', (e) => {

            var valorOpcion = $("#txtProvincia option:selected").val();
            removeOptions(document.getElementById("txtDistrito"));
            comboDistrito();

        })

    }

    var comboDistrito = function () {

        var parametro = { cod: $("#txtProvincia option:selected").val() };
        webApp.Ajax({
            url: urlListarDistrito,
            async: false,
            parametros: parametro
        }, function (response) {
            $("#txtDistrito").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#txtDistrito").append('<option value="' + item.ubicc_icod_ubicacion + '">' + item.ubicc_vnombre_ubicacion + '</option>');
            });
            $("#txtDistrito").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });


    }


    function removeOptions(selectbox) {
        var i;
        for (i = selectbox.options.length - 1; i >= 0; i--) {
            selectbox.remove(i);
        }
    }

    var comboEstadoUnidad = function () {
        webApp.Ajax({
            url: urlListarEstadoUnidad,
            async: false
        }, function (response) {
            $("#txtestado").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#txtestado").append('<option value="' + item.tarec_vdescripcion + '">' + item.tarec_vdescripcion + '</option>');
            });
            $("#txtestado").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    $("#btn-buscar").on("click", function () {
        checkSession(function () {
            DataTableConsultaUnidadFlota.ajax.reload();
        });
    });

    var ConfigurarDataTable = function () {

        $.extend($.fn.dataTable.defaults, {
            language: { url: urlDatatableLanguage },
            pageLength: 10,

        });
    };

    var visualizarDataTableConsultaUnidadFlota = function () {
        DataTableConsultaUnidadFlota = $('#DataTableConsultaUnidadFlota').DataTable({
            "bFilter": false,
            "bProcessing": true,
            "serverSide": false,
            "scrollCollapse": true,
            "scrollX": true,
            "ajax": {
                "url": urlConsultaEstadoFlota,
                "type": "POST",
                "data": function (request) {
                    request.filter = new Object();
                    request.filter = {
                        clase: $("#txtclase").val(),
                        placa: $("#txtplaca").val(),
                        estado: $("#txtestado").val(),
                        departamento: $("#txtDepartamento").val(),
                        provincia: $("#txtProvincia").val(),
                        distrito: $("#txtDistrito").val(),
                        evento: $("#txtNumEvento").val(),
                    }
                }
            },
            "bAutoWidth": true,
            "columns": [
                { "data": "NumEvento"},
                { "data": "PlacaInterna" },
                { "data": "Clase" },
                { "data": "Marca" },
                { "data": "Modelo" },
                { "data": "Estado" },
                { "data": "Ubicaciondepartamento" },
                { "data": "UbicacionProvincia" },
                { "data": "UbicacionDistrito" },
                { "data": "HoraIngreso" },
                { "data": "FechaIngreso" },
                { "data": "KmIngresoTaller" },
                { "data": "KMProximoMantenimiento" },
                { "data": "MotivoInoperatividad" },
                { "data": "ObservacionesRetrasos" },
                { "data": "FechaSalida" },
                { "data": "HoraSalida" },
                { "data": "SalidaEstimada" },
            ],
            /*"order": [[0, "ASC"]],*/
            "order": false,
            "fnDrawCallback": function (oSettings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
    };

    var select = function () {
        $(document).ready(function () {
            var table = $('#DataTableConsultaUnidadFlota').DataTable();

            $('#DataTableConsultaUnidadFlota tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                } else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });

            $('#button').click(function () {
                table.row('.selected').remove().draw(false);
            });
        })
    };

    return {
        init: function () {
            ConfigurarDataTable();
            checkSession(function () {
                visualizarDataTableConsultaUnidadFlota();
                comboClase();
                comboEstadoUnidad();
                select();
                comboDepatamento();
                comboProvincia();
                comboDistrito();
                eventos();
            });

        }
    }




}(jQuery);

function buscar(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) {
        //if ($('#UnidadFlotaForm').valid()) {
        checkSession(function () {
            DataTableConsultaUnidadFlota.ajax.reload();
        });
        //}
    }
}

function buscarHistorial(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) {
        //if ($('#UnidadFlotaForm').valid()) {
        checkSession(function () {
            DataTableConsultaUnidadFlota.ajax.reload();
        });
        //}
    }
}


