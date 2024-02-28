using Dashboard.Model.Entites;
using MediatR;

namespace Dashboard.UseCase.UseCase.Common.Queries.FacturaSelect;

public class FacturaSelectQuery : IRequest<IEnumerable<EFactura>>
{
}

