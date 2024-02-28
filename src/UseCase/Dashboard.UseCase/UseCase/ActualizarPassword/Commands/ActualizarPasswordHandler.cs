using System;
using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using MediatR;

namespace Dashboard.UseCase.UseCase.ActualizarPassword.Commands;

public class ActualizarPasswordHandler : IRequestHandler<ActualizarPasswordQuery, bool>
{
    private readonly IGenericRepository<EUsuario> _repository;
    public ActualizarPasswordHandler(IGenericRepository<EUsuario> repository)
    {
        _repository = repository;
    }

    public async Task<bool> Handle(ActualizarPasswordQuery request, CancellationToken cancellationToken)
    {
        return await _repository.ExecAsync("SGES_USUARIO_MODIFICAR_PASSWORD_NUBE", request);
    }
}
