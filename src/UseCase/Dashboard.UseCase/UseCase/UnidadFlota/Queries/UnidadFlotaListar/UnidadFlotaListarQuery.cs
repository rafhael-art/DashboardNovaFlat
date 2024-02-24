using E = Dashboard.Model.Entites;
using MediatR;

namespace Dashboard.UseCase.UseCase.UnidadFlota.Queries.UnidadFlotaListar
{
    public class UnidadFlotaListarQuery : IRequest<IEnumerable<E.UnidadFlota>>
    {
        public string? _localidad { get; set; }
        public string? _ubicacion { get; set; }
        public string? _clase { get; set; }
        public string? _placa { get; set; }
        public string? _estadoUnidad { get; set; }
        public string? _anio { get; set; }
        public int _Start { get; set; }
        public int _Rows { get; set; }
    }
}

