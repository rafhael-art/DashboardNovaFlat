using System;
using Dashboard.Model.Entites;
using MediatR;

namespace Dashboard.UseCase.UseCase.ReporteEstadoUnidad.Queries
{
    public class ReporteEstadoUnidadQuery : IRequest<IEnumerable<ReporteXEstadoUnidad>>
    {

    }
}

