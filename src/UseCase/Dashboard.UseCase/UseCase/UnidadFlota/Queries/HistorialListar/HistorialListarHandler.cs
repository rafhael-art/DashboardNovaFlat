using System;
using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using Dashboard.UseCase.UseCase.Common.Queries.LocalidadListar;
using MediatR;

namespace Dashboard.UseCase.UseCase.UnidadFlota.Queries.HistorialListar
{
    public class HistorialListarHandler : IRequestHandler<HistorialListarQuery, IEnumerable<UnidadHistorial>>
    {
        private readonly IGenericRepository<UnidadHistorial> _Repository;
        public HistorialListarHandler(IGenericRepository<UnidadHistorial> repository)
        {
            _Repository = repository;
        }

        public async Task<IEnumerable<UnidadHistorial>> Handle(HistorialListarQuery request, CancellationToken cancellationToken)
        {
            return await _Repository.GetLisyAsync("SGE_LISTAR_UNIDAD_HISTORIAL_NUBE", request);
        }
    }
}

