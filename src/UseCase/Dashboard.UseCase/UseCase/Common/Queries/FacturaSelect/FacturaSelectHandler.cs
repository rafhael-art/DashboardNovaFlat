using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using MediatR;

namespace Dashboard.UseCase.UseCase.Common.Queries.FacturaSelect;

public class FacturaSelectHandler : IRequestHandler<FacturaSelectQuery, IEnumerable<EFactura>>
{
    private readonly IGenericRepository<EFactura> _repository;
    public FacturaSelectHandler(IGenericRepository<EFactura> repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<EFactura>> Handle(FacturaSelectQuery request, CancellationToken cancellationToken)
    {
        return await _repository.GetLisyAsync("SGEC_COMBO_FACTURAS_NUBE", request);
    }
}