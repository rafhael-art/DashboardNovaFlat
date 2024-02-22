using System;
namespace Dashboard.NovaFlat.Util;
public class Constantes
{
    #region KeyString

    public const string UsuarioSesion = "UsuarioSesion";
    public const string NoUsuario = "NoUsuario";
    public const string FormulariosSesion = "FormulariosSesion";
    public const string FormularioActualSesion = "FormularioActualSesion";
    public const string TimeOutSession = "TimeOutSession";
    public const string EmailPattern = "EmailPattern";

    public const string LoginController = "Login";
    public const string LoginAction = "Index";

    public const string HomeController = "Dashboard";
    public const string HomeAction = "Index";

    public const string ErrorController = "Error";
    public const string NotFoundAction = "NotFound";
    public const string ServerErrorAction = "ServerError";

    public const string FormatoFechaPorDefecto = "dd/MM/yyyy";
    public const string FormatoFechaHoraPorDefecto = "dd/MM/yyyy hh:mm";
    public const string FormatoHoraPorDefecto = "HH:mm:ss";
    public const string FormatoMonedaPorDefecto = "N2";
    public const string FormatoDecimalesPorDefecto = "{0:N2}";

    public const int Unauthorized = 1;

    public const int Error2146233087 = -2146233087;

    public const string ModuloSesion = "ModuloSesion";
    public const string OpcionSesion = "OpcionSesion";
    public const string AccionSesion = "AccionSesion";

    public const string Registro = "1";
    public const string Consulta = "2";

    public const string ReporteHistorial = "ReporteHistorial";
    public const string ReporteUnidadFlota = "ReporteUnidadFlota";
    public const string ReporteUnidadFlotaLima = "ReporteUnidadFlotaLima";
    #endregion KeyString


    #region  Nombre botons de acceso
    public const string Exportar_Xlsx = "BTN_EXPORTAR_XLSX";
    public const string Exportar_Xls = "BTN_EXPORTAR_XLS";
    public const string VerHistorial = "BTN_VER_HISTORIAL";
    public const string ReporteConcepto = "BTN_REPORTE_CONCEPTO";
    #endregion Nombre botons de acceso

    #region Opciones 
    public const string Op_AnexoIV = "AnexoIV";
    public const string Op_AnexoV = "AnexoV";
    public const string Op_ReporteHistorialUnidad = "ReporteHistorialUnidad";
    public const string Op_StockProducto = "StockProducto";
    public const string Op_UnidadFlota = "UnidadFlota";
    public const string Op_UnidadFlotaLima = "UnidadFlotaLima";
    public const string Op_Vehiculo = "Vehiculo";
    public const string Op_EditarKm = "EditarKmVidaUtil";
    public const string Op_ConsultaEstadoFlota = "ConsultarEstadoFlota";
    public const string Op_ConsultaEstadoActualFlota = "ConsultaEstadoActualFlota";
    public const string Op_ConsultaFacturas = "ConsultaFacturas";

    #endregion Opciones
}

