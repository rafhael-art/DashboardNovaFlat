using ClosedXML.Excel;
using Dashboard.Common.ExcelSettings;

namespace Dashboard.NovaFlat.Core
{
    public class ClosedXmlGenerator<T> where T : class
    {
        public static XLWorkbook GenerateWorkBook(List<T> data)
        {
            var workbook = new XLWorkbook();
            try
            {
                var worksheet = workbook.Worksheets.Add("ReporteHistorial");

                // Header
                worksheet.Cell("A1").Value = "Placa";
                worksheet.Cell("B1").Value = "Clase";
                worksheet.Cell("C1").Value = "Marca";   //Cantdad
                worksheet.Cell("D1").Value = "Modelo";  //monto

                worksheet.Cell("E1").Value = "Año";
                worksheet.Cell("F1").Value = "Localidad";
                worksheet.Cell("G1").Value = "Ubicacion";
                worksheet.Cell("H1").Value = "Proveedor";
                worksheet.Cell("I1").Value = "Fecha ingreso taller";
                worksheet.Cell("J1").Value = "Fecha salida taller";
                worksheet.Cell("K1").Value = "Concepto";
                worksheet.Cell("L1").Value = "Documento";
                worksheet.Cell("M1").Value = "Precio servicio";
                worksheet.Cell("N1").Value = "Estado reparacion";
                worksheet.Cell("O1").Value = "Estado unidad";
                worksheet.Cell("P1").Value = "Tipo Mantenimiento";
                worksheet.Cell("Q1").Value = "Cobertura";

                worksheet.Cell("R1").Value = "Costo de la Unidad";
                worksheet.Cell("S1").Value = "Hora Ingreso";
                worksheet.Cell("T1").Value = "Hora Salida";
                worksheet.Cell("U1").Value = "Hora Inoperativa";

                worksheet.Range("A1:U1")
                         .Style.Font.SetBold(true)
                         .Font.SetFontSize(14)
                         .Fill.SetBackgroundColor(XLColor.LightGray);

                // Data
                //worksheet.Cell("A2").Value = data;
                var rowIndex = 2;
                foreach (var item in data!)
                {
                    var columns = ColumnNames.ObtenerNombresAtributos<T>();
                    for (int i = 0; i < columns.Count; i++)
                    {
                        var propertyValue = typeof(T).GetProperty(columns[i]!)?.GetValue(item)?.ToString();
                        worksheet.Cell(rowIndex, i + 1).Value = propertyValue;
                    }
                    rowIndex++;
                }
                //PrintData(worksheet, data);


                var lastRow = worksheet.LastRowUsed().RowNumber() + 1;

                for (int i = 2; i < lastRow - 1; i++)
                {
                    worksheet.Cell(i, 13).Style.NumberFormat.Format = "#,##0.00";
                }

                // Footer
                worksheet.Range(lastRow, 1, lastRow, 4)
                         .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Right)
                         .Font.SetBold(true)
                         .Font.SetFontSize(14);

                worksheet.Range(lastRow, 1, lastRow, 12)
                         .Merge()
                         .SetValue("Total:");


                worksheet.Cell(lastRow, 13)
                         .SetFormulaA1("SUM(M1:M" + (lastRow - 1) + ")")
                         .Style.NumberFormat.SetFormat("#,##0.00")
                         .Fill.SetBackgroundColor(XLColor.Yellow);


                worksheet.Columns().AdjustToContents();
            }
            catch (Exception ex)
            {
                string mensaje = ex.Message;
                workbook = new XLWorkbook();
                throw;
            }
            return workbook;
        }

        public static void PrintData(IXLWorksheet worksheet, List<T> data, int rowIndex)
        {
            foreach (var item in data!)
            {
                var columns = ColumnNames.ObtenerNombresAtributos<T>();
                for (int i = 0; i < columns.Count; i++)
                {
                    var propertyValue = typeof(T).GetProperty(columns[i]!)?.GetValue(item)?.ToString();
                    worksheet.Cell(rowIndex, i + 1).Value = propertyValue;
                }
                rowIndex++;
            }
        }

