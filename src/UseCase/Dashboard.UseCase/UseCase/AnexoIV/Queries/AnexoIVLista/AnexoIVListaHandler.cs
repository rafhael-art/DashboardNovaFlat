using Dashboard.Persistence.Interfaces;
using MediatR;
using E = Dashboard.Model.Entites;

namespace Dashboard.UseCase.UseCase.AnexoIV.Queries.AnexoIVLista
{
    public class AnexoIVListaHandler : IRequestHandler<AnexoIVListaQuery, IEnumerable<E.AnexoIV>>
    {
        private readonly IGenericRepository<E.AnexoIV> _repository;
        public AnexoIVListaHandler(IGenericRepository<E.AnexoIV> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<E.AnexoIV>> Handle(AnexoIVListaQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetLisyAsync("SGEC_REPORTE_ANEXO_04_LISTAR_NUBE", request);
        }
    }
}

