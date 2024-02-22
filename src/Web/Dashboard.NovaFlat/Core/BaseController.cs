using System;
using Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Text;
using Dashboard.Common;

namespace Dashboard.NovaFlat.Core;

public class BaseController : Controller
{


    protected JsonResult MensajeError(string mensaje = "Ocurrio un error al cargar...")
    {
        Response.StatusCode = 404;
        return Json(new jsonResponse { Message = mensaje });
    }

    public string Decode(string token)
    {
        string functionReturnValue = "";
        int x = 0;
        int y = 0;
        string abfrom = "";
        string abto = "";

        for (x = 0; x <= 25; x++)
        {
            abfrom = abfrom + ((char)(65 + x)).ToString();
        }
        for (x = 0; x <= 25; x++)
        {
            abfrom = abfrom + ((char)(97 + x)).ToString();
        }
        for (x = 0; x <= 9; x++)
        {
            abfrom = abfrom + Convert.ToString(x);
        }

        abto = abfrom.Substring(16, abfrom.Length - 16) + abfrom.Substring(0, 16);
        for (x = 0; x < token.Length; x++)
        {
            y = abto.IndexOf(token.Substring(x, 1));
            if (y == 0)
            {
                functionReturnValue = functionReturnValue + token.Substring(x, 1);
            }
            else
            {
                functionReturnValue = functionReturnValue + abfrom.Substring(y, 1);
            }
        }

        return functionReturnValue;
    }

    public string Encode(string valor)
    {
        string functionReturnValue = "";
        int x = 0;
        int y = 0;
        string abfrom = "";
        string abto = "";

        for (x = 0; x <= 25; x++)
        {
            abfrom = abfrom + ((char)(65 + x)).ToString();
        }
        for (x = 0; x <= 25; x++)
        {
            abfrom = abfrom + ((char)(97 + x)).ToString();
        }
        for (x = 0; x <= 9; x++)
        {
            abfrom = abfrom + Convert.ToString(x);
        }

        abto = abfrom.Substring(16, abfrom.Length - 16) + abfrom.Substring(0, 16);
        for (x = 0; x < valor.Length; x++)
        {
            y = abfrom.IndexOf(valor.Substring(x, 1));
            if (y < 0)
            {
                functionReturnValue = functionReturnValue + valor.Substring(x, 1);
            }
            else
            {
                functionReturnValue = functionReturnValue + abto.Substring(y, 1);
            }
        }
        return functionReturnValue;
    }


}

