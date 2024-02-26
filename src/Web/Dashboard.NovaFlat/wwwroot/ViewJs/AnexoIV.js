var urlListarAnexoIV = baseUrl + 'AnexoIV/Lista';
var urlExportarXlsx = baseUrl + 'AnexoIV/Exportar_Xlsx';
var urlExportarXls = baseUrl + 'AnexoIV/Exportar_Xls';
var urlListarLocalidad = baseUrl + 'UnidadFlota/GetLocalidad';
var urlListarUbicacion = baseUrl + 'UnidadFlota/GetUbicacion';
var urlListarClase = baseUrl + 'UnidadFlota/GetClase';
var urlListarEstadoUnidad = baseUrl + 'UnidadFlota/GetEstadoUnidad';
var urlListarMarca = baseUrl + 'UnidadFlota/GetMarca';
var urlListarModelo = baseUrl + 'UnidadFlota/GetModelo';
var urlValidarStorage = baseUrl + "AnexoIV/ValidarStorage";
var urlDescargarPDF = baseUrl + "AnexoIV/DescargarPDF";
var dataTableAnexoIV = null;

//----
var urlListarDepartamento = baseUrl + 'UnidadFlota/GetDepartamento';
var urlListarProvincia = baseUrl + 'UnidadFlota/GetProvincia';

