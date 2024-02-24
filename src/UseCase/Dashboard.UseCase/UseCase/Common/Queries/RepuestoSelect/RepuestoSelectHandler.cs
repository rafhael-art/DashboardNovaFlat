using System;
using AutoMapper;
using Dashboard.Model.DTOs;
using Dashboard.Model.Entites;
using Dashboard.Persistence.Interfaces;
using MediatR;

namespace Dashboard.UseCase.UseCase.Common.Queries.RepuestoSelect
{
    public class RepuestoSelectHandler : IRequestHandler<RepuestoSelectQuery, IEnumerable<ECodRespuesto>>
    {
        private readonly IGenericRepository<ECodRespuestoResponseDto> _repository;
        private readonly IMapper _mapper;
        public RepuestoSelectHandler(IGenericRepository<ECodRespuestoResponseDto> repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ECodRespuesto>> Handle(RepuestoSelectQuery request, CancellationToken cancellationToken)
        {
            var data = await _repository.GetLisyAsync("LISTAR_COD_REPUESTO_NUBE", request);
            return _mapper.Map<IEnumerable<ECodRespuesto>>(data);
        }
    }
}

