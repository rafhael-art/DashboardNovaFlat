using MediatR;
using E = Dashboard.Model.Entites;

namespace Dashboard.UseCase.UseCase.AnexoIV.Queries.AnexoIVLista
{
    public class AnexoIVListaQuery : IRequest<IEnumerable<E.AnexoIV>>
    {
        public string? clase { get; set; }
        public string? placa { get; set; }
        public string? marca { get; set; }
        public string? modelo { get; set; }
        public string? estado { get; set; }
        public string? localidad { get; set; }
        public string? fechaInico { get; set; }
        public string? fechaFinal { get; set; }
        public int id_departamento { get; set; }
        public int id_provincia { get; set; }
        public int numEvento { get; set; }
    }
}

