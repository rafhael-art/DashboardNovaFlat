namespace Dashboard.Model.Entites;
public class UnidadFlota
{
    public string? localidad { get; set; }
    public string? ubicacion { get; set; }
    public string? clase { get; set; }
    public string? placa { get; set; }
    public string? marca { get; set; }
    public string? modelo { get; set; }
    public string? anio { get; set; }
    public string? estado { get; set; }
    public int id { get; set; }
    public int cantidad { get; set; }
    public string? numero_poliza { get; set; }
    public string? numero_certificado { get; set; }
    public string? valor_asegurado { get; set; }
    public decimal monto_deducido { get; set; }
    public string? fecha_inicio_operacion { get; set; }
    public string? placa_rodaje { get; set; }
    public decimal costo_adquisicion { get; set; }
    public decimal ufc_dcosto_unidad { get; set; }
}
