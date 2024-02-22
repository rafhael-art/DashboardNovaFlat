using Dashboard.Persistence.Interfaces;
using MediatR;
using E = Dashboard.Model.Entites;

namespace Dashboard.UseCase.UseCase.UnidadFlota.Queries.UnidadFlotaListar
{
    public class UnidadFlotaListarHandler : IRequestHandler<UnidadFlotaListarQuery, IEnumerable<E.UnidadFlota>>
    {
        public IGenericRepository<E.UnidadFlota> _unidadFlotaRepository;

        public UnidadFlotaListarHandler(IGenericRepository<E.UnidadFlota> unidadFlotaRepository)
        {
            _unidadFlotaRepository = unidadFlotaRepository;
        }

        public async Task<IEnumerable<E.UnidadFlota>> Handle(UnidadFlotaListarQuery request, CancellationToken cancellationToken)
        {
            return await _unidadFlotaRepository.GetLisyAsync("SGE_LISTA_UNIDAD_FLOTA_NUBE", request);
        }
    }
}

