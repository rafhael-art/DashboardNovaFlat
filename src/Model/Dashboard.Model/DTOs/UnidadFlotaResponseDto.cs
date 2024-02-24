using System;
namespace Dashboard.Model.DTOs
{
    public class UnidadFlotaResponseDto
    {
        public int ufc_iid_unidades { get; set; }
        public string? ufc_vlocalidad { get; set; }
        public string? ufc_vplaca { get; set; }
        public string? ufc_vclase { get; set; }
        public string? ufc_vmarca { get; set; }
        public string? ufc_vmodelo { get; set; }
        public string? ufc_vanio { get; set; }
        public string? ufc_vestado { get; set; }
        public string? ufc_vubicacion { get; set; }
        public decimal ufc_ncosto_adquisicion { get; set; }
        public string? ufc_vnumero_poliza { get; set; }
        public string? ufc_vnumero_certificado { get; set; }
        public string? ufc_nvalor_asegurado { get; set; }
        public decimal ufc_nmonto_deducible { get; set; }
        public string? ufc_sfecha_inicio_operaciones { get; set; }
        public string? ufc_vplaca_rodaje { get; set; }
        public decimal ufc_dcosto_unidad { get; set; }
        public int cantidad { get; set; }
    }
}

