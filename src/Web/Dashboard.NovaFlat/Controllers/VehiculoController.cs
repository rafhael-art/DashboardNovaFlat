using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.NovaFlat.Controllers;

[Authorize]
public class VehiculoController : Controller
{
    // GET: /<controller>/
    public IActionResult Index()
    {
        return View();
    }
}