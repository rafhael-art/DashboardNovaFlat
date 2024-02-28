using System.Security.Claims;
using AutoMapper;
using Dashboard.Model.Entites;
using Dashboard.NovaFlat.Core;
using Dashboard.NovaFlat.Models;
using Dashboard.UseCase.UseCase.Login.Queries.GetOptionsByUser;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Dashboard.Common;
using Dashboard.Common.DataTable;
using Newtonsoft.Json;
using Dashboard.UseCase.UseCase.AnexoV.Queries.AnexoVLista;
using Dashboard.UseCase.UseCase.Common.Queries.FacturaSelect;

namespace Dashboard.NovaFlat.Controllers;
[Authorize]
public class AnexoVController : Controller
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public AnexoVController(IMapper mapper, IMediator mediator)
    {
        _mapper = mapper;
        _mediator = mediator;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    public async Task<JsonResult> Lista(DataTableModel<AnexoVModelFilter, int> dataTableModel)
    {

        try
        {
            var query = _mapper.Map<AnexoVListaQuery>(dataTableModel);
            dataTableModel.data = (await _mediator.Send(query)).ToList();

            HttpContext.Session.SetString("lstA5", JsonConvert.SerializeObject(dataTableModel.data));
        }
        catch (Exception ex)
        {
            string error = ex.Message;
            dataTableModel.data = new List<AnexoIV>();
        }

        return Json(dataTableModel);
    }

    [HttpPost]
    public async Task<JsonResult> GetFacturas()
    {
        var jsonResponse = new jsonResponse { Success = true };
        try
        {
            jsonResponse.Data = (await _mediator.Send(new FacturaSelectQuery()))
                                .ToList()
                                .Select(x => x.Factura)
                                .ToList();
        }
        catch (Exception ex)
        {
            string error = ex.Message;
            jsonResponse.Data = new List<AnexoIV>();
        }

        return Json(jsonResponse);
    }

    [HttpPost]
    public JsonResult GetAnios()
    {
        var jsonResponse = new jsonResponse { Success = true };
        try
        {
            List<int> anios = new List<int>();
            int inicial = 2015;
            int final = DateTime.Now.Year + 1;
            for (int i = inicial; i <= final; i++)
            {
                anios.Add(i);
            }
            jsonResponse.Data = anios;
        }
        catch (Exception ex)
        {
            string error = ex.Message;
            jsonResponse.Data = new List<AnexoIV>();
        }

        return Json(jsonResponse);
    }


    public async Task<ActionResult> Exportar_Xlsx(string fechaI, string fechaF, string localidad, string ubicacion, string placa, string clase, string marca, string modelo, string estado, int departamento, int provincia, string mantenimiento, string NumEvento, string Factura, string MesFactura, string AnioFactura)
    {
        var query = new AnexoVListaQuery
        {
            fechaInico = fechaI,
            fechaFinal = fechaF,
            placa = placa,
            clase = clase,
            id_departamento = departamento,
            id_provincia = provincia,
            Factura = Factura,
            MesFactura = Convert.ToInt32(MesFactura),
            AnioFactura = Convert.ToInt32(AnioFactura),
            NumEvento = string.IsNullOrEmpty(NumEvento) ? 0 : Convert.ToInt32(NumEvento)
        };
        var list = (await _mediator.Send(query)).ToList();

        var model = _mapper.Map<List<AnexoVModel>>(list);
        var workbook = ClosedXmlGenerator<AnexoVModel>.WorkBook_AnexoV(model);
        return new ExcelResult(workbook, "Reporte_AnexoV", 1);
    }
}

