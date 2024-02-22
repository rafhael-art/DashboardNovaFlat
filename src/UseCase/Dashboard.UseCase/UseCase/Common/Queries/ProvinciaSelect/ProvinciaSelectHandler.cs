using System;
using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using MediatR;

namespace Dashboard.UseCase.UseCase.Common.Queries.ProvinciaSelect
{
    public class ProvinciaSelectHandler : IRequestHandler<ProvinciaSelectQuery, IEnumerable<EUbicacionNuevo>>
    {
        private readonly IGenericRepository<EUbicacionNuevo> _repository;
        public ProvinciaSelectHandler(IGenericRepository<EUbicacionNuevo> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<EUbicacionNuevo>> Handle(ProvinciaSelectQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetLisyAsync("SGEN_LISTAR_PROVINCIA", request);
        }
    }
}

