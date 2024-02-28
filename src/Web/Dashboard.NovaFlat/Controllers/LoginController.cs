using Dashboard.NovaFlat.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Dashboard.Common;
using Dashboard.NovaFlat.Util;
using MediatR;
using Dashboard.UseCase.UseCase.Login.Queries.GetUserByUserAndPassword;
using Dashboard.Model.Entites;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Dashboard.NovaFlat.Core;
using Microsoft.Extensions.Logging;
using Dashboard.UseCase.UseCase.Login.Queries.GetOptionsByUser;

namespace Dashboard.NovaFlat.Controllers;

public class LoginController : BaseController
{
    private readonly IMediator _mediator;

    public LoginController(IMediator mediator)
    {
        _mediator = mediator;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpPost]
    [AllowAnonymous]
    public async Task<ActionResult> Index(UsuarioLogin usuario)
    {
        try
        {
            var jsonResponse = new jsonResponse() { Success = false };

            jsonResponse = await IniciariSesion(usuario);


            if (jsonResponse.Success && !jsonResponse.Warning)
            {
                return RedirectToAction(Constantes.HomeAction, Constantes.HomeController);
            }
            else if (jsonResponse.Warning)
            {
                ViewBag.MessageError = jsonResponse.Message;
            }
            else if (!jsonResponse.Success)
            {
                ViewBag.MessageError = jsonResponse.Message;
            }
        }
        catch (Exception exception)
        {
            ViewBag.MessageError = exception.Message;
        }
        return View(usuario);

    }

    public async Task<IActionResult> LogOut()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return RedirectToAction("Index", "Login");
    }

    public async Task<jsonResponse> IniciariSesion(UsuarioLogin loginDTO)
    {
        var jsonResponse = new jsonResponse { Success = true };

        try
        {

            string passwordencriptado = codec(loginDTO.Password!.Trim());
            var query = new GetOptionsbyUser() { _pass = passwordencriptado, _Usuario = loginDTO.Username };
            var usuario = await _mediator.Send(query);

            if (usuario.u_vUsername != null)
            {
                var usuarioDTO = UsuarioDTO(usuario);
                jsonResponse.Data = usuarioDTO;
                await GenerarTickectAutenticacion(HttpContext, usuarioDTO);
            }
            else
            {
                jsonResponse.Warning = true;
                jsonResponse.Message = Mensajes.UsuarioNoExiste;
            }

        }
        catch (Exception ex)
        {
            jsonResponse.InnerExepcion = ex.Message;
            jsonResponse.Success = false;
            jsonResponse.Message = Mensajes.IntenteloMasTarde;
        }

        return jsonResponse;
    }

    private async Task GenerarTickectAutenticacion(HttpContext httpContext, UsuarioLogin usuarioDTO)
    {
        List<Claim> claims = new List<Claim>()
        {
        new Claim(ClaimTypes.Name, usuarioDTO.Username!),
        new Claim(ClaimTypes.Email, usuarioDTO.Id.ToString()!)
        };

        ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        AuthenticationProperties properties = new AuthenticationProperties()
        {
            AllowRefresh = true
        };
        await httpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity),
            properties
        );

        WebSession.Usuario = usuarioDTO;
        WebSession.opciones = await _mediator.Send(new GetOptionsByUserQuery { idUsuario = usuarioDTO.Id });
    }


    [HttpPost]
    public JsonResult VerifySession()
    {
        var jsonResponse = new jsonResponse { Success = true };

        return Json(jsonResponse);
    }

    public string codec(string pswd)
    {
        string key = "";
        string ProcessedKey = "";
        for (int i = 0; i < pswd.Length; i++)
        {
            key = key + EncriptarSide.CaseSwitchIn(pswd.Substring(i, 1));
        }

        ProcessedKey = EncriptarSide.Encriptar(key, "pass3Dg@r1986", "3Dg@rClNto", "MD5", 2, "@1A2b3C4d5E6f7G8", 128);
        return ProcessedKey;
    }
    private UsuarioLogin UsuarioDTO(Usuario usuario)
    {
        UsuarioLogin dto = new UsuarioLogin();
        dto.Id = usuario.u_iid_usuario;
        dto.Username = usuario.u_vUsername;
        dto.RolId = usuario.u_iid_Rol;
        dto.Password = usuario.u_vpassword;
        dto.Nombre = usuario.u_vnombre;
        dto.Apellidos = usuario.u_vapellidos;
        return dto;
    }
}

