using System;
namespace Dashboard.NovaFlat.Models;

public class UsuarioLogin
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public int RolId { get; set; }
    public string? RolNombre { get; set; }
    public string? Nombre { get; set; }
    public string? Apellidos { get; set; }
}