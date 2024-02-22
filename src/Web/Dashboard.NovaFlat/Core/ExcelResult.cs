using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.NovaFlat.Core
{
    public class ExcelResult : ActionResult
    {
        private readonly XLWorkbook _workbook;
        private readonly string _fileName;
        private readonly int _tipo;
        public ExcelResult(XLWorkbook workbook, string fileName, int tipo)
        {
            _workbook = workbook;
            _fileName = fileName;
            _tipo = tipo;
        }


        public override void ExecuteResult(ActionContext context)
        {
            var response = context.HttpContext.Response;
            response.Clear();
            response.ContentType = "application/vnd.openxmlformats-officedocument."
                              + "spreadsheetml.sheet";
            if (_tipo == 1)
            {

                response.Headers.Add("content-disposition",
                                   "attachment;filename=\"" + _fileName + ".xlsx\"");
            }
            else
            {
                response.Headers.Add("content-disposition", "attachment;filename=\"" + _fileName + ".xls\"");
            }


            using (var memoryStream = new MemoryStream())
            {
                _workbook.SaveAs(memoryStream);
                memoryStream.WriteTo(response.Body);
            }


        }
    }
}

