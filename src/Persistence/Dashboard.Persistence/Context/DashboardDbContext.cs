using System;
using Microsoft.Data.SqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;

namespace Dashboard.Persistence.Context
{
    public class DashboardDbContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public DashboardDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("NovaFlatConnection")!;
        }
        public IDbConnection CreateConnection => new SqlConnection(_connectionString);
    }
}

