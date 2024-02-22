using System;
using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using MediatR;

namespace Dashboard.UseCase.UseCase.Login.Queries.GetOptionsByUser
{
    public class GetOptionsByUserHandler : IRequestHandler<GetOptionsByUserQuery, IEnumerable<Opciones>>
    {
        public IGenericRepository<Opciones> _opcionesRepository;

        public GetOptionsByUserHandler(IGenericRepository<Opciones> opcionesRepository)
        {
            _opcionesRepository = opcionesRepository;
        }

        public async Task<IEnumerable<Opciones>> Handle(GetOptionsByUserQuery request, CancellationToken cancellationToken)
        {
            return await _opcionesRepository.GetLisyAsync("SGE_OPCIONES_X_USUARIO", request);
        }
    }
}

