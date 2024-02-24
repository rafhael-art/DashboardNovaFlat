using System;
using AutoMapper;
using Dashboard.Model.DTOs;
using Dashboard.Persistence.Interfaces;
using MediatR;
using E = Dashboard.Model.Entites;

namespace Dashboard.UseCase.UseCase.Common.Queries.UnidadFlotaSelect
{
    public class UnidadFlotaSelectHandler : IRequestHandler<UnidadFlotaSelectQuery, IEnumerable<E.UnidadFlota>>
    {
        private readonly IGenericRepository<UnidadFlotaResponseDto> _repository;
        private readonly IMapper _mapper;
        public UnidadFlotaSelectHandler(IGenericRepository<UnidadFlotaResponseDto> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<E.UnidadFlota>> Handle(UnidadFlotaSelectQuery request, CancellationToken cancellationToken)
        {
            var data = await _repository.GetLisyAsync("SGE_SELECT_COMBO_NUBE", request);
            return _mapper.Map<IEnumerable<E.UnidadFlota>>(data);
        }
    }
}

