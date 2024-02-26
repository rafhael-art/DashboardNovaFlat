namespace Dashboard.Model.Entites;

public class AnexoIV
{
    public int Id { get; set; }
    public int Id_vehiculo { get; set; }
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
    public decimal CostoAcumuladoTotal { get; set; }
    public decimal CostoAcumuladoFLAT { get; set; }
    public decimal CostoAcumuladoAdicional { get; set; }

    public string? Flat { get; set; }
    public decimal CostoTotalSinIGV { get; set; }
    public decimal CostoFLATSinIGV { get; set; }
    public decimal CostoAdicionalSinIGV { get; set; }

    public string? TipoCambio { get; set; }
    public string? TallerResponsable { get; set; }
    public string? RUC { get; set; }
    public string? NPresupuesto { get; set; }
    public string? Factura { get; set; }
    public string? Mesfactura { get; set; }
    public string? Moneda { get; set; }
    public decimal MontoFacturaSinIGV { get; set; }
    public string? TrabajoRealizado { get; set; }
    public string? EstadoOperaciones { get; set; }
    public string? MotivoIngreso { get; set; }
    public string? HoraIngreso { get; set; }
    public string? FechaIngreso { get; set; }
    public string? NombrePolicialResponsable { get; set; }
    public string? CodigoCIP { get; set; }
    public decimal KmIngresoTaller { get; set; }
    public decimal ProximoMantenimientoKM { get; set; }
    public string? HoraSalida { get; set; }
    public string? FechaSalida { get; set; }
    public string? NombrePolicialResponsableSalida { get; set; }
    public string? CodigoCIPSalida { get; set; }
    public decimal HorasTaller { get; set; }
    public decimal DiasTaller { get; set; }
    public decimal HorasdeServicio { get; set; }
    public decimal DiasdeServicio { get; set; }
    public string? HoraFindeServicio { get; set; }
    public string? FechaFindeServicio { get; set; }


    public string? ruta_repuesto { get; set; }
    public string? ruta_factura { get; set; }
    public int Id_baja { get; set; }
    public string? Descripcion_baja { get; set; }
    public string? hxuc_icorrelativo { get; set; }
    public decimal hxuc_nmonto_stock { get; set; }
}

