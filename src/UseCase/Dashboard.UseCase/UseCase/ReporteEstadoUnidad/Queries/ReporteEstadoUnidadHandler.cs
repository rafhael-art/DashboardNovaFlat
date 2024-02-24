using System;
using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using MediatR;

namespace Dashboard.UseCase.UseCase.ReporteEstadoUnidad.Queries
{
    public class ReporteEstadoUnidadHandler : IRequestHandler<ReporteEstadoUnidadQuery, IEnumerable<ReporteXEstadoUnidad>>
    {
        private readonly IGenericRepository<ReporteXEstadoUnidad> _repository;
        public ReporteEstadoUnidadHandler(IGenericRepository<ReporteXEstadoUnidad> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ReporteXEstadoUnidad>> Handle(ReporteEstadoUnidadQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetLisyAsync("SGE_OBTENER_CANTIDAD_X_ESTADO_UNIDAD", request);
        }
    }
}