        public static XLWorkbook GenerateWorkBook_UnidadFlota(List<T> data)
        {
            var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("ReporteUnidadFlota");

            // Header
            worksheet.Cell("A1").Value = "Localidad";
            worksheet.Cell("B1").Value = "Ubicacion";
            worksheet.Cell("C1").Value = "Placa Rodaje";
            worksheet.Cell("D1").Value = "Placa Interna";
            worksheet.Cell("E1").Value = "Clase";

            worksheet.Cell("F1").Value = "Marca";
            worksheet.Cell("G1").Value = "Modelo";
            worksheet.Cell("H1").Value = "Año";
            worksheet.Cell("I1").Value = "Estado";

            worksheet.Cell("J1").Value = "Numero Poliza";
            worksheet.Cell("K1").Value = "Numero Certificado";
            worksheet.Cell("L1").Value = "Valor Asegurado";
            worksheet.Cell("M1").Value = "Monto Deducible";
            worksheet.Cell("N1").Value = "Fecha Incio Operaciones";
            worksheet.Cell("O1").Value = "Costo de la Unidad";
            //Nuevo

            worksheet.Range("A1:O1")
                     .Style.Font.SetBold(true)
                     .Font.SetFontSize(14)
                     .Fill.SetBackgroundColor(XLColor.LightGray);

            // Data
            PrintData(worksheet, data, 2);

            var lastRow = worksheet.LastRowUsed().RowNumber() + 1;
            for (int i = 2; i < lastRow; i++)
            {
                worksheet.Cell(i, 12).Style.NumberFormat.Format = "#,##0.00";
                worksheet.Cell(i, 12).Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Right;

            }

            worksheet.Range("A1:O1").SetAutoFilter(true);

            worksheet.Columns().AdjustToContents();
            return workbook;
        }

        public static XLWorkbook GenerateWorkBook_Consulta_Estado_Flota(List<T> data)
        {
            var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Consulta_Estado_Flota");



            // Header


            worksheet.Range("J1:K1")
                          .Merge()
                          .SetValue("INGRESO")
                          .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                          .Fill.SetBackgroundColor(XLColor.DarkOrange);

            worksheet.Range("L1")
                          .Merge()
                          .SetValue("REALIZADO")
                          .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                          .Fill.SetBackgroundColor(XLColor.DarkSeaGreen);

            worksheet.Range("M1")
                          .Merge()
                          .SetValue("PROXIMO MANTENIMIENTO")
                          .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                          .Fill.SetBackgroundColor(XLColor.DarkSeaGreen);

            worksheet.Range("P1:Q1")
                          .Merge()
                          .SetValue("SALIDA")
                          .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                          .Fill.SetBackgroundColor(XLColor.DarkSeaGreen);


            worksheet.Cell("A2").Value = "N° Evento";
            worksheet.Cell("B2").Value = "Placa";
            worksheet.Cell("C2").Value = "Clase";
            worksheet.Cell("D2").Value = "Marca";
            worksheet.Cell("E2").Value = "Modelo";
            worksheet.Cell("F2").Value = "Estado";
            worksheet.Cell("G2").Value = "Departamento";
            worksheet.Cell("H2").Value = "Provincia";
            worksheet.Cell("I2").Value = "Ciudad";
            worksheet.Cell("J2").Value = "Hora de Ingreso";
            worksheet.Cell("K2").Value = "Fecha de Ingreso";
            worksheet.Cell("L2").Value = "Km";
            worksheet.Cell("M2").Value = "Km";
            worksheet.Cell("N2").Value = "Motivo Inoperativa";
            worksheet.Cell("O2").Value = "Observaciones de Retrasos";
            worksheet.Cell("P2").Value = "Fecha de Salida";
            worksheet.Cell("P2").Value = "Hora de Salida";
            worksheet.Cell("P2").Value = "Salida Estimada";
            //Nuevo                      

            worksheet.Range("A2:O2")
                     .Style.Font.SetBold(false)
                     .Font.SetFontSize(12)
                     /*.Fill.SetBackgroundColor(XLColor.White)*/;

            // Data
            PrintData(worksheet, data, 3);

            var lastRow = worksheet.LastRowUsed().RowNumber() + 1;
            for (int i = 2; i < lastRow - 1; i++)
            {
                //worksheet.Cell(i, 12).Style.NumberFormat.Format = "#,##0.00";
                //worksheet.Cell(i, 13).Style.NumberFormat.Format = "#,##0.00";
            }



            worksheet.Range("A2:P2").SetAutoFilter(true);
            worksheet.Columns().AdjustToContents();
            return workbook;
        }


