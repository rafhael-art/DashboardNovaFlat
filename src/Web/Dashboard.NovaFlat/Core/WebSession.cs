using Dashboard.Model.Entites;
using Dashboard.NovaFlat.Models;
using Dashboard.NovaFlat.Util;
using Newtonsoft.Json;

namespace Dashboard.NovaFlat.Core
{
    public static class WebSession
    {
        private static IHttpContextAccessor HttpContextAccessor => new HttpContextAccessor();

        public static UsuarioLogin Usuario
        {
            get => Get<UsuarioLogin>(Constantes.UsuarioSesion);
            set => Set(Constantes.UsuarioSesion, value);
        }

        public static IEnumerable<Opciones> opciones
        {
            get => Get<IEnumerable<Opciones>>(Constantes.OpcionSesion);
            set => Set(Constantes.OpcionSesion, value);
        }

        public static IEnumerable<UnidadFlota> ReporteUnidadFlota
        {
            get => Get<IEnumerable<UnidadFlota>>(Constantes.ReporteUnidadFlota);
            set => Set(Constantes.ReporteUnidadFlota, value);
        }

        private static T Get<T>(string key)
        {
            var sessionData = HttpContextAccessor.HttpContext!.Session.GetString(key);
            return (sessionData == null ? default : JsonConvert.DeserializeObject<T>(sessionData))!;
        }

        private static void Set<T>(string key, T value)
        {
            HttpContextAccessor.HttpContext!.Session.SetString(key, JsonConvert.SerializeObject(value));
        }


    }
}

