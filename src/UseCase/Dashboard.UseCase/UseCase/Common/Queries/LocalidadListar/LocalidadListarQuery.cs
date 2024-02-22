using System;
using MediatR;
using E = Dashboard.Model.Entites;

namespace Dashboard.UseCase.UseCase.Common.Queries.LocalidadListar
{
    public class LocalidadListarQuery : IRequest<IEnumerable<E.UnidadFlota>>
    {
    }
}

