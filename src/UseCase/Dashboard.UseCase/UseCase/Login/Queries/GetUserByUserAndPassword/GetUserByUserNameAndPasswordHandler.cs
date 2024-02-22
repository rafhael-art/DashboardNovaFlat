﻿using System;
using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using MediatR;

namespace Dashboard.UseCase.UseCase.Login.Queries.GetUserByUserAndPassword;

public class GetUserByUserNameAndPasswordHandler : IRequestHandler<GetOptionsbyUser, Usuario>
{
    public IGenericRepository<Usuario> _userRepository;

    public GetUserByUserNameAndPasswordHandler(IGenericRepository<Usuario> userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<Usuario> Handle(GetOptionsbyUser request, CancellationToken cancellationToken)
    {
        return await _userRepository.GetEntityAsync("SGE_LOGIN_NUBE", request);
    }
}