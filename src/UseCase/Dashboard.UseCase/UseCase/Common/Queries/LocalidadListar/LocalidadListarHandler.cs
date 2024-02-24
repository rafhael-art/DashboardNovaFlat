using System;
using AutoMapper;
using Dashboard.Model.DTOs;
using Dashboard.Persistence.Interfaces;
using MediatR;
using E = Dashboard.Model.Entites;

namespace Dashboard.UseCase.UseCase.Common.Queries.LocalidadListar
{
    public class LocalidadListarHandler : IRequestHandler<LocalidadListarQuery, IEnumerable<E.UnidadFlota>>
    {
        private readonly IGenericRepository<SelectComboResponseDto> _unidadFlotaRepository;
        private readonly IMapper _mapper;

        public LocalidadListarHandler(IGenericRepository<SelectComboResponseDto> unidadFlotaRepository, IMapper mapper)
        {
            _unidadFlotaRepository = unidadFlotaRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<E.UnidadFlota>> Handle(LocalidadListarQuery request, CancellationToken cancellationToken)
        {
            var data = await _unidadFlotaRepository.GetLisyAsync("SGE_SELECT_COMBO_NUBE", request);
            return _mapper.Map<IEnumerable<E.UnidadFlota>>(data);
        }
    }
}

