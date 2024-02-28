using System;
using Dashboard.Persistence.Interfaces;
using MediatR;
using E = Dashboard.Model.Entites;

namespace Dashboard.UseCase.UseCase.AnexoV.Queries.AnexoVLista;

public class AnexoVListaHandler : IRequestHandler<AnexoVListaQuery, IEnumerable<E.AnexoV>>
{
    private readonly IGenericRepository<E.AnexoV> _repository;
    public AnexoVListaHandler(IGenericRepository<E.AnexoV> repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<E.AnexoV>> Handle(AnexoVListaQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetLisyAsync("SGEC_REPORTE_ANEXO_05_LISTAR_NUBE", request);
    }
}