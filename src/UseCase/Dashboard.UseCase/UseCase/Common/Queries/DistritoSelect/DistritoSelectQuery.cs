using System;
using Dashboard.Model.Entites;
using MediatR;

namespace Dashboard.UseCase.UseCase.Common.Queries.DistritoSelect
{
    public class DistritoSelectQuery : IRequest<IEnumerable<EUbicacionNuevo>>
    {
        public int ICOD_DEPARTAMENTO { get; set; }

    }
}

