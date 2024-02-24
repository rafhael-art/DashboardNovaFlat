using System;
using Dashboard.Model.Entites;
using MediatR;

namespace Dashboard.UseCase.UseCase.ReporteEstadoUnidadLima
{
    public class ReporteEstadoUnidadLimaQuery : IRequest<IEnumerable<ReporteXEstadoUnidad>>
    {
    }
}

