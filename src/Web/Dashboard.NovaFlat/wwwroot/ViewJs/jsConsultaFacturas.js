const urlDescargarPDF = baseUrl + "AnexoIV/DescargarPDF";
const urlGetAnios = baseUrl + "ConsultaFacturas/GetAnios";
const urlGetMeses = baseUrl + "ConsultaFacturas/GetMeses";
const urlGetFacturas = baseUrl + "ConsultaFacturas/GetFacturas";
const urlListarTabla = baseUrl + 'AnexoV/Lista';
const urlExportarXlsx = baseUrl + 'ConsultaFacturas/Exportar_Xlsx'
const urlValidarStorage = baseUrl + "AnexoIV/ValidarStorage";
var dataTable, lstAnios, lstMeses, lstFacturas;
var FilterPromises;
var evento;
$(function () {
    fConfigurarDataTable();
    fCombos();

});

function eventoChange() {
    if ($("#txtNumEvento").val() === "")
        return
    if (evento === $("#txtNumEvento").val())
        return;
    evento = $("#txtNumEvento").val()
    dataTable.ajax.reload();
}

async function fCombos() {
    const anios = await fCargarAnios();
    fSetAnios(anios);
    var y = new Date().getFullYear();
    $("#txtAnioFactura").val(y.toString());
    const meses = await fCargarMeses();
    fSetMeses(meses);
    var fecha = new Date();
    var mes = fecha.getMonth();
    $("#txtMesFactura").val(mes + 1);
    const facturas = await fCargarFacturas();
    fSetFacturas(facturas);
    fVisualizarDataTable();
    fSelectTable();
}

function fConfigurarDataTable() {
    $.extend($.fn.dataTable.defaults, {

        language: { url: urlDatatableLanguage },
        pageLength: 10,

    });
};

async function fReloadCbMeses() {
    const meses = await fCargarMeses();
    fSetMeses(meses);
    fReloadFacturas();
}

async function fReloadFacturas() {

    const facturas = await fCargarFacturas();
    fSetFacturas(facturas);
}

async function fReloadMeses() {
    const meses = await fCargarMeses();
    fSetMeses(meses);
}

function fCargarAnios() {

    return new Promise((resolved, reject) => {
        $("#txtAnioFactura").append('<option value="0">AÑOS</option>');
        fetch(urlGetAnios)
            .then(function (res) {
                return res.json();
            })
            .then(function (miJson) {
                resolved(miJson);
            })
    });
}

$("#txtAnioFactura").on('change', (e) => {
    fReloadMeses();
    fReloadFacturas();
    dataTable.ajax.reload();
});

$("#txtMesFactura").on('change', (e) => {
    fReloadFacturas();
    dataTable.ajax.reload();
});

$("#txtFlat").on('change', (e) => {
    fReloadFacturas();
    dataTable.ajax.reload();
});



$("#txtFacturas").on('change', (e) => {
    dataTable.ajax.reload();
});

$("#DataTable tbody").on("click", "a.btn-verPDFFactura", function () {
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

$("#DataTable tbody").on("click", "a.btn-verPDFRepuesto", function () {
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


//$("#txtNumEvento").on('change', (e) => {
//        dataTable.ajax.reload();
//});




function fCargarMeses() {
    return new Promise((resolved, reject) => {
        var Data = {
            anio: $("#txtAnioFactura").val()
        }

        $("#txtMesFactura").append('<option value="0">MESES</option>');
        fetch(urlGetMeses, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
        })
            .then(function (res) {
                return res.json();
            }).then(function (miJson) {
                resolved(miJson)
            })
    });
}



function fCargarFacturas() {
    return new Promise((resolved, reject) => {
        var Data = {
            anio: $("#txtAnioFactura").val(),
            mes: $("#txtMesFactura").val(),
            flat: $("#txtFlat").val(),
        }

        $("#txtFacturas").append('<option value="0">FACTURA</option>');
        fetch(urlGetFacturas, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
        })
            .then(function (res) {
                return res.json();
            }).then(function (miJson) {
                resolved(miJson)
            })
    });
}





function fVisualizarDataTable() {
    dataTable = $('#DataTable').DataTable({
        bFilter: false,
        bProcessing: true,
        serverSide: false,
        scrollCollapse: true,
        scrollX: true,
        ajax: {
            url: urlListarTabla,
            type: "POST",
            data: function (request) {
                request.filter = new Object();
                request.filter = {
                    AnioFactura: $("#txtAnioFactura").val(),
                    MesFactura: $("#txtMesFactura").val(),
                    Factura: $("#txtFacturas").val(),
                    Flat: $("#txtFlat").val(),
                    NumEvento: $("#txtNumEvento").val(),
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

            { "data": "KmIngresoTaller" },
            { "data": "CodRepuesto" },
            {
                "data": function (obj) {
                    return '<p data-toggle="tooltip" title="' + obj.Descripcion + '">' + obj.Descripcion.toString().substring(0, 10) + '... </p>'
                }
            },
            { "data": "CostoSinIGV", render: $.fn.dataTable.render.number(',', '.', 2) },
            { "data": "KmUltimoCambio", render: $.fn.dataTable.render.number(',', '.', 0) },
            { "data": "KmVidaUtilReal", render: $.fn.dataTable.render.number(',', '.', 0) },
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
        ],
        order: [[0, "ASC"]],
        fnDrawCallback: function (oSettings) {
            $('[data-toggle="tooltip"]').tooltip();
        },
        error: function (x, y) {
            console.log(x)
        }
    });
};

function fSetAnios(lstAnios) {
    $("#txtAnioFactura").empty();
    for (var i = 0; i < lstAnios.length; i++) {
        $("#txtAnioFactura").append('<option value="' + lstAnios[i] + '">' + lstAnios[i] + '</option>');
    }
}

function fSetMeses(lstMeses) {
    $("#txtMesFactura").empty();
    $("#txtMesFactura").append('<option value=0>TODOS</option>');
    for (var i = 0; i < lstMeses.length; i++) {
        $("#txtMesFactura").append('<option value="' + lstMeses[i].intMes + '">' + lstMeses[i].mes + '</option>');
    }

    $("#txtMesFactura").val(0);
}


function fSetFacturas(lstFacturas) {
    $("#txtFacturas").empty();
    $("#txtFacturas").append('<option value="0">TODOS</option>');
    for (var i = 0; i < lstFacturas.length; i++) {
        $("#txtFacturas").append('<option value="' + lstFacturas[i] + '">' + lstFacturas[i] + '</option>');
    }
    $("#txtFacturas").val("0");

}

function fSelectTable() {
    $('#DataTable tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        else {
            dataTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });
}

function debounce(callback, wait) {
    let timerId;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback(...args);
        }, wait);
    };
}