        public static XLWorkbook GenerateWorkBook_UnidadFlota_Lima(List<T> data)
        {
            var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("ReporteUnidadFlotaLima");

            // Header

            worksheet.Cell("A1").Value = "Placa Interna";
            worksheet.Cell("B1").Value = "Placa Rodaje";
            worksheet.Cell("C1").Value = "Clase";

            worksheet.Cell("D1").Value = "Marca";
            worksheet.Cell("E1").Value = "Modelo";
            worksheet.Cell("F1").Value = "Año";
            worksheet.Cell("G1").Value = "Estado";

            worksheet.Cell("H1").Value = "Numero Poliza";
            worksheet.Cell("I1").Value = "Numero Certificado";
            worksheet.Cell("J1").Value = "Valor Asegurado";
            worksheet.Cell("K1").Value = "Fecha Incio Operaciones";
            //Nuevo

            worksheet.Range("A1:K1")
                     .Style.Font.SetBold(true)
                     .Font.SetFontSize(14)
                     .Fill.SetBackgroundColor(XLColor.LightGray);

            // Data
            PrintData(worksheet, data, 2);

            worksheet.Columns().AdjustToContents();
            return workbook;
        }

        public static XLWorkbook GenerateWorkBook_Reporte_Concepto(List<T> data)
        {
            var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("ReporteConcepto");

            // Header
            worksheet.Cell("A1").Value = "Concepto";
            worksheet.Cell("B1").Value = "Costo General";
            worksheet.Cell("C1").Value = "Fecha Reporte";   //Cantdad
            worksheet.Cell("D1").Value = "Concepto Reporte";  //monto

            worksheet.Cell("E1").Value = "Fecha ingreso taller";
            worksheet.Cell("F1").Value = "Fecha salida taller";
            worksheet.Cell("G1").Value = "Documento";
            worksheet.Cell("H1").Value = "Kilometro";
            worksheet.Cell("I1").Value = "Taller";
            worksheet.Cell("J1").Value = "Decripcion de trabajo";

            worksheet.Cell("K1").Value = "Situacion raparacion";
            worksheet.Cell("L1").Value = "Costo del Concepto";
            worksheet.Cell("M1").Value = "Tipo mantenimiento";
            worksheet.Cell("N1").Value = "Cobertura";

            worksheet.Cell("O1").Value = "Localidad";
            worksheet.Cell("P1").Value = "Ubicacion";
            worksheet.Cell("Q1").Value = "Placa interno";

            worksheet.Cell("R1").Value = "Clase";
            worksheet.Cell("S1").Value = "Marca";
            worksheet.Cell("T1").Value = "Modelo";
            worksheet.Cell("U1").Value = "Año";
            worksheet.Cell("V1").Value = "Estado";
            worksheet.Cell("W1").Value = "Costo adquisicion";
            worksheet.Cell("X1").Value = "Nro Poliza";
            worksheet.Cell("Y1").Value = "Nro certificado";
            worksheet.Cell("Z1").Value = "Valor asegurado";
            worksheet.Cell("AA1").Value = "Monto deducible";
            worksheet.Cell("AB1").Value = "Fecha de operacion";
            worksheet.Cell("AC1").Value = "Placa rodaje";



            worksheet.Range("A1:AD1")
                     .Style.Font.SetBold(true)
                     .Font.SetFontSize(14)
                     .Fill.SetBackgroundColor(XLColor.LightGray);

            // Data
            PrintData(worksheet, data, 2);

            var lastRow = worksheet.LastRowUsed().RowNumber() + 1;

            for (int i = 2; i < lastRow - 1; i++)
            {

                worksheet.Cell(i, 2).Style.NumberFormat.Format = "#,##0.00";
                worksheet.Cell(i, 12).Style.NumberFormat.Format = "#,##0.00";
                worksheet.Cell(i, 23).Style.NumberFormat.Format = "#,##0.00";
                worksheet.Cell(i, 27).Style.NumberFormat.Format = "#,##0.00";
            }


            worksheet.Columns().AdjustToContents();
            return workbook;
        }

