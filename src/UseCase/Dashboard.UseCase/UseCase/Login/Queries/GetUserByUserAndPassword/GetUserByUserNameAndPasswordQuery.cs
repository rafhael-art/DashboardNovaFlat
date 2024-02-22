using System;
using Dashboard.Model.Entites;
using MediatR;

namespace Dashboard.UseCase.UseCase.Login.Queries.GetUserByUserAndPassword;
public class GetOptionsbyUser : IRequest<Usuario>
{
    public string? _Usuario { get; set; }
    public string? _pass { get; set; }
}
