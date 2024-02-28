using System.Security.Claims;
using Dashboard.Common;
using Dashboard.NovaFlat.Core;
using Dashboard.NovaFlat.Util;
using Dashboard.UseCase.UseCase.Login.Queries.GetOptionsByUser;
using Dashboard.UseCase.UseCase.ReporteEstadoUnidad.Queries;
using Dashboard.UseCase.UseCase.ReporteEstadoUnidadLima;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.NovaFlat.Controllers
{
    [Authorize]
    public class DashboardController : BaseController
    {

        private readonly IMediator _mediator;

        public DashboardController(IMediator mediator)
        {
            _mediator = mediator;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> ObtnerReporteXEstadoUnidad()
        {
            var jsonResponse = new jsonResponse { Success = true };

            try
            {
                var reporteXEstados = (await _mediator.Send(new ReporteEstadoUnidadQuery())).ToList();
                if (reporteXEstados.Count > 0)
                    jsonResponse.Data = reporteXEstados;
                else
                    jsonResponse.Data = null;

            }
            catch
            {
                jsonResponse.Success = false;
                jsonResponse.Data = null;
                jsonResponse.Message = Mensajes.IntenteloMasTarde;
            }

            return Json(jsonResponse);
        }

        [HttpPost]
        public async Task<JsonResult> ObtnerReporteXEstadoUnidadLima()
        {
            var jsonResponse = new jsonResponse { Success = true };

            try
            {
                var reporteXEstados = (await _mediator.Send(new ReporteEstadoUnidadLimaQuery())).ToList();
                if (reporteXEstados.Count > 0)
                    jsonResponse.Data = reporteXEstados;
                else
                    jsonResponse.Data = null;

            }
            catch
            {
                jsonResponse.Success = false;
                jsonResponse.Data = null;
                jsonResponse.Message = Mensajes.IntenteloMasTarde;
            }

            return Json(jsonResponse);
        }
    }
}

