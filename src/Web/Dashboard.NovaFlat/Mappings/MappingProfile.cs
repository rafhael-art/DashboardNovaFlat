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
            CreateMap<DataTableModel<UnidadFlotaModelFilter, int>, UnidadFlotaListarQuery>()
               .ForMember(x => x._localidad, x => x.MapFrom(y => (y.filter!.Localidad == "0" || y.filter!.Localidad == null) ? "" : y.filter!.Localidad))
               .ForMember(x => x._placa, x => x.MapFrom(y => (y.filter!.Placa == null) ? "" : y.filter!.Placa))
               .ForMember(x => x._clase, x => x.MapFrom(y => (y.filter!.Clase == "0" || y.filter!.Clase == null) ? "" : y.filter!.Clase))
               .ForMember(x => x._ubicacion, x => x.MapFrom(y => (y.filter!.Ubicacion == "0" || y.filter!.Ubicacion == null) ? "" : y.filter!.Ubicacion))
               .ForMember(x => x._estadoUnidad, x => x.MapFrom(y => (y.filter!.EstadoUnidad == "0" || y.filter!.EstadoUnidad == null) ? "" : y.filter!.EstadoUnidad))
               .ForMember(x => x._anio, x => x.MapFrom(y => (y.filter!.valueAnio == "0" || y.filter!.valueAnio == null) ? "" : y.filter!.valueAnio))
               .ForMember(x => x._Start, x => x.MapFrom(y => y.start))
               .ForMember(x => x._Rows, x => x.MapFrom(y => y.length))
               ;

            CreateMap<DataTableModel<UnidadHistorialModelFilter, int>, HistorialListarQuery>()
                .ForMember(x => x._taller, x => x.MapFrom(y => (y.filter!.taller == null) ? "" : y.filter!.taller))
                .ForMember(x => x._situacion, x => x.MapFrom(y => (y.filter!.situacion == null) ? "" : y.filter!.situacion))
                .ForMember(x => x._Start, x => x.MapFrom(y => y.start))
                .ForMember(x => x._Rows, x => x.MapFrom(y => y.length))
                .ForMember(x => x._idUnidadFlota, x => x.MapFrom(y => y.filter!.idUnidad))
                ;

        }
    }
}

