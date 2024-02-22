using System;
using MediatR;
using E = Dashboard.Model.Entites;

namespace Dashboard.UseCase.UseCase.Common.Queries.UnidadFlotaSelect
{
    public class UnidadFlotaSelectQuery : IRequest<IEnumerable<E.UnidadFlota>>
    {

    }
}

