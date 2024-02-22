using System;
using Dashboard.Model.Entites;
using MediatR;

namespace Dashboard.UseCase.UseCase.Common.Queries.MantenimientoSelect
{
    public class MantenimientoSelectQuery : IRequest<IEnumerable<EMantenimiento>>
    {

    }
}

