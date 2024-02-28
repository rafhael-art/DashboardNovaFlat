using Dashboard.Model.Entites;
using Dashboard.NovaFlat.Core;
using Dashboard.NovaFlat.Util;
using Dashboard.UseCase.UseCase.ActualizarPassword.Commands;
using Dashboard.UseCase.UseCase.Login.Queries.GetUserByUserAndPassword;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.NovaFlat.Controllers;

[Authorize]
public class ActualizacionContraseñaController : BaseController
{
    private readonly IMediator _mediator;

    public ActualizacionContraseñaController(IMediator mediator)
    {
        _mediator = mediator;
    }

    public IActionResult Index()
    {
        return View();
    }

    public async Task<JsonResult> ObtenerUsuario()
    {
        GetUserByUserAndPasswordQuery query = new() { _pass = WebSession.Usuario.Password, _Usuario = WebSession.Usuario.Username };
        Usuario userData = await _mediator.Send(query);
        userData.u_vpassword = EncriptarSide.decod(userData.u_vpassword!);
        EUsuario usuario = new()
        {
            usua_icod_usuario = userData.u_iid_usuario,
            usua_nombre_usuario = userData.u_vnombre,
            usua_password_usuario = userData.u_vpassword,
            usua_codigo_usuario = userData.u_vUsername
        };
        return Json(usuario);
    }

    public async Task<JsonResult> ActualizarContraseña(EUsuario data)
    {
        string resp;
        try
        {

            data.usua_password_usuario = EncriptarSide.codec(data.usua_password_usuario!);
            ActualizarPasswordQuery query = new()
            {
                usua_icod_usuario = data.usua_icod_usuario,
                usua_password_usuario = data.usua_password_usuario
            };
            await _mediator.Send(query);
            resp = Mensajes.ActualizacionSatisfactoria;
        }
        catch (Exception)
        {

            throw;
        }

        return Json(resp);
    }
}