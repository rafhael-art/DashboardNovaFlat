using Dashboard.Persistence.Context;
using Dashboard.Persistence.Interfaces;
using Dashboard.Persistence.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Dashboard.Persistence.Extensions
{
    public static class PersistenceInjection
    {
        public static IServiceCollection AddInjectionPersistence(this IServiceCollection services)
        {
            services.AddSingleton<DashboardDbContext>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            return services;
        }
    }
}

