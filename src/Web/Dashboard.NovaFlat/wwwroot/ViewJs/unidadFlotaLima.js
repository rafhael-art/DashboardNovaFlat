var urlListarUnidadFlota = baseUrl + 'UnidadFlotaLima/Lista';
var urlListarUnidadHistorial = baseUrl + 'UnidadFlotaLima/ListaHistorial';
var urlListarLocalidad = baseUrl + 'UnidadFlotaLima/GetLocalidad';
var urlListarUbicacion = baseUrl + 'UnidadFlotaLima/GetUbicacion';
var urlListarClase = baseUrl + 'UnidadFlotaLima/GetClase';
var urlListarEstadoUnidad = baseUrl + 'UnidadFlotaLima/GetEstadoUnidad';
var urlListarAnio = baseUrl + 'UnidadFlotaLima/GetAnio';
var urlListaReportefooter = baseUrl + 'Dashboard/ObtnerReporteXEstadoUnidadLima';
var dataTableUnidadFlota = null;
var dataTableUnidadHistorial = null;
var dni_searcht = "";
var idUnidadFlota = 0;
var UnidadFlotaLima = function () {
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
            $("#txtestado").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#txtestado").append('<option value="' + item.estado + '">' + item.estado + '</option>');
            });
            $("#txtestado").val("0");
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }


    var comboAnio = function () {
        webApp.Ajax({
            url: urlListarAnio,
            async: false
        }, function (response) {
            $("#selecAnio").append('<option value="0">TODOS</option>');
            $.each(response.Data, function (index, item) {
                $("#selecAnio").append('<option value="' + item.IdAnio + '">' + item.valorAnio + '</option>');
            });
            $("#selecAnio").val(0);
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var footer = function () {
        var divfooter = $("#footer-estadoUnidad");
        var body = "";
        divfooter.html('');
        webApp.Ajax({
            url: urlListaReportefooter,
        }, function (response) {

            if (response.Data != null) {
                if (response.Data.length <= 4) {
                    $.each(response.Data, function (index, item) {
                        body = ' <div class="col-sm-3 col-6">';
                        body += '<div class="description-block border-right">';
                        body += '<h5 class="description-header">' + item.Cantidad + '</h5>';
                        body += '<span class="description-text">' + item.ufc_vestado + '</span>';
                        body += '</div>';
                        body += '</div>';
                        divfooter.append(body);
                    });
                } else {
                    $.each(response.Data, function (index, item) {
                        body = ' <div class="col-sm-2 col-3">';
                        body += '<div class="description-block border-right">';
                        body += '<h5 class="description-header">' + item.Cantidad + '</h5>';
                        body += '<span class="description-text">' + item.ufc_vubicacion + '</span>';
                        body += '</div>';
                        body += '</div>';
                        divfooter.append(body);
                    });
                }
            }

        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }

    var generarAnios = function () {
        var date = new Date();
        var anioActual = date.getFullYear();
        var anioInicio = 2018;
        while (anioInicio <= anioActual) {
            $("#selecAnio").append("<option id='" + anioInicio + "'>" + anioInicio + "</option>");
            anioInicio++;
        }
        $("#selecAnio").val(anioActual);
    }

    var evento = function () {


        $('#DataTableUnidadFLota').on('search.dt', function () {
            var value = $('.dataTables_filter input').val();
            dni_searcht = value;
        });

        $("#txtclase,#txtestado,#selecAnio").on("change", function () {
            checkSession(function () {
                dataTableUnidadFlota.ajax.reload();
            });
        });

        $("#DataTableUnidadFLota tbody ").on("click", "a#btn-verhistoria", function () {
            let idUnidad = $(this).attr("data-id");
            let descripcion = $(this).attr("data-descripcion");
            if (idUnidad != null && idUnidad != "" && typeof idUnidad != "undefined") {
                idUnidadFlota = idUnidad;
                checkSession(function () {
                    dataTableUnidadHistorial.ajax.reload();
                });
                $("#tile-historial").text(descripcion.toUpperCase());
                $("#modal-xl").modal('show');
            }
        });

        $("#btn-buscar,#btn-refrescar-cabezera").on("click", function () {
            checkSession(function () {
                dataTableUnidadFlota.ajax.reload();
            });
        });


        $("#btn-buscar-historial,#btn-refrescar-historial").on("click", function () {
            checkSession(function () {
                dataTableUnidadHistorial.ajax.reload();
            });
        });


        //ver detalle de observacion
        $("#DataTableUnidadHistorial tbody").on("click", "a.btn-verDetalle", function () {
            var tr = $(this).closest('tr');
            var row = dataTableUnidadHistorial.row(tr);
            var appendRow = '';
            if (row.length > 0) {
                var trabajo = row.data().uhd_vdescripcion_trabajo;
                var documento = row.data().uhd_vdocumento_ingreso;
                var kilometraje = row.data().uhd_vkilometraje;
                //var precio = row.data().uhd_dcosto;
                var tipoMantinimiento = row.data().uhd_tipo_mantenimiento;
                var cobertura = row.data().uhd_vcobertura;
                if (row.child.isShown()) {
                    row.child.hide();
                    tr.removeClass('shown');
                    $(this).find('i').removeClass('fa-chevron-circle-up');
                    $(this).find('i').addClass('fa-chevron-circle-down');
                    $(this).css("color", "green");
                }
                else {

                    appendRow = '<strong>Orden de Reparación </strong> : <span>' + documento + '</span> <br />';
                    appendRow += '<strong>Kilometraje </strong> : <span>' + kilometraje + '</span><br />';
                    appendRow += '<strong>Descripción de trabajo </strong> : <span>' + trabajo + '</span> <br />';
                    //appendRow += '<strong>Precio </strong> : <span>S/ ' + precio + '</span> <br />';
                    //Nuevo             
                    appendRow += '<strong>Tipo Mantenimiento </strong> : <span>' + tipoMantinimiento + '</span> <br />';
                    appendRow += '<strong>Cobertura </strong> : <span>' + cobertura + '</span> <br />';

                    row.child(appendRow).show();
                    tr.addClass('shown');
                    $(this).find('i').removeClass('fa-chevron-circle-down');
                    $(this).find('i').addClass('fa-chevron-circle-up');
                    $(this).css("color", "red");
                }
            }
        });

        //webApp.validarNumerico(['nroDocumento']);
        $("#nroDocumento").focus();


    }

    var ConfigurarDataTable = function () {

        $.extend($.fn.dataTable.defaults, {
            language: { url: urlDatatableLanguage },
            pageLength: 10,
            //"bProcessing": false,
            //"dom": 'fltip'
        });
    };

    var visualizarDataTableUnidadFlota = function () {
        dataTableUnidadFlota = $('#DataTableUnidadFLota').DataTable({
            "bFilter": false,
            "bProcessing": true,
            "serverSide": true,
            "ajax": {
                "url": urlListarUnidadFlota,
                "type": "POST",
                "data": function (request) {
                    request.filter = new Object();
                    request.filter = {
                        Clase: $("#txtclase").val(),
                        Placa: $("#txtplaca").val(),
                        EstadoUnidad: $("#txtestado").val(),
                        valueAnio: $("#selecAnio").val()
                    }
                }
            },
            "bAutoWidth": false,
            "columns": [
                { "data": "placa" },
                { "data": "placa_rodaje" },
                { "data": "clase" },
                { "data": "marca" },
                { "data": "modelo" },
                { "data": "anio" },
                { "data": "estado" },
                { "data": "numero_poliza" },
                { "data": "numero_certificado" },
                { "data": "valor_asegurado" },
                { "data": "fecha_inicio_operacion" },
                {
                    "data": function (obj) {
                        return '<a id="btn-verhistoria" data-descripcion="' + obj.marca + " - " + obj.modelo + " - " + obj.anio + " - " + obj.placa + '" data-id="' + obj.id + '"  href="#"><i class="fas fa-clipboard-list"></i></a>'
                    }
                }
            ],
            //"aoColumnDefs": [
            //    { "className": "center hidden-120", "aTargets": [0], "width": "15%" },
            //    { "className": "center hidden-120", "aTargets": [1], "width": "15%" },
            //    { "className": "center hidden-120", "aTargets": [2], "width": "13%" },
            //    { "className": "center hidden-120", "aTargets": [3], "width": "13%" },
            //    { "className": "center hidden-120", "aTargets": [4], "width": "8%" },
            //    { "className": "center hidden-992", "aTargets": [5], "width": "10%" },
            //    { "className": "center hidden-200", "aTargets": [6], "width": "10%" },
            //    { "className": "center hidden-400", "aTargets": [7], "width": "10%" },
            //    { "className": "center hidden-500", "aTargets": [8], "width": "10%" },
            //    { "className": "center hidden-400", "aTargets": [9], "width": "10%" },
            //    { "className": "center hidden-500", "aTargets": [10], "width": "10%" },
            //    { "bSortable": false, "className": "text-center hidden-500", "aTargets": [11], "width": "3%" }
            //],
            "order": [[0, "ASC"]],
        });
    };

    var visualizarDataTableUnidadHistorial = function () {
        dataTableUnidadHistorial = $('#DataTableUnidadHistorial').DataTable({
            "bFilter": false,
            "bProcessing": true,
            "serverSide": true,
            "ajax": {
                "url": urlListarUnidadHistorial,
                "type": "POST",
                "data": function (request) {
                    request.filter = new Object();
                    request.filter = {
                        idUnidad: idUnidadFlota,
                        taller: $("#txttaller").val(),
                        situacion: $("#txtsituacion").val()
                    }
                }
            },
            "bAutoWidth": false,
            "columns": [
                {
                    "data": function (obj) {
                        return obj.uhd_dfecha.toString().substring(0, 10);
                    }
                },
                { "data": "uhd_vreporte_averia" },
                {
                    "data": function (obj) {
                        return obj.uhd_dfecha_ingreso_taller;
                    }
                },
                { "data": "uhd_vtaller" },
                {
                    "data": function (obj) {
                        return obj.uhd_dfecha_salida_taller;
                    }
                },
                //{ "data": "uhd_dcosto", render: $.fn.dataTable.render.number(',', '.', 2) },
                { "data": "uhd_vsituacion" },
                {
                    "data": function (obj) {
                        return '<a href="javascript:void(0)" style="color:green" class="btn-verDetalle"><i class="fa fa-chevron-circle-down"></i></a>';
                    }
                }
            ],
            "aoColumnDefs": [
                { "className": "center hidden-120", "aTargets": [0], "width": "8%" },
                { "className": "center hidden-120", "aTargets": [1], "width": "30%" },
                { "className": "center hidden-120", "aTargets": [2], "width": "6%" },
                { "className": "center hidden-992", "aTargets": [3], "width": "25%" },
                { "className": "center hidden-200", "aTargets": [4], "width": "6%" },
                // { "className": "center hidden-400", "aTargets": [5], "width": "5%" },
                { "className": "center hidden-500", "aTargets": [5], "width": "6%" },
                { "bSortable": false, "className": "center hidden-500", "aTargets": [6], "width": "4%" }
            ],
            "order": [[0, "ASC"]],
        });
    };

    return {
        init: function () {
            ConfigurarDataTable();
            checkSession(function () {
                comboClase();
                comboEstadoUnidad();
                comboAnio();
                visualizarDataTableUnidadFlota();
                visualizarDataTableUnidadHistorial();
                evento();
                footer();
            });

        }
    }
}(jQuery);

function buscar(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) {
        //if ($('#UnidadFlotaForm').valid()) {
        checkSession(function () {
            dataTableUnidadFlota.ajax.reload();
        });
        //}
    }
}

function buscarHistorial(e) {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 13) {
        //if ($('#UnidadFlotaForm').valid()) {
        checkSession(function () {
            dataTableUnidadHistorial.ajax.reload();
        });
        //}
    }
}