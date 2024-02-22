using Dashboard.Model.Entites;
using MediatR;

namespace Dashboard.UseCase.UseCase.Login.Queries.GetOptionsByUser
{
    public class GetOptionsByUserQuery : IRequest<IEnumerable<Opciones>>
    {
        public int idUsuario { get; set; }
    }
}

