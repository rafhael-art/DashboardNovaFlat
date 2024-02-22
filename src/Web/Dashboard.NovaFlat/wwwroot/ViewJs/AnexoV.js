var urlListarAnexoV = baseUrl + 'AnexoV/Lista';
var urlExportarXlsx = baseUrl + 'AnexoV/Exportar_Xlsx';
var urlExportarXls = baseUrl + 'AnexoV/Exportar_Xls';
var urlListarLocalidad = baseUrl + 'UnidadFlota/GetLocalidad';
var urlListarUbicacion = baseUrl + 'UnidadFlota/GetUbicacion';
var urlListarClase = baseUrl + 'UnidadFlota/GetClase';
var urlListarEstadoUnidad = baseUrl + 'UnidadFlota/GetEstadoUnidad';
var urlListarMarca = baseUrl + 'UnidadFlota/GetMarca';
var urlListarModelo = baseUrl + 'UnidadFlota/GetModelo';
var urlValidarStorage = baseUrl + "AnexoIV/ValidarStorage";
var urlDescargarPDF = baseUrl + "AnexoIV/DescargarPDF";
var urlListarCodRespuesto = baseUrl + 'UnidadFlota/GetCodRespuesto';
var urlListarDepartamento = baseUrl + 'UnidadFlota/GetDepartamento';
var urlListarProvincia = baseUrl + 'UnidadFlota/GetProvincia';
var urlListarMantenimiento = baseUrl + 'UnidadFlota/GetMantenimiento';
var urlActualizarKmVidaUtil = baseUrl + 'Vehiculo/ActualizarKm';
var urlGetFacturas = baseUrl + "AnexoV/GetFacturas";
var urlGetAnios = baseUrl + "AnexoV/GetAnios";
var dataTableModel;
var Data;

