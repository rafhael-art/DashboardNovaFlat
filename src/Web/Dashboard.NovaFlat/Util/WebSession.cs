using System.Text.Json;
using Dashboard.Model.Entites;
using Dashboard.NovaFlat.Models;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.NovaFlat.Util;

public class WebSession : ControllerBase
{




    public void SetUserSession(UsuarioModel user)
    {
        var userJson = JsonSerializer.Serialize(user);
        HttpContext.Session.SetString(Constantes.UsuarioSesion, userJson);
    }

    public UsuarioModel GetUserSession()
    {
        return JsonSerializer.Deserialize<UsuarioModel>(HttpContext.Session.GetString(Constantes.UsuarioSesion)!)!;
    }


    public void SetOpcionesSession(IEnumerable<Opciones> opciones)
    {
        var opcionesJson = JsonSerializer.Serialize(opciones);
        HttpContext.Session.SetString(Constantes.OpcionSesion, opcionesJson);
    }



}