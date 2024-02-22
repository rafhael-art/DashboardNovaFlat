using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Dashboard.NovaFlat.Core;
using Dashboard.UseCase.UseCase.Login.Queries.GetOptionsByUser;
using Dashboard.UseCase.UseCase.Login.Queries.GetUserByUserAndPassword;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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
    }
}

