namespace Dashboard.Persistence.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetLisyAsync(string storeProcedure, object parameter);
        Task<bool> ExecAsync(string storeProcedure, object parameter);
        Task<T> GetEntityAsync(string storeProcedure, object parameter);
    }
}

