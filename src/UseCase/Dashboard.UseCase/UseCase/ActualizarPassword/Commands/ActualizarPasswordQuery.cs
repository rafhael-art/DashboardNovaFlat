using MediatR;

namespace Dashboard.UseCase.UseCase.ActualizarPassword.Commands;

public class ActualizarPasswordQuery : IRequest<bool>
{
    public int usua_icod_usuario { get; set; }
    public string? usua_password_usuario { get; set; }
    public string? usua_secured_key { get; private set; } = "ACCESSKEY";
}