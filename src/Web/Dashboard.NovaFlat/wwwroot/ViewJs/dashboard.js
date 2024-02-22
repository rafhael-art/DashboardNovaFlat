var urlListaReporteHeader = baseUrl + 'Dashboard/ObtnerReporteXEstadoUnidad';

var dashboard = function () {


    var header = function () {
        var divHeader = $("#resumenReporte");
        var body = "";
        webApp.Ajax({
            url: urlListarClase,
            async: false
        }, function (response) {

            $.each(response.Data, function (index, item) {
                body = '<div class="col-md-3 col-sm-6 col-xs-12">';
                body += '<div class="info-box">';
                body += '<span class="info-box-icon bg-info"><i class="fas fa-car"></i></span>';
                body += '<div class="info-box-content">';
                body += ' <span class="info-box-text">Total</span>';
                body += '';
                body += '';
                body += '';
                body += '';
                body += '';
                body += '';
                body += '';
                body += '';
            });
        }, function (response) {

        }, function (XMLHttpRequest, textStatus, errorThrown) {

        });
    }


    var chart1 = function () {

        Highcharts.chart('container_1', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Stacked column chart'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'John',
                data: [5, 3, 4, 7, 2]
            }, {
                name: 'Jane',
                data: [2, 2, 3, 2, 1]
            }, {
                name: 'Joe',
                data: [3, 4, 4, 2, 5]
            }]
        });
    }

    return {
        init: function () {
            chart1();
        }
    }
}(jQuery);


