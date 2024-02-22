using System;
using Dashboard.Model.Entites;
using MediatR;

namespace Dashboard.UseCase.UseCase.UnidadFlota.Queries.HistorialListar
{
    public class HistorialListarQuery : IRequest<IEnumerable<UnidadHistorial>>
    {
        public int _idUnidadFlota { get; set; }
        public string? _taller { get; set; }
        public string? _situacion { get; set; }
        public int _Start { get; set; }
        public int _Rows { get; set; }
    }
}

