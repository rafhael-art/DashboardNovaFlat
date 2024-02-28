using AutoMapper;
using Dashboard.Common;
using Dashboard.Common.DataTable;
using Dashboard.Model.Entites;
using Dashboard.NovaFlat.Core;
using Dashboard.NovaFlat.Models;
using Dashboard.NovaFlat.Util;
using Dashboard.UseCase.UseCase.AnexoIV.Queries.EstadoSelect;
using Dashboard.UseCase.UseCase.Common.Queries.DepartamentoSelect;
using Dashboard.UseCase.UseCase.Common.Queries.DistritoSelect;
using Dashboard.UseCase.UseCase.Common.Queries.LocalidadListar;
using Dashboard.UseCase.UseCase.Common.Queries.MantenimientoSelect;
using Dashboard.UseCase.UseCase.Common.Queries.ProvinciaSelect;
using Dashboard.UseCase.UseCase.Common.Queries.RepuestoSelect;
using Dashboard.UseCase.UseCase.Common.Queries.UnidadFlotaSelect;
using Dashboard.UseCase.UseCase.UnidadFlota.Queries.HistorialListar;
using Dashboard.UseCase.UseCase.UnidadFlota.Queries.UnidadFlotaListar;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Dashboard.NovaFlat.Controllers
{
    [Authorize]
    public class UnidadFlotaController : BaseController
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public UnidadFlotaController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Lista(DataTableModel<UnidadFlotaModelFilter, int> dataTableModel)
        {
            try
            {
                var query = _mapper.Map<UnidadFlotaListarQuery>(dataTableModel);
                var data = await _mediator.Send(query);
                dataTableModel.data = data;
                if (data.Any())
                {
                    dataTableModel.recordsTotal = data.ElementAt(0).cantidad;
                    dataTableModel.recordsFiltered = dataTableModel.recordsTotal;
                }

                query._Rows = int.MaxValue;
                var data_Imprimir = (await _mediator.Send(query)).ToList();
                WebSession.ReporteUnidadFlota = data_Imprimir;
            }
            catch (Exception ex)
            {
                string error = ex.Message;
                dataTableModel.data = new List<UnidadFlota>();
            }

            return Json(dataTableModel);
        }

        [HttpPost]
        public async Task<JsonResult> ListaHistorial(DataTableModel<UnidadHistorialModelFilter, int> dataTableModel)
        {
            try
            {
                var query = _mapper.Map<HistorialListarQuery>(dataTableModel);
                var data = (await _mediator.Send(query)).ToList();
                dataTableModel.data = data;
                if (data.Count() > 0)
                {
                    dataTableModel.recordsTotal = data[0].cantidad;
                    dataTableModel.recordsFiltered = dataTableModel.recordsTotal;
                }
            }
            catch (Exception ex)
            {
                string error = ex.Message;
                dataTableModel.data = null;
            }

            return Json(dataTableModel);
        }


        [HttpPost]
        public ActionResult ExportXlsx()
        {
            var dataImpresion = ImpresionData(WebSession.ReporteUnidadFlota.ToList());
            var workbook = ClosedXmlGenerator<UnidadFlotaImprimirModel>.GenerateWorkBook_UnidadFlota(dataImpresion);
            return new ExcelResult(workbook, "ReporteUnidadFlota", 1);
        }

        [HttpPost]
        public ActionResult ExportXls()
        {
            var dataImpresion = ImpresionData(WebSession.ReporteUnidadFlota.ToList());
            var workbook = ClosedXmlGenerator<UnidadFlotaImprimirModel>.GenerateWorkBook_UnidadFlota(dataImpresion);
            return new ExcelResult(workbook, "ReporteUnidadFlota", 2);
        }


        [HttpPost]
        public async Task<JsonResult> GetLocalidad()
        {
            var jsonResponse = new jsonResponse { Success = true };

            try
            {
                var unidadFlotas = (await _mediator.Send(new LocalidadListarQuery())).ToList();

                var data = unidadFlotas
                    .GroupBy(p => p.localidad)
                    .Select(k => k.Key)
                    .ToList();

                jsonResponse.Data = data;
            }
            catch
            {
                jsonResponse.Success = false;
                jsonResponse.Message = Mensajes.IntenteloMasTarde;
            }

            return Json(jsonResponse);
        }

        [HttpPost]
        public async Task<JsonResult> GetDepartamento()
        {
            var jsonResponse = new jsonResponse { Success = true };

            try
            {
                var Departamentos = (await _mediator.Send(new DepartamentoSelectQuery())).ToList();
                jsonResponse.Data = Departamentos;
            }
            catch
            {
                jsonResponse.Success = false;
                jsonResponse.Message = Mensajes.IntenteloMasTarde;
            }

            return Json(jsonResponse);
        }
        public class ParametroProvincia
        {
            public int cod { get; set; }
        }
        [HttpPost]
        public async Task<JsonResult> GetProvincia(ParametroProvincia request)
        {
            var jsonResponse = new jsonResponse { Success = true };

            try
            {
                var Provincias = (await _mediator.Send(new ProvinciaSelectQuery() { ICOD_DEPARTAMENTO = request.cod })).ToList();
                jsonResponse.Data = Provincias;
            }
            catch
            {
                jsonResponse.Success = false;
                jsonResponse.Message = Mensajes.IntenteloMasTarde;
            }

            return Json(jsonResponse);
        }


        [HttpPost]
        public async Task<JsonResult> GetDistrito(ParametroProvincia request)
        {
            var jsonResponse = new jsonResponse { Success = true };

            try
            {
                var Provincias = (await _mediator.Send(new DistritoSelectQuery() { ICOD_DEPARTAMENTO = request.cod })).ToList();
                jsonResponse.Data = Provincias;
            }
            catch
            {
                jsonResponse.Success = false;
                jsonResponse.Message = Mensajes.IntenteloMasTarde;
            }

            return Json(jsonResponse);
        }


        [HttpPost]
        public async Task<JsonResult> GetCodRespuesto()
        {
            var jsonResponse = new jsonResponse { Success = true };

            try
            {
                var CodRepuesto = (await _mediator.Send(new RepuestoSelectQuery())).ToList();

                jsonResponse.Data = CodRepuesto;
            }
            catch
            {
                jsonResponse.Success = false;
                jsonResponse.Message = Mensajes.IntenteloMasTarde;
            }

            return Json(jsonResponse);
        }


        [HttpPost]
        public async Task<JsonResult> GetMantenimiento()
        {
            var jsonResponse = new jsonResponse { Success = true };

            try
            {
                var CodRepuesto = (await _mediator.Send(new MantenimientoSelectQuery())).ToList();

                jsonResponse.Data = CodRepuesto;
            }
            catch
            {
                jsonResponse.Success = false;
                jsonResponse.Message = Mensajes.IntenteloMasTarde;
            }

            return Json(jsonResponse);
        }

        [HttpPost]
        public async Task<JsonResult> GetUbicacion()
        {
            var jsonResponse = new jsonResponse { Success = true };

            try
            {
                var unidadFlotas = (await _mediator.Send(new UnidadFlotaSelectQuery())).ToList();

                var data = unidadFlotas
                    .GroupBy(p => p.ubicacion)
                    .Select(k => k.Key)
                    .ToList();

                jsonResponse.Data = data;
            }
            catch
            {
                jsonResponse.Success = false;
                jsonResponse.Message = Mensajes.IntenteloMasTarde;
            }

            return Json(jsonResponse);
        }

        [HttpPost]
        public async Task<JsonResult> GetClase()
        {
            var jsonResponse = new jsonResponse { Success = true };

            try
            {
                var unidadFlotas = (await _mediator.Send(new LocalidadListarQuery())).ToList(); ;

                var data = unidadFlotas
                    .GroupBy(p => p.clase)
                    .Select(k => k.Key)
                    .ToList();

                jsonResponse.Data = data;
            }
            catch
            {
                jsonResponse.Success = false;
                jsonResponse.Message = Mensajes.IntenteloMasTarde;
            }

            return Json(jsonResponse);
        }

        [HttpPost]
        public async Task<JsonResult> GetMarca()
        {
            var jsonResponse = new jsonResponse { Success = true };

            try
            {
                var unidadFlotas = (await _mediator.Send(new LocalidadListarQuery())).ToList(); ;

                var data = unidadFlotas
                    .GroupBy(p => p.marca)
                    .Select(k => k.Key)
                    .ToList();

                jsonResponse.Data = data;
            }
            catch
            {
                jsonResponse.Success = false;
                jsonResponse.Message = Mensajes.IntenteloMasTarde;
            }

            return Json(jsonResponse);
        }

        [HttpPost]
        public async Task<JsonResult> GetModelo()
        {
            var jsonResponse = new jsonResponse { Success = true };

            try
            {
                var unidadFlotas = (await _mediator.Send(new LocalidadListarQuery())).ToList(); ;

                var data = unidadFlotas
                    .GroupBy(p => p.modelo)
                    .Select(k => k.Key)
                    .ToList();

                jsonResponse.Data = data;
            }
            catch
            {
                jsonResponse.Success = false;
                jsonResponse.Message = Mensajes.IntenteloMasTarde;
            }

            return Json(jsonResponse);
        }

        [HttpPost]
        public async Task<JsonResult> GetEstadoUnidad()
        {
            var jsonResponse = new jsonResponse { Success = true };

            try
            {
                var unidadFlotas = (await _mediator.Send(new EstadoSelectQuery()));
                jsonResponse.Data = unidadFlotas;
            }
            catch
            {
                jsonResponse.Success = false;
                jsonResponse.Message = Mensajes.IntenteloMasTarde;
            }

            return Json(jsonResponse);
        }

        [HttpPost]
        public async Task<JsonResult> GetAnio()
        {
            var jsonResponse = new jsonResponse { Success = true };

            try
            {
                var unidadFlotas = (await _mediator.Send(new LocalidadListarQuery())).ToList(); ;
                int anioInicio = Convert.ToInt32(unidadFlotas.Min(p => p.anio));
                int anioFin = Convert.ToInt32(unidadFlotas.Max(p => p.anio));
                List<Anio> listAnio = new List<Anio>();
                while (anioInicio <= anioFin)
                {
                    listAnio.Add(new Anio
                    {
                        IdAnio = anioInicio,
                        valorAnio = anioInicio
                    });
                    anioInicio++;
                }

                jsonResponse.Data = listAnio.OrderByDescending(p => p.IdAnio).ToList();
            }
            catch
            {
                jsonResponse.Success = false;
                jsonResponse.Message = Mensajes.IntenteloMasTarde;
            }

            return Json(jsonResponse);
        }

        private List<UnidadFlotaImprimirModel> ImpresionData(List<UnidadFlota> data)
        {
            List<UnidadFlotaImprimirModel> unidadFlotas = new List<UnidadFlotaImprimirModel>();

            foreach (UnidadFlota unidad in data)
            {
                unidadFlotas.Add(new UnidadFlotaImprimirModel
                {
                    Localidad = unidad.localidad,
                    Ubicacion = unidad.ubicacion,
                    placa_rodaje = unidad.placa_rodaje,
                    Placa = unidad.placa,
                    Clase = unidad.clase,
                    Marca = unidad.marca,
                    Modelo = unidad.modelo,
                    Anio = unidad.anio,
                    Estado = unidad.estado,
                    numero_poliza = unidad.numero_poliza,
                    numero_certificado = unidad.numero_certificado,
                    valor_asegurado = unidad.valor_asegurado,
                    monto_deducido = unidad.monto_deducido,
                    fecha_inicio_operacion = unidad.fecha_inicio_operacion!.Contains("1900") ? "" : unidad.fecha_inicio_operacion,
                    ufc_dcosto_unidad = unidad.ufc_dcosto_unidad
                });

            }
            return unidadFlotas;
        }
    }
}

