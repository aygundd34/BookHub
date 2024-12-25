using Book.API.Models;
using MongoDB.Driver;
using MongoDB.Bson;

namespace Book.API.Services
{
    public class BookService
    {
        private readonly IMongoCollection<BookModel> _books;

        public BookService(IMongoDatabase database)
        {
            _books = database.GetCollection<BookModel>("Books");
        }

        // Kitap Ekleme
        public async Task CreateBookAsync(AddBookModel bookModel)
        {
            var book = new BookModel
            {
                Title = bookModel.Title,
                Author = bookModel.Author,
                Summary = bookModel.Summary,
                Genre = bookModel.Genre,
                Year = bookModel.Year
            };
            await _books.InsertOneAsync(book); //kitabın eklenmesi
        }

        // Kitapları Listeleme
        public async Task<List<GetListBookModel>> GetBooksAsync()
        {
            return await _books.Find(_ => true)
                .Project(book => new GetListBookModel
                {
                    Id = book.Id.ToString(),
                    Title = book.Title,
                    Author = book.Author,
                }).ToListAsync(); // Kitapları liste olarak döndürme
        }

        // ID'ye Göre Kitap Alma
        public async Task<GetBookModel?> GetBookByIdAsync(string id)
        {
            var book = await _books.Find(Builders<BookModel>.Filter.Eq("_id", ObjectId.Parse(id))).FirstOrDefaultAsync();
            return book == null ? null : new GetBookModel
            {
                Id = book.Id.ToString(),
                Title = book.Title,
                Author = book.Author,
                Summary = book.Summary,
                Genre = book.Genre,
                Year = book.Year
            };
        }

        // Kitap Güncelleme 
        public async Task UpdateBookAsync(UpdateBookModel bookModel)
        {
            var filter = Builders<BookModel>.Filter.Eq("_id", ObjectId.Parse(bookModel.Id)); // JSON içindeki ID'yi al
            var update = Builders<BookModel>.Update
                .Set("Title", bookModel.Title) 
                .Set("Author", bookModel.Author) 
                .Set("Summary", bookModel.Summary) 
                .Set("Genre", bookModel.Genre) 
                .Set("Year", bookModel.Year); 
            await _books.UpdateOneAsync(filter, update); 
        }

        // Kitap Silme
        public async Task DeleteBookAsync(DeleteBookModel bookModel)
        {
            var filter = Builders<BookModel>.Filter.Eq("_id", ObjectId.Parse(bookModel.Id)); 
            await _books.DeleteOneAsync(filter);
        }
    }
}
