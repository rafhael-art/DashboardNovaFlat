namespace Dashboard.Model.Entites;

public class EUsuario
{
    public int usua_icod_usuario { get; set; }
    public string? usua_codigo_usuario { get; set; }
    public string? usua_nombre_usuario { get; set; }
    public string? usua_password_usuario { get; set; }
    public bool usua_iactivo { get; set; }
    public string? strEstado { get; set; }
    public bool usua_bindicador_web { get; set; }
    public int u_iid_usuario_mysql { get; set; }
    public int intUsuario { get; set; }
    public string? strPc { get; set; }
}