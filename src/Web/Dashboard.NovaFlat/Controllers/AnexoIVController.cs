using AutoMapper;
using Azure.Storage.Files.Shares;
using Azure.Storage.Files.Shares.Models;
using Dashboard.Common;
using Dashboard.Common.DataTable;
using Dashboard.Model.Entites;
using Dashboard.NovaFlat.Core;
using Dashboard.NovaFlat.Models;
using Dashboard.UseCase.UseCase.AnexoIV.Queries.AnexoIVLista;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.NovaFlat.Controllers
{
    [Authorize]
    public class AnexoIVController : BaseController
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public AnexoIVController(IMapper mapper, IMediator meditor)
        {
            _mapper = mapper;
            _mediator = meditor;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Lista(DataTableModel<AnexoIVModelFilter, int> dataTableModel)
        {

            try
            {
                var query = _mapper.Map<AnexoIVListaQuery>(dataTableModel);
                dataTableModel.data = (await _mediator.Send(query)).ToList();

            }
            catch (Exception ex)
            {
                string error = ex.Message;
                dataTableModel.data = new List<AnexoIV>();
            }

            return Json(dataTableModel);
        }

        public async Task<ActionResult> Exportar_Xlsx(string fechaI, string fechaF, string localidad, string ubicacion, string placa, string clase, string marca, string modelo, string estado, string numEvento)
        {
            AnexoIVListaQuery query = new AnexoIVListaQuery();

            query.fechaInico = fechaI;
            query.fechaFinal = fechaF;
            query.localidad = localidad == "0" ? "" : localidad;
            query.placa = placa == "0" ? "" : placa;
            query.clase = clase == "0" ? "" : clase;
            query.marca = marca == "0" ? "" : marca;
            query.modelo = modelo == "0" ? "" : modelo;
            query.estado = estado == "0" ? "" : estado;
            query.numEvento = string.IsNullOrWhiteSpace(numEvento) ? 0 : Convert.ToInt32(numEvento);
            var list = (await _mediator.Send(query)).ToList();
            var model = _mapper.Map<List<AnexoIVModel>>(list);

            var workbook = ClosedXmlGenerator<AnexoIVModel>.WorkBook_AnexoIV(model);

            return new ExcelResult(workbook, "Reporte_AnexoIV", 1);
        }

        public async Task<ActionResult> Exportar_Xls(string fechaI, string fechaF, string localidad, string ubicacion, string placa, string clase, string marca, string modelo, string estado)
        {

            AnexoIVListaQuery query = new AnexoIVListaQuery();

            query.fechaInico = fechaI;
            query.fechaFinal = fechaF;
            query.localidad = localidad;
            query.placa = placa;
            query.clase = clase;
            query.marca = marca;
            query.modelo = modelo;
            query.estado = estado;
            var list = (await _mediator.Send(query)).ToList();

            var model = _mapper.Map<List<AnexoIVModel>>(list);
            var workbook = ClosedXmlGenerator<AnexoIVModel>.WorkBook_AnexoIV(model);

            return new ExcelResult(workbook, "Reporte_AnexoIV", 2);
        }


        public ActionResult ValidarStorage(string nomArchivo)
        {
            var jsonResponse = new jsonResponse { Success = true };
            if (string.IsNullOrEmpty(nomArchivo))
            {
                jsonResponse.Success = false;
                jsonResponse.Message = "La carpeta compartida no existe.";
                return Json(jsonResponse);
            }

            string[] nombres = nomArchivo.Split('\\');
            nomArchivo = nombres[nombres.Length - 1];
            string connectionString = "";
            string Compatida = "";

            try
            {
                ShareClient share = new ShareClient(connectionString, Compatida);
                share.CreateIfNotExists();
                if (share.Exists())
                {
                    //ShareDirectoryClient directory = share.GetDirectoryClient(directorio);
                    ShareDirectoryClient directory = share.GetRootDirectoryClient();
                    if (directory.Exists())
                    {
                        ShareFileClient file = directory.GetFileClient(nomArchivo);
                        if (!file.Exists())
                        {
                            jsonResponse.Success = false;
                            jsonResponse.Message = $"El archivo {nomArchivo} no existe.";
                        }

                    }
                    else
                    {
                        jsonResponse.Success = false;
                        jsonResponse.Message = "El directorio de los archivos no existe.";
                    }
                }
                else
                {
                    jsonResponse.Success = false;
                    jsonResponse.Message = "La carpeta compartida no existe.";
                }

            }
            catch (Exception ex)
            {
                jsonResponse.Success = false;
                jsonResponse.Message = ex.Message;

            }
            return Json(jsonResponse);
        }

        public FileResult DescargarPDF(string nomArchivo)
        {
            try
            {
                string[] nombres = nomArchivo.Split('\\');
                nomArchivo = nombres[nombres.Length - 1];
                string connectionString = "";
                string Compatida = "";

                ShareClient share = new ShareClient(connectionString, Compatida);
                //ShareDirectoryClient directory = share.GetDirectoryClient(directorio);
                ShareDirectoryClient directory = share.GetRootDirectoryClient();

                ShareFileClient file = directory.GetFileClient(nomArchivo);


                MemoryStream ms = new MemoryStream();

                if (file.Exists())
                {
                    ShareFileDownloadInfo download = file.Download();
                    download.Content.CopyTo(ms);

                }
                return File(ms.GetBuffer(), "application/pdf");

            }
            catch (Exception)
            {
                throw;
            }

        }

    }
}