        public static XLWorkbook GenerateWorkBook_Reporte_ConceptoDetalle(List<T> data)
        {
            var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("ReporteConceptoDetalle");

            // Header

            worksheet.Cell("A1").Value = "Concepto";
            worksheet.Cell("B1").Value = "Costo del Concepto";

            worksheet.Cell("C1").Value = "Tipo";
            worksheet.Cell("D1").Value = "Descripcion";
            worksheet.Cell("E1").Value = "Costo Detalle";


            worksheet.Cell("F1").Value = "Costo General";
            worksheet.Cell("G1").Value = "Fecha Reporte";   //Cantdad
            worksheet.Cell("H1").Value = "Concepto Reporte";  //monto

            worksheet.Cell("I1").Value = "Fecha ingreso taller";
            worksheet.Cell("J1").Value = "Fecha salida taller";
            worksheet.Cell("K1").Value = "Documento";
            worksheet.Cell("L1").Value = "Kilometro";
            worksheet.Cell("M1").Value = "Taller";
            worksheet.Cell("N1").Value = "Decripcion de trabajo";

            worksheet.Cell("O1").Value = "Situacion raparacion";

            worksheet.Cell("P1").Value = "Tipo mantenimiento";
            worksheet.Cell("Q1").Value = "Cobertura";

            worksheet.Cell("R1").Value = "Localidad";
            worksheet.Cell("S1").Value = "Ubicacion";
            worksheet.Cell("T1").Value = "Placa interno";

            worksheet.Cell("U1").Value = "Clase";
            worksheet.Cell("V1").Value = "Marca";
            worksheet.Cell("W1").Value = "Modelo";
            worksheet.Cell("X1").Value = "Año";
            worksheet.Cell("Y1").Value = "Estado";
            worksheet.Cell("Z1").Value = "Costo adquisicion";
            worksheet.Cell("AA1").Value = "Nro Poliza";
            worksheet.Cell("AB1").Value = "Nro certificado";
            worksheet.Cell("AC1").Value = "Valor asegurado";
            worksheet.Cell("AD1").Value = "Monto deducible";
            worksheet.Cell("AE1").Value = "Fecha de operacion";
            worksheet.Cell("AF1").Value = "Placa rodaje";



            worksheet.Range("A1:AF1")
                     .Style.Font.SetBold(true)
                     .Font.SetFontSize(14)
                     .Fill.SetBackgroundColor(XLColor.LightGray);

            // Data
            PrintData(worksheet, data, 2);

            var lastRow = worksheet.LastRowUsed().RowNumber() + 1;

            for (int i = 2; i < lastRow - 1; i++)
            {

                //Formato precio
                worksheet.Cell(i, 2).Style.NumberFormat.Format = "#,##0.00";
                worksheet.Cell(i, 5).Style.NumberFormat.Format = "#,##0.00";
                worksheet.Cell(i, 6).Style.NumberFormat.Format = "#,##0.00";
                worksheet.Cell(i, 26).Style.NumberFormat.Format = "#,##0.00";
                worksheet.Cell(i, 30).Style.NumberFormat.Format = "#,##0.00";
            }


            worksheet.Columns().AdjustToContents();
            return workbook;
        }

