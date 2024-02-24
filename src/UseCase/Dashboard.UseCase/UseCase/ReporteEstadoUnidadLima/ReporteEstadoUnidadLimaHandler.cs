using System;
using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using MediatR;

namespace Dashboard.UseCase.UseCase.ReporteEstadoUnidadLima
{
    public class ReporteEstadoUnidadLimaHandler : IRequestHandler<ReporteEstadoUnidadLimaQuery, IEnumerable<ReporteXEstadoUnidad>>
    {
        private readonly IGenericRepository<ReporteXEstadoUnidad> _repository;
        public ReporteEstadoUnidadLimaHandler(IGenericRepository<ReporteXEstadoUnidad> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ReporteXEstadoUnidad>> Handle(ReporteEstadoUnidadLimaQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetLisyAsync("SGE_OBTENER_CANTIDAD_X_ESTADO_UNIDAD_LIMA", request);
        }
    }
}

