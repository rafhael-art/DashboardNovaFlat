using System;
using System.Data;
using Dapper;
using Dashboard.Persistence.Context;
using Dashboard.Persistence.Interfaces;

namespace Dashboard.Persistence.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {

        private readonly DashboardDbContext _context;

        public GenericRepository(DashboardDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ExecAsync(string storeProcedure, object parameter)
        {
            using IDbConnection connection = _context.CreateConnection;
            DynamicParameters objParam = new(parameter);
            int recordAffected = await connection.ExecuteAsync(
                sql: storeProcedure,
                param: objParam,
                commandTimeout: int.MaxValue,
                commandType: CommandType.StoredProcedure
                );
            return recordAffected > 0;
        }

        public async Task<T> GetEntityAsync(string storeProcedure, object parameter)
        {
            using IDbConnection connection = _context.CreateConnection;
            DynamicParameters objParam = new(parameter);
            return (await connection.QueryFirstOrDefaultAsync<T>(
                sql: storeProcedure,
                param: objParam,
                commandTimeout: int.MaxValue,
                commandType: CommandType.StoredProcedure
                ))!;
        }

        public async Task<IEnumerable<T>> GetLisyAsync(string storeProcedure, object parameter)
        {
            using IDbConnection connection = _context.CreateConnection;

            DynamicParameters objParam = new(parameter);
            return await connection.QueryAsync<T>(
                sql: storeProcedure,
                param: objParam,
                commandTimeout: int.MaxValue,
                commandType: CommandType.StoredProcedure
                );
        }
    }
}

