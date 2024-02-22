using System;
using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using MediatR;

namespace Dashboard.UseCase.UseCase.Common.Queries.MantenimientoSelect
{
    public class MantenimientoSelectHandler : IRequestHandler<MantenimientoSelectQuery, IEnumerable<EMantenimiento>>
    {
        private readonly IGenericRepository<EMantenimiento> _repository;
        public MantenimientoSelectHandler(IGenericRepository<EMantenimiento> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<EMantenimiento>> Handle(MantenimientoSelectQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetLisyAsync("SGEN_LISTAR_MANTENIMIENTO_NUBE", request);
        }
    }
}

