using System;
using Dashboard.Persistence.Interfaces;
using MediatR;
using E = Dashboard.Model.Entites;

namespace Dashboard.UseCase.UseCase.Common.Queries.LocalidadListar
{
    public class LocalidadListarHandler : IRequestHandler<LocalidadListarQuery, IEnumerable<E.UnidadFlota>>
    {
        private readonly IGenericRepository<E.UnidadFlota> _unidadFlotaRepository;

        public LocalidadListarHandler(IGenericRepository<E.UnidadFlota> unidadFlotaRepository)
        {
            _unidadFlotaRepository = unidadFlotaRepository;
        }

        public async Task<IEnumerable<E.UnidadFlota>> Handle(LocalidadListarQuery request, CancellationToken cancellationToken)
        {
            return await _unidadFlotaRepository.GetLisyAsync("SGE_SELECT_COMBO_NUBE", request);
        }
    }
}

