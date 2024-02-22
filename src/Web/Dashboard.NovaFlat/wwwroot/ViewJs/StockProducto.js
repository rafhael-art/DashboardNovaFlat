var urlListarStock = baseUrl + 'StockProducto/Lista';
var urlListarKardex = baseUrl + 'StockProducto/ListaKardex';
var urlListarAlmacen = baseUrl + 'StockProducto/ListaAlmacen';
var urlListarMotivo = baseUrl + 'StockProducto/ListaMotivo';
var urlExportarXlsx = baseUrl + 'StockProducto/Stock_Exportar_Xlsx';
var urlExportarXls = baseUrl + 'StockProducto/Stock_Exportar_Xls';
var dataTableStockProducto = null;
var dataTableUnidadKardex = null;
var idProducto = 0;
var idAlmacen = 0;

var StockProducto = function () {

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
        $('#txtFechaHasta').daterangepicker({
            singleDatePicker: true,
            locale: options.locale,
            startDate: moment()
        });

        $("#btn-buscar").on("click", function () {
            dataTableStockProducto.ajax.reload();
        });

        $("#cboAlmacen").on("change", function () {
            dataTableStockProducto.ajax.reload();
        });

        $("#cboTipo").on("change", function () {
            dataTableUnidadKardex.ajax.reload();
        });

        $("#cboMotivo").on("change", function () {
            dataTableUnidadKardex.ajax.reload();
        });

        $("#btn-buscar-kardex").on("click", function () {
            dataTableUnidadKardex.ajax.reload();
        });


        $("#DataTableStock tbody ").on("click", "a#btn-verKardex", function () {
            let idProductoFilter = $(this).attr("data-id");
            let descripcion = $(this).attr("data-descripcion");
            var idAlmacenFilter = $(this).attr("data-idAlmacen");
            $("#cboMotivo").val(0);
            $("#cboTipo").val(0);
            if (idProductoFilter != null && idProductoFilter != "" && typeof idProductoFilter != "undefined") {
                idProducto = idProductoFilter;
                idAlmacen = idAlmacenFilter;
                checkSession(function () {
                    dataTableUnidadKardex.ajax.reload();
                });
      
                $("#tile-kardex").text(descripcion.toUpperCase());
                $("#modal-kardex").modal('show');
            }
        });



        $("#btn-exportar-xlsx").on("click", function () {

            var param = "?fechaI=" + "" + "&fechaF=" + $("#txtFechaHasta").val() + "&idAlmacen=" + $("#cboAlmacen").val()
            location.href = urlExportarXlsx + param;


        });

        $("#btn-exportar-xls").on("click", function () {
            var param = "?fechaI=" + "" + "&fechaF=" + $("#txtFechaHasta").val() + "&idAlmacen=" + $("#cboAlmacen").val()
            location.href = urlExportarXls + param;
        });
    }

    var ConfigurarDataTable = function () {

        $.extend($.fn.dataTable.defaults, {
            language: { url: urlDatatableLanguage },
            pageLength: 10,
            //"bProcessing": false,
            //"dom": 'fltip'
        });
    };

    var visualizarDataTableStock = function () {
        dataTableStockProducto = $('#DataTableStock').DataTable({
            "bFilter": false,
            "bProcessing": true,
            "serverSide": false,
            "ajax": {
                "url": urlListarStock,
                "type": "POST",
                "data": function (request) {
                    request.filter = new Object();
                    request.filter = {
                        fechaInicio: '',
                        fechaFin: $("#txtFechaHasta").val(),
                        idAlmacen: $("#cboAlmacen").val(),
                        codigo: $("#txtCodigo").val(),
                        descripcion: $("#txtDescripcion").val()
                    }
                }
            },
            "bAutoWidth": false,
            "columns": [
                { "data": "rc_vnumero" },
                { "data": "rc_vdescripcion" },
                { "data": "stock", render: $.fn.dataTable.render.number(',', '.', 2) },
                {
                    "data": function (obj) {
                        return '<a id="btn-verKardex" data-descripcion="' + obj.rc_vdescripcion + '" data-id="' + obj.prdc_icod_producto + '" data-idAlmacen="' + obj.almac_icod_almacen + '"  href="#"><i class="fas fa-clipboard-list"></i></a>'
                    }
                }
            ],
            "aoColumnDefs": [
                { "className": "center hidden-120", "aTargets": [0], "width": "6%" },
                { "className": "center hidden-120", "aTargets": [1], "width": "50%" },
                { "className": "text-right hidden-120", "aTargets": [2], "width": "6%" },
                { "bSortable": false, "className": "text-center hidden-500", "aTargets": [3], "width": "3%" }
            ],
            "order": [[0, "ASC"]],
        });
    };

    var visualizarDataTableKardex = function () {
        dataTableUnidadKardex = $('#DataTableKardex').DataTable({
            "bFilter": false,
            "bProcessing": true,
            "serverSide": false,
            "ajax": {
                "url": urlListarKardex,
                "type": "POST",
                "data": function (request) {
                    request.filter = new Object();
                    request.filter = {
                        idProducto: idProducto,
                        idAlmacen: idAlmacen,
                        fecha: $("#txtFechaHasta").val(),
                        motivo: $("#cboMotivo").val(),
                        tipo: $("#cboTipo").val()
                    }
                }
            },
            "bAutoWidth": false,
            "columns": [
                { "data": "documento" },
                { "data": "kardc_sfecha_movimiento" },
                { "data": "descripcionMotivo" },
                { "data": "kardc_vbeneficiario" },
                { "data": "kardc_vobservaciones" },
                { "data": "cantidad_prod_ingreso", render: $.fn.dataTable.render.number(',', '.', 2) },
                { "data": "cantidad_prod_salida", render: $.fn.dataTable.render.number(',', '.', 2) },
                { "data": "cantidad_saldo", render: $.fn.dataTable.render.number(',', '.', 2)},
            ],
            "aoColumnDefs": [
                { "className": "center hidden-120", "aTargets": [0], "width": "8%" },
                { "className": "center hidden-120", "aTargets": [1], "width": "5%" },
                { "className": "center hidden-120", "aTargets": [2], "width": "18%" },
                { "className": "center hidden-992", "aTargets": [3], "width": "24%" },
                { "className": "center hidden-200", "aTargets": [4], "width": "24%" },
                { "className": "text-right hidden-500", "aTargets": [5], "width": "4%" },
                { "className": "text-right hidden-500", "aTargets": [6], "width": "4%" },
                { "className": "text-right hidden-500", "aTargets": [7], "width": "4%" }
            ],
            "order": [[0, "ASC"]],
        });
    };

    var comboAlmacen = function () {
        webApp.Ajax({
            url: urlListarAlmacen,
            async: false
        }, function (response) {
            $("#cboAlmacen").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#cboAlmacen").append('<option value="' + item.almac_icod_almacen + '">' + item.almac_vdescripcion + '</option>');
            });
            $("#cboAlmacen").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var comboMotivo = function () {
        webApp.Ajax({
            url: urlListarMotivo,
            async: false
        }, function (response) {
            $("#cboMotivo").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#cboMotivo").append('<option value="' + item.tarec_iid_tabla_registro + '">' + item.tarec_vdescripcion + '</option>');
            });
            $("#cboMotivo").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }


    return {
        init: function () {
            ConfigurarDataTable();
            checkSession(function () {
                comboAlmacen();
                comboMotivo();
                visualizarDataTableStock();
                visualizarDataTableKardex();
                eventos();
            });
        }
    }

}(jQuery);

function buscar(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) {
        checkSession(function () {
            dataTableStockProducto.ajax.reload();
        });
    }
}