        public static XLWorkbook WorkBook_AnexoIV(List<T> data)
        {
            var workbook = new XLWorkbook();
            try
            {
                var worksheet = workbook.Worksheets.Add("ReporteAnexoIV");

                // Header

                worksheet.Range("A1:AA1")
                          .Merge()
                          .SetValue("Datos sobre el vehículo")
                          .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                          .Fill.SetBackgroundColor(XLColor.DarkGray);

                worksheet.Range("AB1:AE1")
                     .Merge()
                     .SetValue("Costo de mantenimiento(soles)")
                     .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                     .Fill.SetBackgroundColor(XLColor.DeepSkyBlue);

                worksheet.Range("AF1:AM1")
                     .Merge()
                     .SetValue("Comprobantes del seguimiento")
                     .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                     .Fill.SetBackgroundColor(XLColor.BlueViolet);

                worksheet.Range("AN1:AS1")
                     .Merge()
                     .SetValue("Ingreso")
                     .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                     .Fill.SetBackgroundColor(XLColor.DarkOrange);

                worksheet.Range("AT1:AU1")
                     .Merge()
                     .SetValue("Kilometraje")
                     .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                     .Fill.SetBackgroundColor(XLColor.CornflowerBlue);

                worksheet.Range("AV1:AW1")
                    .Merge()
                    .SetValue("Disponible para su recojo")
                    .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                    .Fill.SetBackgroundColor(XLColor.Yellow);

                worksheet.Range("AX1:BA1")
                     .Merge()
                     .SetValue("Salida")
                     .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                     .Fill.SetBackgroundColor(XLColor.DarkGreen);

                worksheet.Range("BB1:BE1")
                    .Merge()
                    .SetValue("Tiempo de paradas")
                    .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                    .Fill.SetBackgroundColor(XLColor.ForestGreen);


                //CABECERA

                worksheet.Range("A2:AA2")
                      .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                      .Fill.SetBackgroundColor(XLColor.DarkGray);

                worksheet.Range("AB2:AE2")
                    .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                    .Fill.SetBackgroundColor(XLColor.DeepSkyBlue);

                worksheet.Range("AF2:AM2")
                    .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                    .Fill.SetBackgroundColor(XLColor.BlueViolet);

                worksheet.Range("AN2:AS2")
                    .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                    .Fill.SetBackgroundColor(XLColor.DarkOrange);

                worksheet.Range("AT2:AU2")
                    .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                    .Fill.SetBackgroundColor(XLColor.CornflowerBlue);


                worksheet.Range("AV2:AW2")
                    .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                    .Fill.SetBackgroundColor(XLColor.Yellow);

                worksheet.Range("AX2:BA2")
                    .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                    .Fill.SetBackgroundColor(XLColor.DarkGreen);

                worksheet.Range("BB2:BE2")
                    .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                    .Fill.SetBackgroundColor(XLColor.ForestGreen);

                worksheet.Range("BF1:BF2")
                   .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                   .Fill.SetBackgroundColor(XLColor.Yellow);


                worksheet.Cell("A2").Value = "N° de Evento";
                worksheet.Cell("B2").Value = "Clase";
                worksheet.Cell("C2").Value = "Placa Interna";
                worksheet.Cell("D2").Value = "Placa Rodaje";
                worksheet.Cell("E2").Value = "Marca";
                worksheet.Cell("F2").Value = "Modelo";
                worksheet.Cell("G2").Value = "N° Motor";
                worksheet.Cell("H2").Value = "N° serie-VIN";
                worksheet.Cell("I2").Value = "Ubicación departamento";
                worksheet.Cell("J2").Value = "Ubicación provincia";
                worksheet.Cell("K2").Value = "Ubicación distrito";
                worksheet.Cell("L2").Value = "Latitud";
                worksheet.Cell("M2").Value = "Longitud";
                worksheet.Cell("N2").Value = "Costo de la unidad US$";
                worksheet.Cell("O2").Value = "Año de Fabricacion";
                worksheet.Cell("P2").Value = "Año de entrega a la PNP";
                worksheet.Cell("Q2").Value = "Fecha de entrega a la PNP";
                worksheet.Cell("R2").Value = "Inicio de Operaciones";

                worksheet.Cell("S2").Value = "Numero Poliza";
                worksheet.Cell("T2").Value = "Numero Certificado";
                worksheet.Cell("U2").Value = "Estado";
                worksheet.Cell("V2").Value = "Fecha de baja";
                worksheet.Cell("W2").Value = "Motivo de baja";
                worksheet.Cell("X2").Value = "Costo acumulado total(sin IGV)";
                worksheet.Cell("Y2").Value = "Costo acumulado FLAT(sin IGV)";
                worksheet.Cell("Z2").Value = "Costo acumulado adicinal(sin IGV)";
                worksheet.Cell("AA2").Value = "FLAT";

                worksheet.Cell("AB2").Value = "Costo total(sin IGV)";
                worksheet.Cell("AC2").Value = "Costo FLAT(sin IGV)";
                worksheet.Cell("AD2").Value = "Costo adicional(sin IGV)";
                worksheet.Cell("AE2").Value = "T.C";
                worksheet.Cell("AF2").Value = "Taller responsable";
                worksheet.Cell("AG2").Value = "RUC";
                worksheet.Cell("AH2").Value = "N° Presupuesto";
                worksheet.Cell("AI2").Value = "Factura";
                worksheet.Cell("AJ2").Value = "Mes factura";
                worksheet.Cell("AK2").Value = "Moneda";
                worksheet.Cell("AL2").Value = "Monto factura sin IGV";
                worksheet.Cell("AM2").Value = "Trabajo realizado";
                worksheet.Cell("AN2").Value = "Estado de reparacion";
                worksheet.Cell("AO2").Value = "INGRESO_Motivo";
                worksheet.Cell("AP2").Value = "INGRESO_Hora";
                worksheet.Cell("AQ2").Value = "INGRESO_Fecha";
                worksheet.Cell("AR2").Value = "INGRESO_Nombre PNP";
                worksheet.Cell("AS2").Value = "INGRESO_CÓDIGO";
                worksheet.Cell("AT2").Value = "KM INGRESO AL TALLER";
                worksheet.Cell("AU2").Value = "PRÓXIMO MANTENIMIENTO";
                worksheet.Cell("AV2").Value = "Hora Fin de Servicio";
                worksheet.Cell("AW2").Value = "Fecha Fin de Servicio";
                worksheet.Cell("AX2").Value = "SALIDA_Hora";
                worksheet.Cell("AY2").Value = "SALIDA_Fecha";
                worksheet.Cell("AZ2").Value = "SALIDA_Nombre PNP";
                worksheet.Cell("BA2").Value = "SALIDA_CÓDIGO CIP";
                worksheet.Cell("BB2").Value = "Hora de servicio";
                worksheet.Cell("BC2").Value = "Dias de servicio";
                worksheet.Cell("BD2").Value = "Hora en taller";
                worksheet.Cell("BE2").Value = "Dias en taller";
                worksheet.Cell("BF2").Value = "Costo por Stock";


                // Data
                PrintData(worksheet, data, 3);

                var lastRow = worksheet.LastRowUsed().RowNumber() + 2;
                for (int i = 3; i < lastRow - 1; i++)
                {
                    worksheet.Cell(i, 13).Style.NumberFormat.Format = "#,##0.00";

                    worksheet.Cell(i, 24).Style.NumberFormat.Format = "#,##0.00";
                    worksheet.Cell(i, 25).Style.NumberFormat.Format = "#,##0.00";
                    worksheet.Cell(i, 26).Style.NumberFormat.Format = "#,##0.00";
                    worksheet.Cell(i, 28).Style.NumberFormat.Format = "#,##0.00";
                    worksheet.Cell(i, 29).Style.NumberFormat.Format = "#,##0.00";
                    worksheet.Cell(i, 30).Style.NumberFormat.Format = "#,##0.00";
                    worksheet.Cell(i, 38).Style.NumberFormat.Format = "#,##0.00";

                    worksheet.Cell(i, 46).Style.NumberFormat.Format = "#,##";
                    worksheet.Cell(i, 47).Style.NumberFormat.Format = "#,##";
                    //worksheet.Cell(i, 9).SetDataType(XLDataType.DateTime).Style.DateFormat.Format = "dd/MM/yyyy";
                    //worksheet.Cell(i, 10).SetDataType(XLDataType.DateTime).Style.DateFormat.Format = "dd/MM/yyyy";
                }

                worksheet.Range("A2:BF2").SetAutoFilter(true);
                worksheet.Columns().AdjustToContents();
            }
            catch (Exception ex)
            {
                string mensaje = ex.Message;
                workbook = new XLWorkbook();
                throw;
            }

            return workbook;
        }

