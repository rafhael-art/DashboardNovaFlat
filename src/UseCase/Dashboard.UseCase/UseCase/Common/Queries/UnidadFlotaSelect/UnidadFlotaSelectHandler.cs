using System;
using Dashboard.Persistence.Interfaces;
using MediatR;
using E = Dashboard.Model.Entites;

namespace Dashboard.UseCase.UseCase.Common.Queries.UnidadFlotaSelect
{
    public class UnidadFlotaSelectHandler : IRequestHandler<UnidadFlotaSelectQuery, IEnumerable<E.UnidadFlota>>
    {
        private readonly IGenericRepository<E.UnidadFlota> _repository;
        public UnidadFlotaSelectHandler(IGenericRepository<E.UnidadFlota> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<E.UnidadFlota>> Handle(UnidadFlotaSelectQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetLisyAsync("SGE_SELECT_COMBO_NUBE", request);
        }
    }
}

