namespace Book.API.Models
{
    public class AddBookModel
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Summary { get; set; }
        public string Genre { get; set; }
        public int Year { get; set; }
    }
}