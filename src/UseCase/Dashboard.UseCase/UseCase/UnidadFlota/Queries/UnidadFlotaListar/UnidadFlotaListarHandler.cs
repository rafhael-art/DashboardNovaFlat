using AutoMapper;
using Dashboard.Model.DTOs;
using Dashboard.Persistence.Interfaces;
using MediatR;
using E = Dashboard.Model.Entites;


namespace Dashboard.UseCase.UseCase.UnidadFlota.Queries.UnidadFlotaListar
{
    public class UnidadFlotaListarHandler : IRequestHandler<UnidadFlotaListarQuery, IEnumerable<E.UnidadFlota>>
    {
        public IGenericRepository<UnidadFlotaResponseDto> _unidadFlotaRepository;
        private readonly IMapper _mapper;

        public UnidadFlotaListarHandler(IGenericRepository<UnidadFlotaResponseDto> unidadFlotaRepository, IMapper mapper)
        {
            _unidadFlotaRepository = unidadFlotaRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<E.UnidadFlota>> Handle(UnidadFlotaListarQuery request, CancellationToken cancellationToken)
        {
            var data = await _unidadFlotaRepository.GetLisyAsync("SGE_LISTA_UNIDAD_FLOTA_NUBE", request);
            return _mapper.Map<IEnumerable<E.UnidadFlota>>(data);
        }
    }
}

