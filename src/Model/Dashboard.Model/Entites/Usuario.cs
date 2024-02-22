namespace Dashboard.Model.Entites;

public class Usuario
{
    public int u_iid_usuario { get; set; }
    public string? u_vUsername { get; set; }
    public string? u_vpassword { get; set; }
    public string? u_vnombre { get; set; }
    public string? u_vapellidos { get; set; }
    public int u_iid_Rol { get; set; }
    public int u_iestado { get; set; }

    public string? respuesta { get; set; }
}