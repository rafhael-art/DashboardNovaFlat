var urlListarEstadoActualFlota = baseUrl + "EstadoActualFlota/ListaConsultaVehiculos";
var urlListarClase = baseUrl + 'UnidadFlotaLima/GetClase';
var urlListarEstadoUnidad = baseUrl + 'ConsultaEstadoFlota/GetEstado';
var urlExportarXlsx = baseUrl + "EstadoActualFlota/ExportarExcel";
var tabla;
$(function () {
    fConfigTable();
    fComboClase();
    fComboEstadoUnidad();
    fTableEstadoActualFlota();
    fSelectRowDataTable();
});

function fConfigTable() {
    $.extend($.fn.dataTable.defaults, {

        language: { url: urlDatatableLanguage },
        pageLength: 10,

    });

}

function fSelectRowDataTable() {

    $('#tableEstadoActualFlota tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            tabla.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
}

function fTableEstadoActualFlota() {
    tabla = $('#tableEstadoActualFlota').DataTable({
        "bFilter": false,
        "bProcessing": true,
        "serverSide": false,
        "scrollCollapse": true,
        "scrollX": true,
        "ordering": false,
        "ajax": {
            "url": urlListarEstadoActualFlota,
            "type": "POST",
            "data": function (request) {
                request.filter = new Object();
                request.filter = {
                    Clase: $("#txtclase").val(),
                    PlacaInterna: $("#txtplaca").val(),
                    EstadoUnidad: $("#txtestado").val(),
                }
            }
        },
        "bAutoWidth": true,
        "columns": [
            { "data": "PlacaInterna" },
            { "data": "Marca" },
            { "data": "Modelo" },
            { "data": "Clase" },
            { "data": "Estado" },
            { "data": "FechaIngreso" },
            { "data": "HoraIngreso" },
            { "data": "KmIngresoTaller" },
            { "data": "KMProximoMantenimiento" },
            { "data": "MotivoInoperatividad" },
            { "data": "ObservacionesRetrasos" },
            { "data": "HoraSalida" },
            { "data": "FechaSalida" },
            { "data": "SalidaEstimada" }
        ]
    });
};

function fComboClase() {
    webApp.Ajax({
        url: urlListarClase,
        async: false
    }, function (response) {
        $("#txtclase").append('<option value="0">TODOS</option>');
        $.each(response.Data, function (index, item) {
            $("#txtclase").append('<option value="' + item.clase + '">' + item.clase + '</option>');
        });
        $("#txtclase").val("0");
    }, function (XMLHttpRequest, textStatus, errorThrown) {

    });
}

function fComboEstadoUnidad() {
    webApp.Ajax({
        url: urlListarEstadoUnidad,
        async: false
    }, function (response) {
        $("#txtestado").append('<option value="0">TODOS</option>');
        $.each(response.Data, function (index, item) {
            $("#txtestado").append('<option value="' + item.tarec_vdescripcion + '">' + item.tarec_vdescripcion + '</option>');
        });
        $("#txtestado").val("0");
    }, function (XMLHttpRequest, textStatus, errorThrown) {

    });
}

function fTableEstadoActualFlotaReload() {
    tabla.ajax.reload();
}


function fExpotarXlsx() {
    var param = "?clase=" + $("#txtclase").val() +
        "&placa=" + $("#txtplaca").val() +
        "&estado=" + $("#txtestado").val();

    location.href = urlExportarXlsx + param;
};
