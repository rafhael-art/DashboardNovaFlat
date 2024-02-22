using System;
using AutoMapper;
using Dashboard.Common.DataTable;
using Dashboard.NovaFlat.Models;
using Dashboard.UseCase.UseCase.UnidadFlota.Queries.HistorialListar;
using Dashboard.UseCase.UseCase.UnidadFlota.Queries.UnidadFlotaListar;

namespace Dashboard.NovaFlat.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UnidadFlotaModelFilter, UnidadFlotaListarQuery>()
               .ForMember(x => x._localidad, x => x.MapFrom(y => (y.Localidad == "0" || y.Localidad == null) ? "" : y.Localidad))
               .ForMember(x => x._placa, x => x.MapFrom(y => (y.Placa == null) ? "" : y.Placa))
               .ForMember(x => x._clase, x => x.MapFrom(y => (y.Clase == "0" || y.Clase == null) ? "" : y.Clase))
               .ForMember(x => x._ubicacion, x => x.MapFrom(y => (y.Ubicacion == "0" || y.Ubicacion == null) ? "" : y.Ubicacion))
               .ForMember(x => x._estadoUnidad, x => x.MapFrom(y => (y.EstadoUnidad == "0" || y.EstadoUnidad == null) ? "" : y.EstadoUnidad))
               .ForMember(x => x._anio, x => x.MapFrom(y => (y.valueAnio == "0" || y.valueAnio == null) ? "" : y.valueAnio));

            CreateMap<UnidadHistorialModelFilter, HistorialListarQuery>()
                .ForMember(x => x._taller, x => x.MapFrom(y => (y.taller == null) ? "" : y.taller))
                .ForMember(x => x._situacion, x => x.MapFrom(y => (y.situacion == null) ? "" : y.situacion));

        }
    }
}

