using System.Reflection;
using Microsoft.Extensions.DependencyInjection;

namespace Dashboard.UseCase.Extensions
{
    public static class UseCaseInjection
    {
        public static IServiceCollection AddInjectionApplication(this IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(AppDomain.CurrentDomain.GetAssemblies()));
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            return services;
        }
    }
}

