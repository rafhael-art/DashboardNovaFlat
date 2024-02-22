const urlListarVehiculo = baseUrl + 'Vehiculo/Lista';
const urlListarMotivo = baseUrl + 'Vehiculo/ListaMotivo';
const urlActualizar = baseUrl + 'Vehiculo/ActualizarDatos';
const urlListarEstado = baseUrl + 'Vehiculo/ListaEstado';
const urlRevertir = baseUrl + 'Vehiculo/Revertir';
const urlListarCombos = baseUrl + 'Vehiculo/ListarCombos';
const urlListarDepartamento = baseUrl + 'UnidadFlota/GetDepartamento';
const urlListarProvincia = baseUrl + 'UnidadFlota/GetProvincia';
const urlListarDistrito = baseUrl + 'UnidadFlota/GetDistrito';
const urlListarMarca = baseUrl + 'Vehiculo/GetMarca';
const urlListarModelo = baseUrl + 'Vehiculo/GetModelo';
const urlListarAnio = baseUrl + 'Vehiculo/GetAnio';
const urlGuardar = baseUrl + 'Vehiculo/Guardar';
const modal = $("#modal-actualizarVehiculo");
const urlGetUbicaciones = baseUrl + 'Vehiculo/GetUbicaciones';
const urlExportarXlsx = baseUrl + 'Vehiculo/ExportarXlsx';
var FilaSeleccionada = {};
var Ubicaciones;
const lkpEstado = 55;
const lkpSituacion = 57;
const lkpUbicacion = 58;
const lkpMotivoBaja = 64;
var dataTableVehiculo = null;
const intBaja = 228;
var Vehiculo = function () {


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

        $('#txtFechaDesde, #txtfechaHasta,#vehc_sfecha_inicio_operaciones,#vehc_fecha_entrega_pnp,#vehc_fecha_baja').daterangepicker({

            singleDatePicker: true,
            locale: options.locale,
            startDate: new Date(),

        }).val('');


        $('#vehc_sfecha_registro').daterangepicker({
            singleDatePicker: true,
            locale: options.locale,
        });


        $("#btn-buscar").on("click", function () {
            dataTableVehiculo.ajax.reload();
        });


        $("#vehc_nvalor_asegurado").on({
            "focus": function (event) {
                $(event.target).select();
            },
            "keyup": function (event) {
                $(event.target).val(function (index, value) {
                    return value.replace(/\D/g, "")
                        .replace(/([0-9])([0-9]{2})$/, '$1.$2')
                        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
                });
            }
        });

        $("#vehc_nmonto_deducible").on({
            "focus": function (event) {
                $(event.target).select();
            },
            "keyup": function (event) {
                $(event.target).val(function (index, value) {
                    return value.replace(/\D/g, "")
                        .replace(/([0-9])([0-9]{2})$/, '$1.$2')
                        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
                });
            }
        });


        $("#vehc_dcosto_unidad").on({
            "focus": function (event) {
                $(event.target).select();
            },
            "keyup": function (event) {
                $(event.target).val(function (index, value) {
                    return value.replace(/\D/g, "")
                        .replace(/([0-9])([0-9]{2})$/, '$1.$2')
                        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
                });
            }
        });

        $("#vehc_ncosto_adquisicion").on({
            "focus": function (event) {
                $(event.target).select();
            },
            "keyup": function (event) {
                $(event.target).val(function (index, value) {
                    return value.replace(/\D/g, "")
                        .replace(/([0-9])([0-9]{2})$/, '$1.$2')
                        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
                });
            }
        });



        $('#DataTableVehiculo tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                dataTableVehiculo.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
            var fila = $(this).closest("tr");
            FilaSeleccionada = dataTableVehiculo.row(fila).data();
        });

        $("#DataTableVehiculo tbody").on("click", "a.btn-Actualizar", function () {
            var fila = $(this).closest("tr");
            FilaSeleccionada = dataTableVehiculo.row(fila).data();
            fSetvalues(FilaSeleccionada);
            modal.modal('show');

        });

        $("#btn-revertir").on("click", function () {
            var modal = $("#modal-actualizarVehiculo");
            if ($("#form-actualizarVehiculo").valid()) {
                var param = {
                    Id: modal.find("#Id_vehiculo").val(),
                }
                webApp.JsonParam(urlRevertir, param, function (response) {
                    if (response.Success) {
                        swal("Correcto!", response.Message, "success");
                        dataTableVehiculo.ajax.reload();
                        modal.modal('hide');
                    }
                    else {
                        swal("Alerta!", response.Message, "warning");
                    }
                });

            }
        });


        $("#btn-exportar_excel").on("click", function () {

            

            var datos = {
                placa: $("#txtplaca").val(),
                fechaIncio: $("#txtFechaDesde").val(),
                fechaFin: $("#txtfechaHasta").val(),
                estado: $("#txtEstado").val(),
            }
            var param = "?datos=" + JSON.stringify(datos);

            location.href = urlExportarXlsx + param;
        });

        $("#btn-guardar").on("click", function () {

            //VALIDAR LA FECHA Y EL MOTIVO DE BAJA

            //if ($("#vehc_fecha_baja").val() !== '' || $("#vehc_motivo_baja").val() !== '') {
            //    let campoInvalido = '';
            //    let ='';
            //    if ($("#vehc_fecha_baja").val() === '') { 
            //        campoInvalido = 'Fecha de Baja';
            //        InputCampoInvalido = '#vehc_fecha_baja';
            //    }
            //    if ($("#vehc_motivo_baja").val() === '') {
            //        campoInvalido = 'Motivo de Baja';
            //        InputCampoInvalido = '#vehc_motivo_baja';
            //    }
            //    if (campoInvalido !== '') {
            //        $("#InputCampoInvalido").addClass(".input-input")


            //    }                
            //}


            var param = {};
            var inputs = $("#fromRegistroVehiculo").serializeArray();

            $.each(inputs, function (i, input) {
                if (input.name === 'vehc_ncosto_adquisicion' || input.name === 'vehc_nvalor_asegurado' || input.name === 'vehc_nmonto_deducible' || input.name === 'vehc_dcosto_unidad')
                    param[input.name] = fDesFormatDeciamls(input.value);
                else
                    param[input.name] = input.value;
            });


            //Validadion de Estado de BAJA 
            if (param.vehc_icod_estado === intBaja.toString() && $("#vehc_fecha_baja").val() === '') {
                $("#vehc_fecha_baja").addClass("invalid-Input");
                alert("Ingrese Fecha de Baja");
                return;
            }

            //NOMBRE DE LAS UBICACIONES 
            var param2 = {
                vehc_departamento: $("#txtDepartamento option:selected").text(),
                vehc_provincia: $("#txtProvincia option:selected").text(),
                vehc_distrito: $("#txtDistrito option:selected").text()
            }


            const data = { ...param, ...param2 }
            webApp.JsonParam(urlGuardar, data, function (response) {
                if (response.Success) {
                    swal("Correcto!", response.Message, "success");
                    dataTableVehiculo.ajax.reload();
                    modal.modal('hide');
                }
                else {
                    swal("Alerta!", response.Message, "warning");
                }
            })
        });

        $("#txtDepartamento").on('change', (e) => {
            $("#ubicc_icod_ubigeo").val($("#txtDepartamento").val())
            $("#txtProvincia").empty();
            comboProvincia();
            comboDistrito();
        })

        $("#vehc_fecha_baja").on('change', (e) => {
            $("#vehc_fecha_baja").removeClass("invalid-Input");
        })


        $("#txtProvincia").on('change', (e) => {
            $("#ubicc_icod_ubigeo").val($("#txtProvincia").val())
            $("#txtDistrito").empty();
            comboDistrito();
        })

        $("#txtDistrito").on('change', (e) => {
            $("#ubicc_icod_ubigeo").val($("#txtDistrito").val())
        })


        $("#vehc_icod_marca").on('change', (e) => {
            $("#vehc_icod_modelo").empty();
            comboModelo();
        })
    }

    var fDesFormatDeciamls = (numero) => {
        return numero.replace(",", "");
    }

    var fSetvalues = (Data) => {
        Object.entries(Data).forEach(([key, value]) => {
            $("#" + `${key}`).val(`${value}`);
            if (key === 'vehc_icod_marca')
                comboModelo();
            if (key === 'ubicc_icod_ubigeo') {
                if (value !== 0)
                    setUbicaciones(value);
                else {
                    $("#txtDepartamento").val(0)
                    $("#txtProvincia").val(0)
                    $("#txtDistrito").val(0)
                }

            }

        })

        //FECHAS
        $("#vehc_sfecha_registro").val(Data.str_sfecha_registro);
        $("#vehc_sfecha_inicio_operaciones").val(Data.str_sfecha_inicio_operaciones);
        $("#vehc_fecha_entrega_pnp").val(Data.str_fecha_entrega_pnp);
        $("#vehc_fecha_baja").val(Data.str_fecha_baja);

        //NUMERICOS
        $("#vehc_ncosto_adquisicion").val(fFomaterDecimals($("#vehc_ncosto_adquisicion").val()));
        $("#vehc_nvalor_asegurado").val(fFomaterDecimals($("#vehc_nvalor_asegurado").val()));
        $("#vehc_nmonto_deducible").val(fFomaterDecimals($("#vehc_nmonto_deducible").val()));
        $("#vehc_dcosto_unidad").val(fFomaterDecimals($("#vehc_dcosto_unidad").val()));

    }

    var fFomaterDecimals = (numero) => {
        numero = numero + "00";
        return numero.replace(/\D/g, "")
            .replace(/([0-9])([0-9]{2})$/, '$1.$2')
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
    }




    var ConfigurarDataTable = function () {
        $.extend($.fn.dataTable.defaults, {
            language: { url: urlDatatableLanguage },
            pageLength: 10,

        });
    };

    var visualizarDataTableVehiculo = function () {
        dataTableVehiculo = $('#DataTableVehiculo').DataTable({
            bFilter: false,
            bProcessing: true,
            serverSide: false,
            scrollCollapse: true,
            scrollX: true,
            ajax: {
                url: urlListarVehiculo,
                type: "POST",
                data: function (request) {
                    request.filter = new Object();
                    request.filter = {
                        placa: $("#txtplaca").val(),
                        fechaIncio: $("#txtFechaDesde").val(),
                        fechaFin: $("#txtfechaHasta").val(),
                        estado: $("#txtEstado").val(),
                    }
                }
            },
            bAutoWidth: false,
            columns: [
                {
                    data: function (obj) {
                        return '<a class="btn-Actualizar"  href="#"><i class="fas fa-edit"></i></a>'
                    }
                },
                { data: "strClase" },
                { data: "vehc_vplaca" },
                { data: "vehc_vplaca_rodaje" }, // render: $.fn.dataTable.render.number(',', '.', 2)
                { data: "strMarca" },
                { data: "strModelo" },
                { data: "strMotor" },
                { data: "vehc_vvin" },
                { data: "vehc_departamento" },
                { data: "vehc_provincia" },
                { data: "vehc_distrito" },
                { data: "vehc_latitud" },
                { data: "vehc_longitud" },
                { data: "vehc_dcosto_unidad" },
                { data: "vehc_icod_anio" },
                { data: "anioEntregaPNP" },
                { data: "str_fecha_entrega_pnp" },
                { data: "str_sfecha_inicio_operaciones" },
                { data: "vehc_vnumero_poliza" },
                { data: "vehc_vnumero_certificado" },
                { data: "strEstado" },
                { data: "str_fecha_baja" },
                { data: "vehc_motivo_baja" },
            ],
            "aoColumnDefs": [
                { "bSortable": false, "className": "text-center hidden-500", "aTargets": [0], "width": "3%" },
                { "className": "center hidden-120", "aTargets": [1], "width": "6%" },
                { "className": "center hidden-120", "aTargets": [2], "width": "5%" },
                { "className": "text-right hidden-120", "aTargets": [3], "width": "6%" },
                { "className": "text-right hidden-120", "aTargets": [4], "width": "6%" },
                { "className": "hidden-120", "aTargets": [5], "width": "6%" },
                { "className": "hidden-120", "aTargets": [6], "width": "6%" },
                { "className": "hidden-120", "aTargets": [7], "width": "6%" },
                { "className": "hidden-120", "aTargets": [8], "width": "6%" },
                { "className": "hidden-120", "aTargets": [9], "width": "6%" },
                { "className": "hidden-120", "aTargets": [10], "width": "6%" },
                { "className": "hidden-120", "aTargets": [11], "width": "6%" },
                { "className": "hidden-120", "aTargets": [12], "width": "6%" },
                { "className": "hidden-120", "aTargets": [13], "width": "6%" },
                { "className": "hidden-120", "aTargets": [14], "width": "6%" },
                { "className": "hidden-120", "aTargets": [15], "width": "6%" },
                { "className": "hidden-120", "aTargets": [16], "width": "6%" },
                { "className": "hidden-120", "aTargets": [17], "width": "6%" },
                { "className": "hidden-120", "aTargets": [18], "width": "6%" },
                { "className": "hidden-120", "aTargets": [19], "width": "6%" },
                { "className": "hidden-120", "aTargets": [20], "width": "6%" },
                { "className": "hidden-120", "aTargets": [21], "width": "6%" },
                { "className": "hidden-120", "aTargets": [22], "width": "6%" }

            ],
            "order": [[0, "ASC"]],
        });
    };


    var comboMotivo = function () {
        webApp.Ajax({
            url: urlListarMotivo,
            async: false
        }, function (response) {
            $("#cboMotivo").append('<option value="0">SELECCIONAR</option>');
            $.each(response.Data, function (index, item) {
                $("#cboMotivo").append('<option value="' + item.tarec_iid_tabla_registro + '">' + item.tarec_vdescripcion + '</option>');
            });
            $("#cboMotivo").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var fCargarCombos = () => {


        webApp.Ajax({
            url: urlListarCombos,
            async: false
        }, function (response) {
            $.each(response.Data, function (index, item) {
                if (item.tablc_iid_tipo_tabla === lkpEstado)
                    $("#vehc_icod_estado").append('<option value="' + item.tarec_iid_tabla_registro + '">' + item.tarec_vdescripcion + '</option>');

                if (item.tablc_iid_tipo_tabla === lkpSituacion)
                    $("#vehc_icod_situacion").append('<option value="' + item.tarec_iid_tabla_registro + '">' + item.tarec_vdescripcion + '</option>');

                if (item.tablc_iid_tipo_tabla === lkpUbicacion)
                    $("#ubicc_icod_ubicacion").append('<option value="' + item.tarec_iid_tabla_registro + '">' + item.tarec_vdescripcion + '</option>');

                if (item.tablc_iid_tipo_tabla === lkpMotivoBaja)
                    $("#vehc_icod_baja").append('<option value="' + item.tarec_iid_tabla_registro + '">' + item.tarec_vdescripcion + '</option>');

            });
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });




    }

    var comboEstado = function () {
        webApp.Ajax({

            url: urlListarEstado,
            async: false

        }, function (response) {
            $("#txtEstado").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#txtEstado").append('<option value="' + item.tarec_iid_tabla_registro + '">' + item.estado + '</option>');
            });
            $("#txtEstado").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var comboDepatamento = function () {
        webApp.Ajax({
            url: urlListarDepartamento,
            async: false,

        }, function (response) {
            $.each(response.Data, function (index, item) {
                $("#txtDepartamento").append('<option value="' + item.ubicc_icod_ubicacion + '">' + item.ubicc_vnombre_ubicacion + '</option>');
            });
            $("#txtDepartamento").val("");

        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var comboProvincia = function () {

        var parametro = { cod: $("#txtDepartamento option:selected").val() };
        webApp.Ajax({
            url: urlListarProvincia,
            async: false,
            parametros: parametro
        }, function (response) {
            $.each(response.Data, function (index, item) {
                $("#txtProvincia").append('<option value="' + item.ubicc_icod_ubicacion + '">' + item.ubicc_vnombre_ubicacion + '</option>');
            });
            $("#txtProvincia").val("");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var comboDistrito = () => {
        var parametro = { cod: $("#txtProvincia option:selected").val() };
        webApp.Ajax({
            url: urlListarDistrito,
            async: false,
            parametros: parametro
        }, function (response) {
            $.each(response.Data, function (index, item) {
                $("#txtDistrito").append('<option value="' + item.ubicc_icod_ubicacion + '">' + item.ubicc_vnombre_ubicacion + '</option>');
            });
            $("#txtDistrito").val("");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var comboMarca = () => {
        $("#vehc_icod_marca").append('<option value=0>NINGUNO...</option>');
        webApp.Ajax({
            url: urlListarMarca,
            async: false,
            parametros: null
        }, function (response) {
            $.each(response.Data, function (index, item) {
                $("#vehc_icod_marca").append('<option value="' + item.marc_icod_marca + '">' + item.marc_vdescripcion + '</option>');
            });
            $("#vehc_icod_marca").val(0)
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var comboModelo = () => {
        $("#vehc_icod_modelo").append('<option value=0>NINGUNO...</option>');
        var parametro = { cod: $("#vehc_icod_marca option:selected").val() };
        webApp.Ajax({
            url: urlListarModelo,
            async: false,
            parametros: parametro
        }, function (response) {
            $.each(response.Data, function (index, item) {
                $("#vehc_icod_modelo").append('<option value="' + item.modc_icod_modelo + '">' + item.modc_vdescripcion + '</option>');
            });
            $("#vehc_icod_modelo").val(0)
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var comboAnio = () => {
        $("#vehc_icod_anio").append('<option value=0>NINGUNO...</option>');
        webApp.Ajax({
            url: urlListarAnio,
            async: false,
            parametros: null
        }, function (response) {
            $.each(response.Data, function (index, item) {
                $("#vehc_icod_anio").append('<option value="' + item.anioc_icod_anio + '">' + item.strAnio + '</option>');
            });
            $("#vehc_icod_anio").val(0)
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var fCargarUbicaciones = function () {
        webApp.Ajax({
            url: urlGetUbicaciones,
            async: false
        }, function (response) {
            Ubicaciones = response.Data;
        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var setUbicaciones = function (val) {

        var tipo, padre, abuelo, bisabuelo;

        const found = Ubicaciones.find(element => element.ubicc_icod_ubicacion === val);
        tipo = found.tablc_iid_tipo_ubicacion;
        padre = found.ubicc_icod_ubicacion_padre;


        switch (tipo) {
            case 3:
                $("#txtDepartamento").val(val)
                break;
            case 2:

                const found2 = Ubicaciones.find(element => element.ubicc_icod_ubicacion === padre);
                abuelo = found2.ubicc_icod_ubicacion_padre;

                $("#txtDepartamento").val(padre)
                comboProvincia();

                $("#txtProvincia").val(val)

                break;
            case 1:
                const found3 = Ubicaciones.find(element => element.ubicc_icod_ubicacion === padre);
                abuelo = found3.ubicc_icod_ubicacion_padre;

                $("#txtDepartamento").val(abuelo)
                comboProvincia();
                $("#txtProvincia").val(padre)
                comboDistrito();
                $("#txtDistrito").val(val)
                break;
        }
    }


    return {
        init: function () {
            ConfigurarDataTable();
            checkSession(function () {
                fCargarUbicaciones();
                fCargarCombos();
                visualizarDataTableVehiculo();
                comboMotivo();
                eventos();
                comboEstado();
                comboDepatamento();
                comboMarca();
                comboModelo();
                comboAnio();
            });
        }
    }

}(jQuery);

function buscar(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla === 13) {
        checkSession(function () {
            dataTableVehiculo.ajax.reload();
        });
    }
}


function initializaDate() {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    var ToDate = mm + '/' + dd + '/' + yyyy;
    $('#txtFechaDesde').datepicker('setDate', ToDate);
    $('#txtfechaHasta').datepicker('setDate', ToDate);
}


function fClearFechaEntregaPNP() {
    $('#vehc_fecha_entrega_pnp').val(null)
}

function fClearFechaBaja() {
    $('#vehc_fecha_baja').val(null)
}