namespace Dashboard.Model.Entites;

public class AnexoV
{
    public string? Clase { get; set; }
    public string? PlacaInterna { get; set; }
    public string? PlacaRodaje { get; set; }
    public string? Marca { get; set; }
    public string? Modelo { get; set; }
    public string? Motor { get; set; }
    public string? SerieVIN { get; set; }
    public string? Ubicaciondepartamento { get; set; }
    public string? UbicacionProvincia { get; set; }
    public string? UbicacionDistrito { get; set; }
    public string? Latitud { get; set; }
    public string? Longitud { get; set; }
    public decimal CostoUnidad { get; set; }
    public int AnioFabricacion { get; set; }
    public int AnioEntregaPNP { get; set; }
    public string? FechaEntregaPNP { get; set; }
    public string? InicioOperaciones { get; set; }
    public string? NumeroPoliza { get; set; }
    public string? NumeroCertificado { get; set; }
    public string? Estado { get; set; }
    public string? FechaBaja { get; set; }
    public string? MotivoBaja { get; set; }
    public string? CostoAcumuladoTotal { get; set; }
    public string? CostoAcumuladoFLAT { get; set; }
    public string? CostoAcumuladoAdicional { get; set; }
    public string? TallerResponsable { get; set; }
    public string? RUC { get; set; }
    public string? NPresupuesto { get; set; }
    public string? Factura { get; set; }
    public string? Mesfactura { get; set; }
    public string? Moneda { get; set; }
    public string? MontoFacturaSinIGV { get; set; }
    public string? Flat { get; set; }
    public string? TrabajoRealizado { get; set; }
    public string? KmIngresoTaller { get; set; }
    public string? CodRepuesto { get; set; }
    public string? Descripcion { get; set; }
    public string? CostoSinIGV { get; set; }
    public string? KmUltimoCambio { get; set; }
    public string? KmVidaUtilReal { get; set; }
    public string? KmVidaUtilFabricante { get; set; }
    public string? TipoCambio { get; set; }
    public string? MotivoFalla { get; set; }
    public string? MecanicoResponsable { get; set; }
    public string? TipoMantenimiento { get; set; }
    public string? ruta_repuesto { get; set; }
    public string? ruta_factura { get; set; }
    public string? hxuc_icorrelativo { get; set; }
    public DateTime? fechafactura { get; set; }
    public int chd_icod_materiales_historial { get; set; }
    public decimal hxuc_nmonto_stock { get; set; }
    public decimal total_costo { get; set; }
}