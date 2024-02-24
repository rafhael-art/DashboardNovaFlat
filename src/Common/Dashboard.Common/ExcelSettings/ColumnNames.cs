namespace Dashboard.Common.ExcelSettings;
public static class ColumnNames
{
    public static List<string> ObtenerNombresAtributos<T>()
    {
        var properties = typeof(T).GetProperties();
        return properties.Select(p => p.Name).ToList();
    }
}


