using System;
using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using MediatR;

namespace Dashboard.UseCase.UseCase.Common.Queries.RepuestoSelect
{
    public class RepuestoSelectHandler : IRequestHandler<RepuestoSelectQuery, IEnumerable<ECodRespuesto>>
    {
        private readonly IGenericRepository<ECodRespuesto> _repository;
        public RepuestoSelectHandler(IGenericRepository<ECodRespuesto> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ECodRespuesto>> Handle(RepuestoSelectQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetLisyAsync("LISTAR_COD_REPUESTO_NUBE", request);
        }
    }
}

