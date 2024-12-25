namespace Book.API.Models;

public class UpdateBookModel
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Author { get; set; }
    public string Summary { get; set; }
    public string Genre { get; set; }
    public int Year { get; set; }
}