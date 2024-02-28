using MediatR;
using E = Dashboard.Model.Entites;

namespace Dashboard.UseCase.UseCase.AnexoV.Queries.AnexoVLista;

public class AnexoVListaQuery : IRequest<IEnumerable<E.AnexoV>>
{
    public string? clase { get; set; }
    public string? placa { get; set; }
    public string? fechaInico { get; set; }
    public string? fechaFinal { get; set; }
    public int id_departamento { get; set; }
    public int id_provincia { get; set; }
    public int NumEvento { get; set; }
    public string? Factura { get; set; }
    public int MesFactura { get; set; }
    public int AnioFactura { get; set; }
    public int Flat { get; set; }
}