        public static XLWorkbook WorkBook_AnexoV(List<T> data)
        {
            var workbook = new XLWorkbook();
            try
            {
                var worksheet = workbook.Worksheets.Add("ReporteAnexoV");

                // Header

                worksheet.Range("A1:Z1")
                          .Merge()
                          .SetValue("Datos sobre el vehículo")
                          .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                          .Fill.SetBackgroundColor(XLColor.DarkGray);

                worksheet.Range("AA1:AH1")
                     .Merge()
                     .SetValue("Comprobantes del seguimiento")
                     .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                     .Fill.SetBackgroundColor(XLColor.BlueViolet);

                worksheet.Range("AI1:AQ1")
                     .Merge()
                     .SetValue("Repuesto")
                     .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                     .Fill.SetBackgroundColor(XLColor.DarkOrange);

                worksheet.Range("AR1:AT1")
                     .Merge()
                     .SetValue("Causas de fallas")
                     .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                     .Fill.SetBackgroundColor(XLColor.CornflowerBlue);


                //CABECERA

                worksheet.Range("A2:Z2")
                      .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                      .Fill.SetBackgroundColor(XLColor.DarkGray);


                worksheet.Range("AA2:AH2")
                    .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                    .Fill.SetBackgroundColor(XLColor.BlueViolet);

                worksheet.Range("AI2:AQ2")
                    .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                    .Fill.SetBackgroundColor(XLColor.DarkOrange);

                worksheet.Range("AR2:AT2")
                    .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                    .Fill.SetBackgroundColor(XLColor.CornflowerBlue);

                worksheet.Range("AU1:AV2")
                    .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Left)
                    .Fill.SetBackgroundColor(XLColor.Yellow);




                worksheet.Cell("A2").Value = "N° de Evento";
                worksheet.Cell("B2").Value = "Clase";
                worksheet.Cell("C2").Value = "Placa Interna";
                worksheet.Cell("D2").Value = "Placa Rodaje";   //Cantdad
                worksheet.Cell("E2").Value = "Marca";  //monto
                worksheet.Cell("F2").Value = "Modelo";
                worksheet.Cell("G2").Value = "N° Motor";
                worksheet.Cell("H2").Value = "N° serie-VIN";
                worksheet.Cell("I2").Value = "Ubicación departamento";
                worksheet.Cell("J2").Value = "Ubicación provincia";
                worksheet.Cell("K2").Value = "Ubicación distrito";
                worksheet.Cell("L2").Value = "Latitud";
                worksheet.Cell("M2").Value = "Longitud";
                worksheet.Cell("N2").Value = "Costo de la unidad US$";
                worksheet.Cell("O2").Value = "Año de Fabricacion";
                worksheet.Cell("P2").Value = "Año de entrega a la PNP";
                worksheet.Cell("Q2").Value = "Fecha de entrega a la PNP";

                worksheet.Cell("R2").Value = "Inicio de Operaciones";
                worksheet.Cell("S2").Value = "Numero Poliza";
                worksheet.Cell("T2").Value = "Numero Certificado";
                worksheet.Cell("U2").Value = "Estado";
                worksheet.Cell("V2").Value = "Fecha de baja";
                worksheet.Cell("W2").Value = "Motivo de baja";
                worksheet.Cell("X2").Value = "Costo acumulado total(sin IGV)";
                worksheet.Cell("Y2").Value = "Costo acumulado FLAT(sin IGV)";

                worksheet.Cell("Z2").Value = "Costo acumulado adicinal(sin IGV)";



                worksheet.Cell("AA2").Value = "Taller responsable";
                worksheet.Cell("AB2").Value = "RUC";
                worksheet.Cell("AC2").Value = "N° Presupuesto";
                worksheet.Cell("AD2").Value = "Factura";
                worksheet.Cell("AE2").Value = "Mes factura";
                worksheet.Cell("AF2").Value = "Moneda";
                worksheet.Cell("AG2").Value = "Monto factura sin IGV";
                worksheet.Cell("AH2").Value = "FLAT";
                worksheet.Cell("AI2").Value = "Trabajo realizado";
                worksheet.Cell("AJ2").Value = "kM ingreso al taller";
                worksheet.Cell("AK2").Value = "Cod. Repuesto";
                worksheet.Cell("AL2").Value = "Descripcion";
                worksheet.Cell("AM2").Value = "Costo sin IGV";
                worksheet.Cell("AN2").Value = "KM de ultimo cambio";
                worksheet.Cell("AO2").Value = "KM vida util real";
                worksheet.Cell("AP2").Value = "KM vida util fabricante";
                worksheet.Cell("AQ2").Value = "Tipo cambio";
                worksheet.Cell("AR2").Value = "Motivo de falla";
                worksheet.Cell("AS2").Value = "Mecanico responsable";
                worksheet.Cell("AT2").Value = "Tipo de mantenimiento";

                worksheet.Cell("AU2").Value = "Costo por Stock";
                worksheet.Cell("AV2").Value = "Total Costo";


                // Data
                PrintData(worksheet, data, 3);

                var lastRow = worksheet.LastRowUsed().RowNumber() + 2;
                for (int i = 3; i < lastRow - 1; i++)
                {
                    worksheet.Cell(i, 14).Style.NumberFormat.Format = "#,##0.00";

                    worksheet.Cell(i, 24).Style.NumberFormat.Format = "#,##0.00";
                    worksheet.Cell(i, 25).Style.NumberFormat.Format = "#,##0.00";
                    worksheet.Cell(i, 26).Style.NumberFormat.Format = "#,##0.00";

                    worksheet.Cell(i, 33).Style.NumberFormat.Format = "#,##0.00";

                    worksheet.Cell(i, 39).Style.NumberFormat.Format = "#,##0.00";




                    DateTime valorMesFacturaExcel = Convert.ToDateTime(worksheet.Cell(i, 31).Value);

                    if (valorMesFacturaExcel.Year == 1900)
                    {
                        worksheet.Cell(i, 31).Value = "";

                    }
                    else
                    {
                        worksheet.Cell(i, 31).Style.DateFormat.Format = "dd/mm/yyyy";
                    }

                    worksheet.Cell(i, 47).Style.NumberFormat.Format = "#,##0.00";
                    worksheet.Cell(i, 48).Style.NumberFormat.Format = "#,##0.00";

                }


                worksheet.Range("A2:AT2").SetAutoFilter(true);

                worksheet.Columns().AdjustToContents();
            }
            catch (Exception ex)
            {
                string mensaje = ex.Message;
                workbook = new XLWorkbook();
                throw;
            }

