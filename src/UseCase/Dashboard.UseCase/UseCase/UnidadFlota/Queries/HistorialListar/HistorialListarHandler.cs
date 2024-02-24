using AutoMapper;
using Dashboard.Model.DTOs;
using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using MediatR;

namespace Dashboard.UseCase.UseCase.UnidadFlota.Queries.HistorialListar
{
    public class HistorialListarHandler : IRequestHandler<HistorialListarQuery, IEnumerable<UnidadHistorial>>
    {
        private readonly IGenericRepository<UnidadHistorialReponseDto> _Repository;
        private readonly IMapper _mapper;
        public HistorialListarHandler(IGenericRepository<UnidadHistorialReponseDto> repository, IMapper mapper)
        {
            _Repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UnidadHistorial>> Handle(HistorialListarQuery request, CancellationToken cancellationToken)
        {
            var data = await _Repository.GetLisyAsync("SGE_LISTAR_UNIDAD_HISTORIAL_NUBE", request);
            return _mapper.Map<IEnumerable<UnidadHistorial>>(data);
        }
    }
}

