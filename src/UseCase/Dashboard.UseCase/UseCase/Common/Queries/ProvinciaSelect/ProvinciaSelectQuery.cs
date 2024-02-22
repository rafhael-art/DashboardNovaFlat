using System;
using Dashboard.Model.Entites;
using MediatR;

namespace Dashboard.UseCase.UseCase.Common.Queries.ProvinciaSelect
{
    public class ProvinciaSelectQuery : IRequest<IEnumerable<EUbicacionNuevo>>
    {
        public int ICOD_DEPARTAMENTO { get; set; }
    }
}

