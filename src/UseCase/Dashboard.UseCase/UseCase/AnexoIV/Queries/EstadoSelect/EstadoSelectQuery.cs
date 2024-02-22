using System;
using Dashboard.Model.Entites;
using MediatR;

namespace Dashboard.UseCase.UseCase.AnexoIV.Queries.EstadoSelect
{
    public class EstadoSelectQuery : IRequest<IEnumerable<EEstado>>
    {
    }
}

