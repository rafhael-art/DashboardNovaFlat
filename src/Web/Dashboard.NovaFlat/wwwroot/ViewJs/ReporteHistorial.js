var urlListarReporteHistorial = baseUrl + 'ReporteHistorialUnidad/ListaReporte';
var urlDescargarExcelXlsx = baseUrl + 'ReporteHistorialUnidad/Export';
var urlListarLocalidad = baseUrl + 'UnidadFlota/GetLocalidad';
var urlListarUbicacion = baseUrl + 'UnidadFlota/GetUbicacion';
var urlListarClase = baseUrl + 'UnidadFlota/GetClase';
var urlListarEstadoUnidad = baseUrl + 'UnidadFlota/GetEstadoUnidad';
var urlListarMarca = baseUrl + 'UnidadFlota/GetMarca';
var urlListarModelo = baseUrl + 'UnidadFlota/GetModelo';
var urlListarEstadoReparacion = baseUrl + 'ReporteHistorialUnidad/GetEstadoRecuperacion';
var urlListarConceptoHistorial = baseUrl + 'ReporteHistorialUnidad/ListaConceptoHistorial';
var urlListarConcepto = baseUrl + 'ReporteHistorialUnidad/GetConcepto';
var urlExportarXlsx = baseUrl + 'ReporteHistorialUnidad/Concepto_ExportXlsx';
var urlExportarXls = baseUrl + 'ReporteHistorialUnidad/Concepto_ExportXls';
var urlListarRepuestoHistorial = baseUrl + 'ReporteHistorialUnidad/ListaRespuestoHistorial';
var urlListarRepuesto = baseUrl + 'ReporteHistorialUnidad/GetRepuesto';
var urlExportar_repuesto_Xlsx = baseUrl + 'ReporteHistorialUnidad/Repuesto_Exportar_Xlsx';
var urlExportar_repuesto_Xls = baseUrl + 'ReporteHistorialUnidad/Repuesto_Exportar_Xls';
var dataTableReporteHistorial = null;
var selection = [];
var selection_repuesto = [];

