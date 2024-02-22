using System;
using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using MediatR;

namespace Dashboard.UseCase.UseCase.Common.Queries.DistritoSelect
{
    public class DistritoSelectHandler : IRequestHandler<DistritoSelectQuery, IEnumerable<EUbicacionNuevo>>
    {
        private readonly IGenericRepository<EUbicacionNuevo> _repository;
        public DistritoSelectHandler(IGenericRepository<EUbicacionNuevo> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<EUbicacionNuevo>> Handle(DistritoSelectQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetLisyAsync("SGEN_LISTAR_DISTRITO", request);
        }
    }
}