var AnexoIV = function () {


    var eventos = function () {
        var options = {};
        options.locale = {
            format: 'DD/MM/YYYY',
            separator: ' - ',
            applyLabel: 'Aplicar',
            cancelLabel: 'Cancelar',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Custom',
            weekLabel: 'W',
            daysOfWeek: [
                "Dom",
                "Lun",
                "Mar",
                "Mie",
                "Jue",
                "Vie",
                "Sáb"],
            monthNames: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"],
            firstDay: 1
        };
        moment.locale('es');

        $('#txtFechaDesde, #txtfechaHasta').daterangepicker({
            singleDatePicker: true,
            locale: options.locale,
            //startDate: moment()
        });

        $("#btn-buscar").on("click", function () {
            dataTableAnexoIV.ajax.reload();
        });

        $("#btn-exportar-xlsx").on("click", function () {
            var param = "?fechaI=" + $("#txtFechaDesde").val() + "&fechaF=" + $("#txtfechaHasta").val() + "&localidad=" + $("#txtlocalidad").val() +
                "&ubicacion=" + $("#txtubicacion").val() + "&placa=" + $("#txtplaca").val() + "&clase=" + $("#txtclase").val() + "&marca=" + $("#txtmarca").val() +
                "&modelo=" + $("#txtmodelo").val() + "&estado=" + $("#txtmodelo").val() + "&numEvento=" + $("#txtNumEvento").val();
            location.href = urlExportarXlsx + param;

        });

        $("#btn-exportar-xls").on("click", function () {
            var param = "?fechaI=" + $("#txtFechaDesde").val() + "&fechaF=" + $("#txtfechaHasta").val() + "&localidad=" + $("#txtlocalidad").val() +
                "&ubicacion=" + $("#txtubicacion").val() + "&placa=" + $("#txtplaca").val() + "&clase=" + $("#txtclase").val() + "&marca=" + $("#txtmarca").val() +
                "&modelo=" + $("#txtmodelo").val() + "&estado=" + $("#txtmodelo").val();
            location.href = urlExportarXls + param;
        });


        $('#DataTableAnexoIV tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                dataTableAnexoIV.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        $("#DataTableAnexoIV tbody").on("click", "a.btn-verPDFRepuesto", function () {
            var nomArchivo = $(this).attr("data-nombreArchivo");
            var param = "?nomArchivo=" + nomArchivo;
            var parametros = {
                nomArchivo: nomArchivo
            }
            webApp.JsonParam(urlValidarStorage, parametros, function (response) {
                if (response.Success) {
                    window.open(urlDescargarPDF + param, '_blank');
                } else {
                    swal("Alerta!", response.Message, "warning");
                }
            });

        });

        $("#DataTableAnexoIV tbody").on("click", "a.btn-verPDFFactura", function () {
            var nomArchivo = $(this).attr("data-nombreArchivo");
            var param = "?nomArchivo=" + nomArchivo;
            var parametros = {
                nomArchivo: nomArchivo
            }
            webApp.JsonParam(urlValidarStorage, parametros, function (response) {
                if (response.Success) {
                    window.open(urlDescargarPDF + param, '_blank');
                } else {
                    swal("Alerta!", response.Message, "warning");
                }
            });

        });

        $('[data-toggle="tooltip"]').tooltip();
    }


    var ConfigurarDataTable = function () {
        $.extend($.fn.dataTable.defaults, {
            language: { url: urlDatatableLanguage },
            pageLength: 10,

        });
    };

    var visualizarDataTableAnexoIV = function () {

        dataTableAnexoIV = $('#DataTableAnexoIV').DataTable({
            "bFilter": false,
            "bProcessing": true,
            "serverSide": false,
            "scrollCollapse": true,
            "scrollX": true,
            "ajax": {
                "url": urlListarAnexoIV,
                "type": "POST",
                "data": function (request) {
                    request.filter = new Object();
                    request.filter = {

                        clase: $("#txtclase").val(),
                        placa: $("#txtplaca").val(),
                        marca: $("#txtmarca").val(),
                        modelo: $("#txtmodelo").val(),
                        estado: $("#txtunidad").val(),
                        localidad: $("#txtlocalidad").val(),
                        ubicacion: $("#txtubicacion").val(),
                        fechaIncio: $("#txtFechaDesde").val(),
                        fechaFin: $("#txtfechaHasta").val(),
                        departamento: $("#txtDepartamento").val(),
                        provincia: $("#txtProvincia").val(),
                        distrito: $("#txtDistrito").val(),
                        numEvento: $("#txtNumEvento").val()
                    }
                }
            },
            "bAutoWidth": false,
            "columns": [
                { "data": "hxuc_icorrelativo" },
                { "data": "clase" },
                { "data": "placaInterna" },
                { "data": "placaRodaje" }, // render: $.fn.dataTable.render.number(',', '.', 2)
                { "data": "marca" },
                { "data": "modelo" },
                { "data": "motor" },
                { "data": "serieVIN" },
                { "data": "ubicaciondepartamento" },
                { "data": "ubicacionProvincia" },
                { "data": "ubicacionDistrito" },
                { "data": "latitud" },
                { "data": "longitud" },
                { "data": "costoUnidad", render: $.fn.dataTable.render.number(',', '.', 2) },
                { "data": "anioFabricacion" },
                { "data": "anioEntregaPNP" },
                { "data": "fechaEntregaPNP" },
                { "data": "inicioOperaciones" },
                { "data": "numeroPoliza" },
                { "data": "numeroCertificado" },
                { "data": "estado" },
                { "data": "fechaBaja" },
                { "data": "motivoBaja" },
                { "data": "costoAcumuladoTotal", render: $.fn.dataTable.render.number(',', '.', 2) },
                { "data": "costoAcumuladoFLAT", render: $.fn.dataTable.render.number(',', '.', 2) },
                { "data": "costoAcumuladoAdicional", render: $.fn.dataTable.render.number(',', '.', 2) },
                { "data": "flat" },
                { "data": "costoTotalSinIGV", render: $.fn.dataTable.render.number(',', '.', 2) }, //costo total sin igv
                { "data": "costoFLATSinIGV", render: $.fn.dataTable.render.number(',', '.', 2) }, //costo flat sin igv
                { "data": "costoAdicionalSinIGV", render: $.fn.dataTable.render.number(',', '.', 2) }, //costo adicional sin igv
                { "data": "tipoCambio" },//T.C
                {
                    "data": function (obj) {
                        return '<p data-toggle="tooltip" title="' + obj.tallerResponsable + '">' + obj.tallerResponsable.toString().substring(0, 10) + '... </p>'
                    }
                },
                { "data": "ruc" },
                {
                    "data": function (obj) {
                        return '<a data-toggle="tooltip" title="Ver documento" style="text-decoration:underline" class="btn-verPDFRepuesto" data-nombreArchivo="' + obj.ruta_repuesto + '"  href="#">Nro° ' + obj.nPresupuesto + '</a>';

                    }
                },
                {
                    "data": function (obj) {
                        return '<a style="text-decoration:underline" class="btn-verPDFFactura" data-nombreArchivo="' + obj.ruta_factura + '"  href="#">' + obj.factura + '</a>';

                    }
                },
                { "data": "mesfactura" },
                { "data": "moneda" },
                { "data": "montoFacturaSinIGV", render: $.fn.dataTable.render.number(',', '.', 2) },
                { "data": "trabajoRealizado" },
                { "data": "estadoOperaciones" },
                {
                    "data": function (obj) {
                        return '<p data-toggle="tooltip" title="' + obj.motivoIngreso + '">' + obj.motivoIngreso.toString().substring(0, 10) + '... </p>'
                    }
                },

                { "data": "horaIngreso" },
                { "data": "fechaIngreso" },
                {
                    "data": function (obj) {
                        return '<p data-toggle="tooltip" title="' + obj.nombrePolicialResponsable + '">' + obj.nombrePolicialResponsable.toString().substring(0, 10) + '... </p>'
                    }
                },

                { "data": "codigoCIP" },
                { "data": "kmIngresoTaller", render: $.fn.dataTable.render.number(',', '.', 0) },
                { "data": "proximoMantenimientoKM", render: $.fn.dataTable.render.number(',', '.', 0) },

                { "data": "horaFindeServicio" },
                { "data": "fechaFindeServicio" },

                { "data": "horaSalida" },
                { "data": "fechaSalida" },
                {
                    "data": function (obj) {
                        return '<p data-toggle="tooltip" title="' + obj.nombrePolicialResponsableSalida + '">' + obj.nombrePolicialResponsableSalida.toString().substring(0, 10) + '... </p>'
                    }
                },
                { "data": "codigoCIPSalida" },

                { "data": "horasdeServicio" },
                { "data": "diasdeServicio" },

                { "data": "horasTaller" },
                { "data": "diasTaller" },
                { "data": "hxuc_nmonto_stock" },
            ],
            "aoColumnDefs": [
                { "className": "hidden-120", "aTargets": [0], "width": "6%" },
                { "className": "hidden-120", "aTargets": [1], "width": "5%" },
                { "className": "hidden-120", "aTargets": [2], "width": "6%" },
                { "className": "hidden-120", "aTargets": [3], "width": "6%" },
                { "className": "hidden-120", "aTargets": [4], "width": "6%" },
                { "className": "hidden-120", "aTargets": [5], "width": "10%" },
                { "className": "hidden-120", "aTargets": [6], "width": "6%" },
                { "className": "hidden-120", "aTargets": [7], "width": "6%" },
                { "className": "hidden-120", "aTargets": [8], "width": "6%" },
                { "className": "hidden-120", "aTargets": [9], "width": "6%" },
                { "className": "hidden-120", "aTargets": [10], "width": "6%" },
                { "className": "hidden-120", "aTargets": [11], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [12], "width": "6%" },
                { "className": "hidden-120", "aTargets": [13], "width": "6%" },
                { "className": "hidden-120", "aTargets": [14], "width": "6%" },
                { "className": "hidden-120", "aTargets": [15], "width": "6%" },
                { "className": "hidden-120", "aTargets": [16], "width": "6%" },
                { "className": "hidden-120", "aTargets": [17], "width": "6%" },
                { "className": "hidden-120", "aTargets": [18], "width": "6%" },
                { "className": "hidden-120", "aTargets": [19], "width": "6%" },
                { "className": "hidden-120", "aTargets": [20], "width": "6%" },
                { "className": "hidden-120", "aTargets": [21], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [22], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [23], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [24], "width": "6%" },
                { "className": "hidden-120", "aTargets": [25], "width": "6%" },
                { "className": "hidden-120", "aTargets": [26], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [27], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [28], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [29], "width": "6%" },
                { "className": "hidden-120", "aTargets": [30], "width": "6%" },
                { "className": "hidden-120", "aTargets": [31], "width": "20%" },
                { "className": "hidden-120", "aTargets": [32], "width": "6%" },
                { "className": "hidden-120", "aTargets": [33], "width": "6%" },
                { "className": "hidden-120", "aTargets": [34], "width": "6%" },
                { "className": "hidden-120", "aTargets": [35], "width": "6%" },
                { "className": "hidden-120", "aTargets": [36], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [37], "width": "6%" },
                { "className": "hidden-120", "aTargets": [38], "width": "6%" },
                { "className": "hidden-120", "aTargets": [39], "width": "6%" },
                { "className": "hidden-120", "aTargets": [40], "width": "6%" },
                { "className": "hidden-120", "aTargets": [41], "width": "20%" },
                { "className": "hidden-120", "aTargets": [42], "width": "6%" },
                { "className": "hidden-120", "aTargets": [43], "width": "6%" },
                { "className": "hidden-120", "aTargets": [44], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [45], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [46], "width": "2%" },

                { "className": "hidden-120", "aTargets": [47], "width": "2%" },
                { "className": "hidden-120", "aTargets": [48], "width": "2%" },

                { "className": "hidden-120", "aTargets": [49], "width": "2%" },
                { "className": "hidden-120", "aTargets": [50], "width": "2%" },
                { "className": "hidden-120", "aTargets": [51], "width": "2%" },
                { "className": "hidden-120", "aTargets": [52], "width": "2%" },
                { "className": "hidden-120", "aTargets": [53], "width": "2%" },
                { "className": "hidden-120", "aTargets": [54], "width": "2%" },
                { "className": "hidden-120", "aTargets": [55], "width": "2%" },
                { "className": "hidden-120", "aTargets": [56], "width": "2%" },
            ],
            "order": [[0, "ASC"]],
            "fnDrawCallback": function (oSettings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });
    };


    var comboLocalidad = function () {
        webApp.Ajax({
            url: urlListarLocalidad,
            async: false
        }, function (response) {
            $("#txtlocalidad").append('<option value="0">TODOS</option>');
            $.each(response.data, function (index, item) {
                $("#txtlocalidad").append('<option value="' + item + '">' + item + '</option>');
            });
            $("#txtlocalidad").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }




    //---------------------------------------------
    var comboDepatamento = function () {
        webApp.Ajax({
            url: urlListarDepartamento,
            async: false,

        }, function (response) {
            $("#txtDepartamento").append('<option value="0">TODOS</option>');
            $.each(response.data, function (index, item) {
                $("#txtDepartamento").append('<option value="' + item.ubicc_icod_ubicacion + '">' + item.ubicc_vnombre_ubicacion + '</option>');
            });
            $("#txtDepartamento").val("0");

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
            $.each(response.data, function (index, item) {
                $("#txtProvincia").append('<option value="' + item.ubicc_icod_ubicacion + '">' + item.ubicc_vnombre_ubicacion + '</option>');
            });
            $("#txtProvincia").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }


    function removeOptions(selectbox) { var i; for (i = selectbox.options.length - 1; i >= 0; i--) { selectbox.remove(i); } }



    //---------------------------------------------

    var comboUbicacion = function () {
        webApp.Ajax({
            url: urlListarUbicacion,
            async: false
        }, function (response) {
            $("#txtubicacion").append('<option value="0">TODOS</option>');
            $.each(response.data, function (index, item) {
                if (item.ubicacion != '') {
                    $("#txtubicacion").append('<option value="' + item.ubicacion + '">' + item.ubicacion + '</option>');
                }
            });
            $("#txtubicacion").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var comboClase = function () {
        webApp.Ajax({
            url: urlListarClase,
            async: false
        }, function (response) {
            $("#txtclase").append('<option value="0">TODOS</option>');
            $.each(response.data, function (index, item) {
                $("#txtclase").append('<option value="' + item + '">' + item + '</option>');
            });
            $("#txtclase").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var comboEstadoUnidad = function () {
        webApp.Ajax({
            url: urlListarEstadoUnidad,
            async: false
        }, function (response) {
            $("#txtunidad").append('<option value="0">TODOS</option>');
            $.each(response.data, function (index, item) {
                $("#txtunidad").append('<option value="' + item.estado + '">' + item.estado + '</option>');
            });
            $("#txtunidad").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var comboMarca = function () {
        webApp.Ajax({
            url: urlListarMarca,
            async: false
        }, function (response) {
            $("#txtmarca").append('<option value="0">TODOS</option>');
            $.each(response.data, function (index, item) {
                $("#txtmarca").append('<option value="' + item + '">' + item + '</option>');
            });
            $("#txtmarca").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var comboModelo = function () {
        webApp.Ajax({
            url: urlListarModelo,
            async: false
        }, function (response) {
            $("#txtmodelo").append('<option value="0">TODOS</option>');
            $.each(response.data, function (index, item) {
                $("#txtmodelo").append('<option value="' + item + '">' + item + '</option>');
            });
            $("#txtmodelo").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    return {
        init: function () {
            ConfigurarDataTable();
            visualizarDataTableAnexoIV();
            ConfigurarDataTable();
            comboDepatamento();
            comboProvincia();
            comboLocalidad();
            comboUbicacion();
            comboClase();
            comboEstadoUnidad();
            comboMarca();
            comboModelo();
            eventos();


        }
    }

}(jQuery);

function buscar(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) {
        dataTableAnexoIV.ajax.reload();
    }
}