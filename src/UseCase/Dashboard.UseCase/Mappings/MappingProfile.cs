using System;
using AutoMapper;
using Dashboard.Common.DataTable;
using Dashboard.Model.DTOs;
using Dashboard.Model.Entites;
using Dashboard.UseCase.UseCase.UnidadFlota.Queries.UnidadFlotaListar;

namespace Dashboard.UseCase.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UnidadFlotaResponseDto, UnidadFlota>()
                .ForMember(dest => dest.id, opt => opt.MapFrom(src => src.ufc_iid_unidades))
                .ForMember(dest => dest.localidad, opt => opt.MapFrom(src => src.ufc_vlocalidad))
                .ForMember(dest => dest.placa, opt => opt.MapFrom(src => src.ufc_vplaca))
                .ForMember(dest => dest.clase, opt => opt.MapFrom(src => src.ufc_vclase))
                .ForMember(dest => dest.marca, opt => opt.MapFrom(src => src.ufc_vmarca))
                .ForMember(dest => dest.modelo, opt => opt.MapFrom(src => src.ufc_vmarca))
                .ForMember(dest => dest.anio, opt => opt.MapFrom(src => src.ufc_vanio))
                .ForMember(dest => dest.estado, opt => opt.MapFrom(src => src.ufc_vestado))
                .ForMember(dest => dest.ubicacion, opt => opt.MapFrom(src => src.ufc_vubicacion))
                .ForMember(dest => dest.costo_adquisicion, opt => opt.MapFrom(src => src.ufc_ncosto_adquisicion))
                .ForMember(dest => dest.numero_poliza, opt => opt.MapFrom(src => src.ufc_vnumero_poliza))
                .ForMember(dest => dest.numero_certificado, opt => opt.MapFrom(src => src.ufc_vnumero_certificado))
                .ForMember(dest => dest.valor_asegurado, opt => opt.MapFrom(src => src.ufc_nvalor_asegurado))
                .ForMember(dest => dest.monto_deducido, opt => opt.MapFrom(src => src.ufc_nmonto_deducible))
                .ForMember(dest => dest.fecha_inicio_operacion, opt => opt.MapFrom(src => src.ufc_sfecha_inicio_operaciones))
                .ForMember(dest => dest.placa_rodaje, opt => opt.MapFrom(src => src.ufc_vplaca_rodaje))
                .ForMember(dest => dest.ufc_dcosto_unidad, opt => opt.MapFrom(src => src.ufc_dcosto_unidad))
                .ForMember(dest => dest.cantidad, opt => opt.MapFrom(src => src.cantidad));

            CreateMap<UnidadHistorialReponseDto, UnidadHistorial>()
                .ForMember(dest => dest.id, opt => opt.MapFrom(src => src.uhd_iid_unidad_hitorial))
                ;

            CreateMap<SelectComboResponseDto, UnidadFlota>()
                .ForMember(dest => dest.id, opt => opt.MapFrom(src => src.ufc_iid_unidades))
                .ForMember(dest => dest.localidad, opt => opt.MapFrom(src => src.ufc_vlocalidad))
                .ForMember(dest => dest.ubicacion, opt => opt.MapFrom(src => src.ufc_vubicacion))
                .ForMember(dest => dest.clase, opt => opt.MapFrom(src => src.ufc_vclase))
                .ForMember(dest => dest.placa, opt => opt.MapFrom(src => src.ufc_vplaca))
                .ForMember(dest => dest.marca, opt => opt.MapFrom(src => src.ufc_vmarca))
                .ForMember(dest => dest.modelo, opt => opt.MapFrom(src => src.ufc_vmodelo))
                .ForMember(dest => dest.anio, opt => opt.MapFrom(src => src.ufc_vanio))
                .ForMember(dest => dest.estado, opt => opt.MapFrom(src => src.ufc_vestado))
                .ForMember(dest => dest.cantidad, opt => opt.MapFrom(src => 1))
                .ForMember(dest => dest.numero_poliza, opt => opt.Ignore())
                .ForMember(dest => dest.numero_certificado, opt => opt.Ignore())
                .ForMember(dest => dest.valor_asegurado, opt => opt.Ignore())
                .ForMember(dest => dest.monto_deducido, opt => opt.Ignore())
                .ForMember(dest => dest.fecha_inicio_operacion, opt => opt.Ignore())
                .ForMember(dest => dest.placa_rodaje, opt => opt.Ignore())
                .ForMember(dest => dest.costo_adquisicion, opt => opt.Ignore())
                .ForMember(dest => dest.ufc_dcosto_unidad, opt => opt.Ignore())
                ;

            CreateMap<ECodRespuestoResponseDto, ECodRespuesto>()
                .ForMember(dest => dest.repuesto, opt => opt.MapFrom(src => src.rc_vnumero));
        }
    }
}