            return workbook;
        }

        public static XLWorkbook GenerateWorkBook_Consulta_Estado_Actual_Flota(List<T> data)
        {
            var workbook = new XLWorkbook();
            var worksheet = workbook.Worksheets.Add("Consulta_Estado_Flota");



            // Header


            worksheet.Range("F1:G1")
                          .Merge()
                          .SetValue("INGRESO")
                          .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                          .Fill.SetBackgroundColor(XLColor.DarkOrange);

            worksheet.Range("H1")
                          .Merge()
                          .SetValue("REALIZADO")
                          .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                          .Fill.SetBackgroundColor(XLColor.DarkSeaGreen);

            worksheet.Range("I1")
                          .Merge()
                          .SetValue("PROXIMO MANTENIMIENTO")
                          .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                          .Fill.SetBackgroundColor(XLColor.DarkSeaGreen);

            worksheet.Range("L1:M1")
                          .Merge()
                          .SetValue("SALIDA")
                          .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                          .Fill.SetBackgroundColor(XLColor.DarkSeaGreen);


            worksheet.Cell("A2").Value = "Placa";
            worksheet.Cell("B2").Value = "Clase";

            worksheet.Cell("C2").Value = "Marca";
            worksheet.Cell("D2").Value = "Modelo";
            worksheet.Cell("E2").Value = "Estado";
            worksheet.Cell("F2").Value = "Hora de Ingreso";
            worksheet.Cell("G2").Value = "Fecha de Ingreso";
            worksheet.Cell("H2").Value = "Km";
            worksheet.Cell("I2").Value = "Km";
            worksheet.Cell("J2").Value = "Motivo Inoperativa";
            worksheet.Cell("K2").Value = "Observaciones de Retrasos";
            worksheet.Cell("L2").Value = "Fecha de Salida";
            worksheet.Cell("M2").Value = "Hora de Salida";
            worksheet.Cell("N2").Value = "Salida Estimada";

            //Nuevo                      

            worksheet.Range("A2:N2")
                     .Style.Font.SetBold(false)
                     .Font.SetFontSize(12)
                     /*.Fill.SetBackgroundColor(XLColor.White)*/;

            // Data
            PrintData(worksheet, data, 3);

            var lastRow = worksheet.LastRowUsed().RowNumber() + 1;
            for (int i = 2; i < lastRow - 1; i++)
            {
                //worksheet.Cell(i, 12).Style.NumberFormat.Format = "#,##0.00";
                //worksheet.Cell(i, 13).Style.NumberFormat.Format = "#,##0.00";
            }



            worksheet.Range("A2:N2").SetAutoFilter(true);
            worksheet.Columns().AdjustToContents();
            return workbook;
        }

        public static XLWorkbook WorkBook_Vehiculos(List<T> data)
        {
            var workbook = new XLWorkbook();
            try
            {
                var worksheet = workbook.Worksheets.Add("RegistroVehiculos");

                worksheet.Range("A1:V1")
                    .Style.Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                    .Fill.SetBackgroundColor(XLColor.DarkGray);


                worksheet.Cell("A1").Value = "Clase";
                worksheet.Cell("B1").Value = "Placa Interna";
                worksheet.Cell("C1").Value = "Placa Rodaje";
                worksheet.Cell("D1").Value = "Marca";
                worksheet.Cell("E1").Value = "Modelo";
                worksheet.Cell("F1").Value = "N° de Motor";
                worksheet.Cell("G1").Value = "N° Serie VIN";
                worksheet.Cell("H1").Value = "Departamento";
                worksheet.Cell("I1").Value = "Provincia";
                worksheet.Cell("J1").Value = "Ciudad";
                worksheet.Cell("K1").Value = "Latitud";
                worksheet.Cell("L1").Value = "Longitud";
                worksheet.Cell("M1").Value = "Costo Unit.";
                worksheet.Cell("N1").Value = "Año Fabricación";
                worksheet.Cell("O1").Value = "Año Entrega PNP";
                worksheet.Cell("P1").Value = "Fecha Entrega PNP";
                worksheet.Cell("Q1").Value = "Inicio Operaciones";
                worksheet.Cell("R1").Value = "N° Poliza";
                worksheet.Cell("S1").Value = "N° Certificado";
                worksheet.Cell("T1").Value = "Estado";
                worksheet.Cell("U1").Value = "Fecha Baja";
                worksheet.Cell("V1").Value = "Motivo Baja";

                // Data

                PrintData(worksheet, data, 2);

                var lastRow = worksheet.LastRowUsed().RowNumber() + 2;
                for (int i = 3; i < lastRow - 1; i++)
                {
                    worksheet.Cell(i, 13).Style.NumberFormat.Format = "#,##0.00";

                }


                worksheet.Range("A1:V1").SetAutoFilter(true);

                worksheet.Columns().AdjustToContents();
            }
            catch (Exception ex)
            {
                string mensaje = ex.Message;
                workbook = new XLWorkbook();
                throw;
            }

            return workbook;
        }

    }
}

