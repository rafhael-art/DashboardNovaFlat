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

        public async Task<IActionResult> Index()
        {
            var currentUser = GetNombreUser();
            ViewData["nombreUsuario"] = currentUser.Item1;
            var opciones = await _mediator.Send(new GetOptionsByUserQuery { idUsuario = currentUser.Item2 });

            return View(opciones);
        }

        private (string, int) GetNombreUser()
        {
            ClaimsPrincipal claimsUser = HttpContext.User;
            string nombreUser = "";
            int id = 0;
            if (claimsUser.Identity!.IsAuthenticated)
            {
                nombreUser = claimsUser.Claims.Where(x => x.Type == ClaimTypes.Name)
                    .Select(c => c.Value).SingleOrDefault()!;
                id = Convert.ToInt32(claimsUser.Claims.Where(x => x.Type == ClaimTypes.Email)
                    .Select(c => c.Value).SingleOrDefault()!);
            }
            return (nombreUser, id);
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