var ReporteHistorial = function () {


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

    var comboReparacion = function () {
        webApp.Ajax({
            url: urlListarEstadoReparacion,
            async: false
        }, function (response) {
            $("#txtreparacion").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#txtreparacion").append('<option value="' + item.situacion + '">' + item.situacion + '</option>');
            });
            $("#txtreparacion").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var comboConcepto = function () {
        webApp.Ajax({
            url: urlListarConcepto,
            async: false
        }, function (response) {
            $("#cboConcepto").html('');
            //$("#txtreparacion").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#cboConcepto").append('<option value="' + item.cohc_iid_concepto + '">' + item.cohc_vconcepto + '</option>');
            });
            //$("#txtreparacion").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });

        $('#cboConcepto').multiselect({
            columns: 2,
            search: true,
            enableFiltering: true,
            includeSelectAllOption: true,
            enableFiltering: true,
            maxHeight: 350,
            dropUp: false,
            selectAllValue: 'multiselect-all',
            onSelectAll: function (element, checked) {
                var brands = $('#cboConcepto option:selected');
                var selected = [];
                $(brands).each(function (index, brand) {
                    selected.push([$(this).val()]);
                });
                selection = selected;
            },
            onDeselectAll: function (element, checked) {
                selection = [];
            },
            onChange: function (element, checked) {
                var brands = $('#cboConcepto option:selected');
                var selected = [];
                $(brands).each(function (index, brand) {
                    selected.push([$(this).val()]);
                });
                selection = selected;
            }
        });
    }

    var comboRepuesto = function () {
        webApp.Ajax({
            url: urlListarRepuesto,
            async: false
        }, function (response) {
            $("#cboRepuesto").html('');
            //$("#txtreparacion").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#cboRepuesto").append('<option value="' + item.rc_icod_repuestos + '">' + item.rc_vdescripcion + '</option>');
            });
            //$("#txtreparacion").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });

        $('#cboRepuesto').multiselect({
            columns: 2,
            search: true,
            enableFiltering: true,
            includeSelectAllOption: true,
            enableFiltering: true,
            maxHeight: 350,
            dropUp: false,
            selectAllValue: 'multiselect-all',
            nonSelectedText:'Ningun repuesto seleccionado',
            onSelectAll: function (element, checked) {
                var brands = $('#cboRepuesto option:selected');
                var selected = [];
                $(brands).each(function (index, brand) {
                    selected.push([$(this).val()]);
                });
                selection_repuesto = selected;
            },
            onDeselectAll: function (element, checked) {
                selection_repuesto = [];
            },
            onChange: function (element, checked) {
                var brands = $('#cboRepuesto option:selected');
                var selected = [];
                $(brands).each(function (index, brand) {
                    selected.push([$(this).val()]);
                });
                selection_repuesto = selected;
            }
        });
    }


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

        $("#btn-buscar,#btn-refrescar").on("click", function () {
            checkSession(function () {
                dataTableReporteHistorial.ajax.reload();
            });
        });

        //ver detalle de observacion
        $("#DataTableReporteHistorial tbody").on("click", "a.btn-verDetalle", function () {
            var tr = $(this).closest('tr');
            var row = dataTableReporteHistorial.row(tr);
            var appendRow = '';
            if (row.length > 0) {
                var documento = row.data().uhd_vdocumento_ingreso;
                var kilometraje = row.data().uhd_vkilometraje;
                var fechaEstimada = row.data().uhd_dfecha_estimada.toString();
                var anio = row.data().ufc_vanio;
                var proveedor = row.data().uhd_vtaller;
                var preciServicio = row.data().uhd_dcosto;
                var estadoUnidad = row.data().ufc_vestado;
                var tipo_mantenimiento = row.data().uhd_tipo_mantenimiento;
                var cobertura = row.data().uhd_vcobertura;
                var hora_ingreso = row.data().uhd_thora_ingreso;
                var hora_salida = row.data().uhd_thora_salida;
                var costo_unidad = row.data().ufc_dcosto_unidad;
                var uhd_thora_inoperativa = row.data().uhd_thora_inoperativa;
                if (row.child.isShown()) {
                    row.child.hide();
                    tr.removeClass('shown');
                    $(this).find('i').removeClass('fa-chevron-circle-up');
                    $(this).find('i').addClass('fa-chevron-circle-down');
                    $(this).css("color", "green");
                }
                else {

                    appendRow = '<strong>Orden de Reparación </strong> : <span>' + documento + '</span> <br />';
                    appendRow += '<strong>Año </strong> : <span>' + anio + '</span> <br />';
                    appendRow += '<strong>Kilometraje </strong> : <span>' + kilometraje + '</span><br />';
                    //appendRow += '<strong>Fecha de estimada </strong> : <span>' + fechaEstimada + '</span> <br />';
                    appendRow += '<strong>Proveedor </strong> : <span>' + proveedor + '</span> <br />';
                    appendRow += '<strong>Precio servicio </strong> : <span>S/ ' + preciServicio + '</span> <br />';
                    appendRow += '<strong>Estado unidad </strong> : <span>' + estadoUnidad + '</span> <br />';
                    appendRow += '<strong>Tipo Mantenimiento </strong> : <span>' + tipo_mantenimiento + '</span> <br />';
                    appendRow += '<strong>Hora Ingreso </strong> : <span>' + hora_ingreso + '</span> <br />';
                    appendRow += '<strong>Hora Salida </strong> : <span>' + hora_salida + '</span> <br />';
                    appendRow += '<strong>Cobertura </strong> : <span>' + cobertura + '</span> <br />';
                    appendRow += '<strong>Costo de la Unidad </strong> : <span>' + costo_unidad + '</span> <br />';
                    appendRow += '<strong>Hora inoperativa </strong> : <span>' + uhd_thora_inoperativa + '</span> <br />';
                    row.child(appendRow).show();
                    tr.addClass('shown');
                    $(this).find('i').removeClass('fa-chevron-circle-down');
                    $(this).find('i').addClass('fa-chevron-circle-up');
                    $(this).css("color", "red");
                }
            }
        });

        $("#txtlocalidad,#txtubicacion,#txtclase,#txtunidad,#txtmarca,#txtmodelo ,#txtreparacion").on("change", function () {
            checkSession(function () {
                dataTableReporteHistorial.ajax.reload();
            });
        });

        moment.locale('es');
        var fecha = new Date();
        $('#txtFechaIncio').daterangepicker({
            singleDatePicker: true,
            locale: options.locale,
            startDate: "01/11/2019"
        });

        $('#txtFechaFinal').daterangepicker({
            singleDatePicker: true,
            locale: options.locale
            //startDate: moment()
        });

        $("#DataTableReporteHistorial tbody ").on("click", "a#btn-concepto", function () {
            let idUnidad = $(this).attr("data-id");
            let descripcion = $(this).attr("data-descripcion");

            if (idUnidad != null && idUnidad != "" && typeof idUnidad != "undefined") {
                $("#tile-historial").text(descripcion.toUpperCase());
                //obtener conceptos
                obtenerConcepto(idUnidad);
                $("#modal-concepto").modal('show');
            }
        });

        $("#DataTableReporteHistorial tbody ").on("click", "a#btn-repuesto", function () {
            let idUnidad = $(this).attr("data-id");
            let descripcion = $(this).attr("data-descripcion");

            if (idUnidad != null && idUnidad != "" && typeof idUnidad != "undefined") {
                $("#tile-repuesto").text(descripcion.toUpperCase());
                //obtener repuesto
                obtenerRepuesto(idUnidad);
                $("#modal-repuesto").modal('show');
            }
        });


        $("#btn-reporteConceto").on("click", function () {


            var fecha = new Date();
            $('#txtfechaInicio').daterangepicker({
                singleDatePicker: true,
                locale: options.locale,
                startDate: "01/11/2019"
            });

            $('#txtfechaFin').daterangepicker({
                singleDatePicker: true,
                locale: options.locale
                //startDate: moment()
            });

            $("#modal-reporte-concepto").modal('show');

            $("#btn-exportar-xlsx").on("click", function () {

                if (selection.length > 0) {
                    var param = "?ids=" + selection.toString() + "&fechaI=" + $("#txtfechaInicio").val() + "&fechaF=" + $("#txtfechaFin").val();
                    location.href = urlExportarXlsx + param;
                } else {
                    swal("Alerta!", 'Por favor seleccionar concepto.', "warning");
                }


            });

            $("#btn-exportar-xls").on("click", function () {
                if (selection.length > 0) {
                    var param = "?ids=" + selection.toString() + "&fechaI=" + $("#txtfechaInicio").val() + "&fechaF=" + $("#txtfechaFin").val();
                    location.href = urlExportarXls + param;
                } else {
                    swal("Alerta!", 'Por favor seleccionar concepto.', "warning");
                }


            });
        });


        $("#btn-reporteRepuesto").on("click", function () {

            var fecha = new Date();
            $('#txtfechaInicio_repuesto').daterangepicker({
                singleDatePicker: true,
                locale: options.locale,
                startDate: "01/11/2019"
            });

            $('#txtfechaFin_repuesto').daterangepicker({
                singleDatePicker: true,
                locale: options.locale
                //startDate: moment()
            });

            $("#modal-reporte-repuesto").modal('show');

            $("#btn-exportar-xlsx-repuesto").on("click", function () {

                if (selection_repuesto.length > 0) {
                    var param = "?ids=" + selection_repuesto.toString() + "&fechaI=" + $("#txtfechaInicio_repuesto").val() + "&fechaF=" + $("#txtfechaFin_repuesto").val();
                    location.href = urlExportar_repuesto_Xlsx + param;
                } else {
                    swal("Alerta!", 'Por favor seleccionar repuesto.', "warning");
                }


            });

            $("#btn-exportar-xls-repuesto").on("click", function () {
                if (selection_repuesto.length > 0) {
                    var param = "?ids=" + selection_repuesto.toString() + "&fechaI=" + $("#txtfechaInicio_repuesto").val() + "&fechaF=" + $("#txtfechaFin_repuesto").val();
                    location.href = urlExportar_repuesto_Xls + param;
                } else {
                    swal("Alerta!", 'Por favor seleccionar repuesto.', "warning");
                }


            });
        });


    };

    var ConfigurarDataTable = function () {

        $.extend($.fn.dataTable.defaults, {
            language: { url: urlDatatableLanguage },
            pageLength: 10,
            //"bProcessing": false,
            //"dom": 'fltip'
        });
    };

    var visualizarDataTableReporteHistorial = function () {
        dataTableReporteHistorial = $('#DataTableReporteHistorial').DataTable({
            "bFilter": false,
            "bProcessing": true,
            "serverSide": true,
            "ajax": {
                "url": urlListarReporteHistorial,
                "type": "POST",
                "data": function (request) {
                    request.filter = new Object();
                    request.filter = {
                        _ufc_vclase: $("#txtclase").val(),
                        _ufc_vplaca: $("#txtplaca").val(),
                        _ufc_vmarca: $("#txtmarca").val(),
                        _ufc_vmodelo: $("#txtmodelo").val(),
                        _ufc_vestado: $("#txtunidad").val(),
                        _ufc_vlocalidad: $("#txtlocalidad").val(),
                        _ufc_vubicacion: $("#txtubicacion").val(),
                        _ufc_estado_recuperacion: $("#txtreparacion").val(),
                        _uhd_dfecha_ingreso_taller: $("#txtFechaIncio").val(),
                        _uhd_dfecha_salida_taller: $("#txtFechaFinal").val()
                    }
                }
            },
            "bAutoWidth": false,
            "columns": [
                { "data": "ufc_vplaca" },
                { "data": "ufc_vclase" },
                { "data": "ufc_vmarca" },
                { "data": "ufc_vmodelo" },
                { "data": "ufc_vlocalidad" },
                { "data": "ufc_vubicacion" },
                {
                    "data": function (obj) {
                        return obj.uhd_dfecha_ingreso_taller;
                    }
                },
                {
                    "data": function (obj) {
                        return obj.uhd_dfecha_salida_taller;
                    }
                },
                { "data": "uhd_vdescripcion_trabajo" },
                { "data": "uhd_vsituacion" },
                {
                    "data": function (obj) {
                        return '<a href="javascript:void(0)" style="color:green" class="btn-verDetalle"><i class="fa fa-chevron-circle-down"></i></a>';
                    }
                },

                {
                    "data": function (obj) {
                        return '<a id="btn-concepto" data-descripcion="' + obj.ufc_vmarca + " - " + obj.ufc_vmodelo + " - " + obj.ufc_vanio + " - " + obj.ufc_vplaca + '" data-id="' + obj.uhd_iid_unidad_hitorial + '"  href="#"><i class="fas fa-money-check-alt"></i></a>'
                    }
                },
                {
                    "data": function (obj) {
                        return '<a id="btn-repuesto" data-descripcion="' + obj.ufc_vmarca + " - " + obj.ufc_vmodelo + " - " + obj.ufc_vanio + " - " + obj.ufc_vplaca + '" data-id="' + obj.uhd_iid_unidad_hitorial + '"  href="#"><i class="fas fa-money-check-alt"></i></a>'
                    }
                }
            ],
            "aoColumnDefs": [
                { "className": "center hidden-120", "aTargets": [0], "width": "5%" },
                { "className": "center hidden-120", "aTargets": [1], "width": "4%" },
                { "className": "center hidden-120", "aTargets": [2], "width": "6%" },
                { "className": "center hidden-992", "aTargets": [3], "width": "10%" },
                { "className": "center hidden-200", "aTargets": [4], "width": "8%" },
                { "className": "center hidden-400", "aTargets": [5], "width": "8%" },
                { "className": "center hidden-500", "aTargets": [6], "width": "8%" },
                { "className": "center hidden-500", "aTargets": [7], "width": "8%" },
                { "className": "center hidden-500", "aTargets": [8], "width": "30%" },
                { "className": "center hidden-500", "aTargets": [9], "width": "10%" },
                { "bSortable": false, "className": "center hidden-500", "aTargets": [10], "width": "3%" },
                { "bSortable": false, "className": "text-center hidden-500", "aTargets": [11], "width": "3%" },
                { "bSortable": false, "className": "text-center hidden-500", "aTargets": [12], "width": "3%" }

            ],
            "order": [[0, "ASC"]],
        });
    };

    var obtenerConcepto = function (id) {
        var htmlConcepto = $("#content-concepto");
        htmlConcepto.html('');
        var bodyTabla = "";
        webApp.Ajax({
            url: urlListarConceptoHistorial,
            async: false,
            parametros: { IdHistorial: id }
        }, function (response) {
            if (response.Data != null) {
                $.each(response.Data, function (index, item) {
                    bodyTabla = "<tr>";
                    bodyTabla += "<td>" + item.cohc_vconcepto + "</td>";
                    bodyTabla += "<td><span> S/ " + item.hxud_ncosto + " </span></td>";
                    bodyTabla += "</tr>";
                    htmlConcepto.append(bodyTabla);
                });
            }
            else {
                bodyTabla = "<tr><td class='text-center'>Ningún dato disponible para mostrar.</td></tr>"
                htmlConcepto.append(bodyTabla);
            }

        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var obtenerRepuesto = function (id) {
        var htmlRespuesto = $("#content-repuesto");
        htmlRespuesto.html('');
        var bodyTabla = "";
        webApp.Ajax({
            url: urlListarRepuestoHistorial,
            async: false,
            parametros: { IdHistorial: id }
        }, function (response) {
            if (response.Data != null) {
                $.each(response.Data, function (index, item) {
                    bodyTabla = "<tr>";
                    bodyTabla += "<td>" + item.rc_vnumero + "</td>";
                    bodyTabla += "<td>" + item.rc_vdescripcion + "</td>";
                    bodyTabla += "<td>" + item.chd_icantidad + "</td>";
                    bodyTabla += "<td><span> S/ " + item.chd_nprecio_unitario + " </span></td>";
                    bodyTabla += "<td><span> S/ " + item.chd_nprecio_total + " </span></td>";
                    bodyTabla += "</tr>";
                    htmlRespuesto.append(bodyTabla);
                });
            }
            else {
                bodyTabla = "<tr><td colspan='5'class='dataTables_empty'>Ningún dato disponible para mostrar</td></tr>"
                    //< td valign = "top" colspan = "11" class="dataTables_empty" > Ningún dato disponible para mostrar.</td >
                htmlRespuesto.append(bodyTabla);
            }

        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    return {
        init: function () {
            ConfigurarDataTable();
            checkSession(function () {
                visualizarDataTableReporteHistorial();
                comboLocalidad();
                comboUbicacion();
                comboClase();
                comboEstadoUnidad();
                comboMarca();
                comboModelo();
                comboReparacion();
                comboConcepto();
                comboRepuesto();
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
            dataTableReporteHistorial.ajax.reload();
        });
        //}
    }
}