var dataTableAnexoV = null;
var AnexoV = function () {

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

        $('#txtFechaDesde, #txtfechaHasta,#txtFechaFacturaDesde,#txtFechaFacturaHasta').daterangepicker({
            singleDatePicker: true,
            locale: options.locale,
            //startDate: moment()
        });

        $('#txtFacturas').select2({
            placeholder: 'Select an option'
        });

        $("#btn-buscar").on("click", function () {
            dataTableAnexoV.ajax.reload(function (json) {

                
            });
        });

        $("#btn-exportar-xlsx").on("click", function () {
            var param = "?fechaI=" + $("#txtFechaDesde").val() + "&fechaF=" + $("#txtfechaHasta").val() + "&localidad=" + $("#txtlocalidad").val() +
                "&ubicacion=" + $("#txtubicacion").val() + "&placa=" + $("#txtplaca").val() + "&clase=" + $("#txtclase").val() + "&marca=" + $("#txtmarca").val() +
                "&modelo=" + $("#txtmodelo").val() + "&estado=" + $("#txtunidad").val() + "&departamento=" + $("#txtDepartamento").val() + "&provincia=" + $("#txtProvincia").val() + "&mantenimiento=" + $("#txtMantenimiento").val() +
                "&NumEvento=" + $("#txtNumEvento").val() + "&Factura=" + $("#txtFacturas").val() + "&MesFactura=" + $("#txtMesFactura").val() + "&AnioFactura=" + $("#txtAnioFactura").val();
            location.href = urlExportarXlsx + param;
        });

        $("#btn-exportar-xls").on("click", function () {
            var param = "?fechaI=" + $("#txtFechaDesde").val() + "&fechaF=" + $("#txtfechaHasta").val() + "&localidad=" + $("#txtlocalidad").val() +
                "&ubicacion=" + $("#txtubicacion").val() + "&placa=" + $("#txtplaca").val() + "&clase=" + $("#txtclase").val() + "&marca=" + $("#txtmarca").val() +
                "&modelo=" + $("#txtmodelo").val() + "&estado=" + $("#txtmodelo").val();
            location.href = urlExportarXls + param;
        });

        $('#DataTableAnexoV tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                dataTableAnexoV.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        $("#txtfechaHasta").on('change', (e) => {
            if ($("txtfechaHasta").val() !== null) {

                fLimpiarFacturas();
            }
        });

        $("#txtFechaDesde").on('change', (e) => {
            if ($("#txtFechaDesde").val() !== "") {
                fLimpiarFacturas();
            }
        });
        //-----------------------------------------------------------------------------------------


        $("#DataTableAnexoV tbody").on("click", "a.btn-Actualizar", function () {
            var KmVidaUtilFabricante = $(this).attr("data-KmVidaUtilFabricante");
            var CodRepuesto = $(this).attr("data-CodRepuesto");
            var Descripcion = $(this).attr("data-Descripcion");
            webApp.clearForm('form-actualizarVehiculo');
            var modal = $("#modal-actualizarVehiculo");
            modal.find('#title-modal-vehiculo').text(Descripcion)
            modal.find("#txtkmVidaUtil").val(KmVidaUtilFabricante);
            modal.find("#txtCodRepuesto").val(CodRepuesto);


            modal.modal('show');

        });

        $("#txtkmVidaUtil").on({
            "focus": function (event) {
                $(event.target).select();
            },
            "keyup": function (event) {
                $(event.target).val(function (index, value) {
                    return value.replace(/\D/g, "")
                        .replace(/([0-9])([0-9]{3})$/, '$1,$2')
                        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
                });
            }
        });



        $("#btn-guardar").on("click", function () {
            var modal = $("#modal-actualizarVehiculo");
            if ($("#form-actualizarVehiculo").valid()) {
                var param = {
                    CodRespuesto: modal.find("#txtCodRepuesto").val(),
                    kmVidautil: modal.find("#txtkmVidaUtil").val(),
                }
                webApp.JsonParam(urlActualizarKmVidaUtil, param, function (response) {
                    if (response.Success) {
                        swal("Correcto!", response.Message, "success");
                        dataTableAnexoV.ajax.reload();
                        modal.modal('hide');
                    }
                    else {
                        swal("Alerta!", response.Message, "warning");
                        if (response.Message = 'Ud. no Cuenta con Permisos para Editar') {
                            modal.modal('hide');
                        }
                    }
                });

            }
        });

        webApp.InicializarValidacion('form-actualizarVehiculo', {
            txtkmVidaUtil: {
                required: true
            },
            txtkmVidaUtil: {
                valueNotEquals: "0",
            },
            txtkmVidaUtil: {
                valueNotEquals: "",
            }
        }, {
            tkmVidaUtil: {
                required: "Ingrese la Km Vida Util del Fabricante",
            },
            txtkmVidaUtil: {
                valueNotEquals: "Ingrese la Km Vida Util del Fabricante"
            }
        })


        //-------------------------------------------------------


        $("#DataTableAnexoV tbody").on("click", "a.btn-verPDFRepuesto", function () {
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

        $("#DataTableAnexoV tbody").on("click", "a.btn-verPDFFactura", function () {
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


        $(".btnLimpiarFechas").on("click", function () {
            fLimpiarFacturas();
        });


        $(".btnLimpiarFacturas").on("click", function () {
            fLimpiarFacturas();
        });

        $("#txtFechaDesde").on('change', (e) => {
            if ($("#txtfechaHasta").val() === "") 
                $("#txtfechaHasta").val($("#txtFechaDesde").val())
        });

        $("#txtfechaHasta").on('change', (e) => {
            if ($("#txtFechaDesde") === "")
                $("#txtFechaDesde").val($("#txtfechaHasta").val())
        });


        $("#txtAnioFactura").on('change', (e) => {
            if ($("#txtMesFactura").val() === "0")
                $("#txtMesFactura").val(1);
        });

        $("#txtMesFactura").on('change', (e) => {
            if ($("#txtAnioFactura").val() === "0")
                $("#txtAnioFactura").val(new Date().getFullYear());
        });
    }

    var fLimpiarFechas = () => {
        $('#txtFechaDesde').val(null)
        $('#txtfechaHasta').val(null)
    }

    var fLimpiarFacturas = () => {
        
        $('#txtAnioFactura').val(0)
        $('#txtMesFactura').val(0)
        $('#txtFacturas').val(0)
        $('#txtFacturas').trigger('change');
    }


    var ConfigurarDataTable = function () {
        $.extend($.fn.dataTable.defaults, {

            language: { url: urlDatatableLanguage },
            pageLength: 10,

        });
    };

    var visualizarDataTableAnexoV = function () {
        dataTableAnexoV = $('#DataTableAnexoV').DataTable({
            bFilter: false,
            bProcessing: true,
            serverSide: false,
            scrollCollapse: true,
            scrollX: true,
            ajax: {
                url: urlListarAnexoV,
                type: "POST",
                data: function (request) {
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
                        codrepuesto: $("#txtCodRepuesto").val(),
                        departamento: $("#txtDepartamento").val(),
                        provincia: $("#txtProvincia").val(),
                        mantenimiento: $("#txtMantenimiento").val(),
                        NumEvento: $("#txtNumEvento").val(),
                        Factura: $("#txtFacturas").val(),
                        AnioFactura: $("#txtAnioFactura").val(),
                        MesFactura: $("#txtMesFactura").val(),
                    }
                }
            },
            bAutoWidth: false,
            columns: [
                { "data": "hxuc_icorrelativo" },
                { "data": "Clase" },
                { "data": "PlacaInterna" },
                { "data": "PlacaRodaje" }, // render: $.fn.dataTable.render.number(',', '.', 2)
                { "data": "Marca" },
                { "data": "Modelo" },
                { "data": "Motor" },
                { "data": "SerieVIN" },
                { "data": "Ubicaciondepartamento" },
                { "data": "UbicacionProvincia" },
                { "data": "UbicacionDistrito" },
                { "data": "Latitud" },
                { "data": "Longitud" },
                { "data": "CostoUnidad", render: $.fn.dataTable.render.number(',', '.', 2) },
                { "data": "AnioFabricacion" },
                { "data": "AnioEntregaPNP" },
                { "data": "FechaEntregaPNP" },
                { "data": "InicioOperaciones" },
                { "data": "NumeroPoliza" },
                { "data": "NumeroCertificado" },
                { "data": "Estado" },
                { "data": "FechaBaja" },
                { "data": "MotivoBaja" },
                { "data": "CostoAcumuladoTotal", render: $.fn.dataTable.render.number(',', '.', 2) },
                { "data": "CostoAcumuladoFLAT", render: $.fn.dataTable.render.number(',', '.', 2) },
                { "data": "CostoAcumuladoAdicional", render: $.fn.dataTable.render.number(',', '.', 2) },

                {
                    "data": function (obj) {
                        return '<p data-toggle="tooltip" title="' + obj.TallerResponsable + '">' + obj.TallerResponsable.toString().substring(0, 10) + '... </p>'
                    }
                },
                { "data": "RUC" },
                {
                    "data": function (obj) {
                        return '<a data-toggle="tooltip" title="Ver documento" style="text-decoration:underline" class="btn-verPDFRepuesto" data-nombreArchivo="' + obj.ruta_repuesto + '"  href="#">Nro° ' + obj.NPresupuesto + '</a>';
                    }
                },
                {
                    "data": function (obj) {
                        return '<a style="text-decoration:underline" class="btn-verPDFFactura" data-nombreArchivo="' + obj.ruta_factura + '"  href="#">' + obj.Factura + '</a>';
                    }
                },
                { "data": "Mesfactura" },
                { "data": "Moneda" },
                { "data": "MontoFacturaSinIGV", render: $.fn.dataTable.render.number(',', '.', 2) },
                { "data": "Flat" },
                { "data": "TrabajoRealizado" },

                { "data": "KmIngresoTaller" },//, render: $.fn.dataTable.render.number(',', '.', 0) },
                { "data": "CodRepuesto" },
                {
                    "data": function (obj) {
                        return '<p data-toggle="tooltip" title="' + obj.Descripcion + '">' + obj.Descripcion.toString().substring(0, 10) + '... </p>'
                    }
                },
                { "data": "CostoSinIGV", render: $.fn.dataTable.render.number(',', '.', 2) },
                { "data": "KmUltimoCambio", render: $.fn.dataTable.render.number(',', '.', 0) },
                { "data": "KmVidaUtilReal", render: $.fn.dataTable.render.number(',', '.', 0) },
                //{ "data": "KmVidaUtilFabricante", render: $.fn.dataTable.render.number(',', '.', 0) },
                {
                    "data": function (obj) {
                        return '<label style="margin-right: 4px;">' + obj.KmVidaUtilFabricante + '</label>' +

                            '<a class="btn-Actualizar"  data-KmVidaUtilFabricante="' + obj.KmVidaUtilFabricante + '" data-CodRepuesto="' + obj.CodRepuesto + '" data-Descripcion="' + obj.Descripcion + '" href="#"><i class="fas fa-edit"></i></a> '
                    }
                },
                { "data": "TipoCambio" },

                { "data": "MotivoFalla" },
                { "data": "MecanicoResponsable" },
                { "data": "TipoMantenimiento" },
                { "data": "hxuc_nmonto_stock" },
                { "data": "total_costo" },
            ],
            aoColumnDefs: [
                { "bSortable": false, "className": "text-center hidden-500", "aTargets": [0], "width": "3%" },
                { "className": "hidden-120", "aTargets": [1], "width": "6%" },
                { "className": "hidden-120", "aTargets": [2], "width": "5%" },
                { "className": "hidden-120", "aTargets": [3], "width": "6%" },
                { "className": "hidden-120", "aTargets": [4], "width": "6%" },
                { "className": "hidden-120", "aTargets": [5], "width": "6%" },
                { "className": "hidden-120", "aTargets": [6], "width": "10%" },
                { "className": "hidden-120", "aTargets": [7], "width": "6%" },
                { "className": "hidden-120", "aTargets": [8], "width": "10%" },
                { "className": "hidden-120", "aTargets": [9], "width": "6%" },
                { "className": "hidden-120", "aTargets": [10], "width": "6%" },
                { "className": "hidden-120", "aTargets": [11], "width": "6%" },
                { "className": "hidden-120", "aTargets": [12], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [13], "width": "6%" },
                { "className": "hidden-120", "aTargets": [14], "width": "6%" },
                { "className": "hidden-120", "aTargets": [15], "width": "6%" },
                { "className": "hidden-120", "aTargets": [16], "width": "6%" },
                { "className": "hidden-120", "aTargets": [17], "width": "6%" },
                { "className": "hidden-120", "aTargets": [18], "width": "6%" },
                { "className": "hidden-120", "aTargets": [19], "width": "6%" },
                { "className": "hidden-120", "aTargets": [20], "width": "6%" },
                { "className": "hidden-120", "aTargets": [21], "width": "6%" },
                { "className": "hidden-120", "aTargets": [22], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [23], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [24], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [25], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [26], "width": "6%" },
                { "className": "hidden-120", "aTargets": [27], "width": "6%" },
                { "className": "hidden-120", "aTargets": [28], "width": "6%" },
                //{ "className": "text-right hidden-120", "aTargets": [28], "width": "6%" },
                //{ "className": "hidden-120", "aTargets": [29], "width": "6%" },
                //{ "className": "hidden-120", "aTargets": [30], "width": "6%" },
                { "className": "hidden-120", "aTargets": [29], "width": "6%" },
                { "className": "hidden-120", "aTargets": [30], "width": "6%" },
                { "className": "hidden-120", "aTargets": [31], "width": "6%" },
                { "className": "hidden-120", "aTargets": [32], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [33], "width": "6%" },
                { "className": "hidden-120", "aTargets": [34], "width": "6%" },
                { "className": "hidden-120", "aTargets": [35], "width": "6%" },
                { "className": "text-left hidden-120", "aTargets": [36], "width": "6%" },
                { "className": "hidden-120", "aTargets": [37], "width": "6%" },
                { "className": "hidden-120", "aTargets": [38], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [39], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [40], "width": "12%" },
                { "className": "text-right hidden-120", "aTargets": [41], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [42], "width": "6%" },
                { "className": "hidden-120", "aTargets": [43], "width": "6%" },
                { "className": "hidden-120", "aTargets": [44], "width": "6%" },
                { "className": "hidden-120", "aTargets": [45], "width": "6%" },
                //{ "className": "hidden-120", "aTargets": [48], "width": "6%" },
                /*   { "className": "hidden-120", "aTargets": [48], "width": "2%" }*/
                //    { "bSortable": false, "className": "text-center hidden-500", "aTargets": [3], "width": "3%" }
            ],
            order: [[0, "ASC"]],
            fnDrawCallback: function (oSettings) {
                $('[data-toggle="tooltip"]').tooltip();
            },
        });

  

    };


    //-----------------------------------------------------------------------------------

    var comboCodRepuesto = function () {
        webApp.Ajax({
            url: urlListarCodRespuesto,
            async: false
        }, function (response) {
            $("#txtCodRepuesto").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#txtCodRepuesto").append('<option value="' + item.repuesto + '">' + item.repuesto + '</option>');
            });
            $("#txtCodRepuesto").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var comboDepatamento = function () {
        webApp.Ajax({
            url: urlListarDepartamento,
            async: false,

        }, function (response) {
            $("#txtDepartamento").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#txtDepartamento").append('<option value="' + item.ubicc_icod_ubicacion + '">' + item.ubicc_vnombre_ubicacion + '</option>');
            });
            $("#txtDepartamento").val("0");

        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });

        $("#txtDepartamento").on('change', (e) => {
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
    }


    function removeOptions(selectbox) { var i; for (i = selectbox.options.length - 1; i >= 0; i--) { selectbox.remove(i); } }


    var comboMantenimiento = function () {

        var parametro = { cod: $("#txtMantenimiento option:selected").val() };
        webApp.Ajax({
            url: urlListarMantenimiento,
            async: false,
            parametros: parametro
        }, function (response) {
            $("#txtMantenimiento").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#txtMantenimiento").append('<option value="' + item.mantenimiento + '">' + item.mantenimiento + '</option>');
            });
            $("#txtMantenimiento").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }
    //-----------------------------------------------------------------------------------


    var comboLocalidad = function () {
        webApp.Ajax({
            url: urlListarLocalidad,
            async: false
        }, function (response) {
            $("#txtlocalidad").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#txtlocalidad").append('<option value="' + item.localidad + '">' + item.localidad + '</option>');
            });
            $("#txtlocalidad").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var comboUbicacion = function () {
        webApp.Ajax({
            url: urlListarUbicacion,
            async: false
        }, function (response) {
            $("#txtubicacion").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
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
            $.each(response.Data, function (index, item) {
                $("#txtclase").append('<option value="' + item.clase + '">' + item.clase + '</option>');
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
            $.each(response.Data, function (index, item) {
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
            $.each(response.Data, function (index, item) {
                $("#txtmarca").append('<option value="' + item.marca + '">' + item.marca + '</option>');
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
            $.each(response.Data, function (index, item) {
                $("#txtmodelo").append('<option value="' + item.modelo + '">' + item.modelo + '</option>');
            });
            $("#txtmodelo").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }


    var fCargarComboMes = () => {
        var arrayMeses = [{ value: 0, mes: 'Mes' }, { value: 1, mes: 'Enero' }, { value: 2, mes: 'Febrero' }, { value: 3, mes: 'Marzo' },
        { value: 4, mes: 'Abril' }, { value: 5, mes: 'Mayo' }, { value: 6, mes: 'Junio' }, { value: 7, mes: 'Julio' },
        { value: 8, mes: 'Agosto' }, { value: 9, mes: 'Septiembre' }, { value: 10, mes: 'Octubre' }, { value: 11, mes: 'Noviembre' }, { value: 12, mes: 'Diciembre' }];
        $.each(arrayMeses, (index, item) => {
            $("#txtMesFactura").append('<option value="' + item.value + '">' + item.mes.toUpperCase() + '</option>');
        });
        $("#txtMesFactura").val("0");

        $("#txtMesFactura").on('change', (e) => {
            if ($("#txtMesFactura").val() != 0) {
                fLimpiarFechas();
            }
        });
    }

    var fCargarFacturasCombo = () => {
        $("#txtFacturas").append('<option value="0">FACTURA</option>');
        webApp.Ajax({
            url: urlGetFacturas,
            async: false,
            parametros: dataTableModel
        }, function (response) {
            $.each(response.Data, function (index, item) {
                $("#txtFacturas").append('<option value="' + item + '">' + item + '</option>');
            });
            $("#txtFacturas").val("0");
        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });

        $("#txtFacturas").on('change', (e) => {
            if ($("#txtFacturas").val() != 0) {
                fLimpiarFechas();
            }
        });
    }

    var fCargarAños = () => {
        $("#txtAnioFactura").empty();
        $("#txtAnioFactura").append('<option value="' + 0 + '">' + 'AÑO' + '</option>');
        webApp.Ajax({
            url: urlGetAnios,
            async: false,
            parametros: dataTableModel
        }, function (response) {
            $.each(response.Data, function (index, item) {
                $("#txtAnioFactura").append('<option value="' + item + '">' + item + '</option>');
            });
            $("#txtAnioFactura").val("0");
        }, function (XMLHttpRequest, textStatus, errorThrown) {
        });

        $("#txtAnioFactura").on('change', (e) => {
            if ($("#txtAnioFactura").val() != 0) {
                fLimpiarFechas();
            }
        });
    }

    return {
        init: function () {
            ConfigurarDataTable();
            checkSession(function () {
                visualizarDataTableAnexoV();
                comboLocalidad();
                comboUbicacion();
                comboClase();
                comboEstadoUnidad();
                comboMarca();
                comboModelo();
                eventos();
                comboCodRepuesto();
                comboProvincia();
                comboDepatamento();
                comboMantenimiento();
                fCargarComboMes();
                fCargarFacturasCombo();
                fCargarAños();
            });
        }
    }

}(jQuery);

function buscar(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) {
        checkSession(function () {
            dataTableAnexoV.ajax.reload();
        });
    }
}




