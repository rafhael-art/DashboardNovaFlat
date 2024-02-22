using System;
using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using MediatR;

namespace Dashboard.UseCase.UseCase.AnexoIV.Queries.EstadoSelect
{
    public class EstadoSelectHandler : IRequestHandler<EstadoSelectQuery, IEnumerable<EEstado>>
    {
        private readonly IGenericRepository<EEstado> _repository;
        public EstadoSelectHandler(IGenericRepository<EEstado> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<EEstado>> Handle(EstadoSelectQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetLisyAsync("SGEN_LISTAR_ESTADOS_NUBE", request);
        }
    }
}

