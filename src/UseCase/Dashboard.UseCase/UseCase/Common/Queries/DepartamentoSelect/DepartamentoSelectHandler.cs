using System;
using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using MediatR;

namespace Dashboard.UseCase.UseCase.Common.Queries.DepartamentoSelect
{
    public class DepartamentoSelectHandler : IRequestHandler<DepartamentoSelectQuery, IEnumerable<EUbicacionNuevo>>
    {
        private readonly IGenericRepository<EUbicacionNuevo> _repository;
        public DepartamentoSelectHandler(IGenericRepository<EUbicacionNuevo> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<EUbicacionNuevo>> Handle(DepartamentoSelectQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetLisyAsync("SGEN_LISTAR_DEPARTAMENTO", request);
        }
    }
}

