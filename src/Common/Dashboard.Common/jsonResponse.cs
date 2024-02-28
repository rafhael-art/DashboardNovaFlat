namespace Dashboard.Common;

public class jsonResponse
{
    public string? Title { get; set; }
    public string? Message { get; set; }
    public bool Success { get; set; }
    public bool Warning { get; set; }
    public object? Data { get; set; }
    public string? InnerExepcion { get; set; }
}
