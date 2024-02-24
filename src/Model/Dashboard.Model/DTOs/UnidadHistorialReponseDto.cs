using System;
namespace Dashboard.Model.DTOs
{
    public class UnidadHistorialReponseDto
    {
        public int uhd_iid_unidad_hitorial { get; set; }
        public string? uhd_dfecha { get; set; }
        public string? uhd_vreporte_averia { get; set; }
        public string? uhd_dfecha_ingreso_taller { get; set; }
        public string? uhd_vdocumento_ingreso { get; set; }
        public string? uhd_vkilometraje { get; set; }
        public string? uhd_vtaller { get; set; }
        public string? uhd_vdescripcion_trabajo { get; set; }
        public string? uhd_dfecha_estimada { get; set; }
        public string? uhd_dfecha_salida_taller { get; set; }
        public string? uhd_vsituacion { get; set; }
        public decimal uhd_dcosto { get; set; }
        public string? uhd_tipo_mantenimiento { get; set; }
        public string? uhd_vcobertura { get; set; }
        public int cantidad { get; set; }
    }
}

