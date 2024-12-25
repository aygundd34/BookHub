using Book.API.Models;
using Book.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Book.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly BookService _mongoDBService;

        public BooksController(BookService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        // Kitapları listeleme
        [HttpGet("getList")]
        public async Task<ActionResult<List<GetListBookModel>>> GetBooks()
        {
            var books = await _mongoDBService.GetBooksAsync();
            if (books == null || !books.Any())
                return NoContent();
            return Ok(books);
        }

        // Kitap ekleme
        [HttpPost("add")]
        public async Task<IActionResult> CreateBook([FromBody] AddBookModel book)
        {
            await _mongoDBService.CreateBookAsync(book);
            return Ok(new { message = "Book added successfully" });
        }

        // Kitap ID'ye göre alma
        [HttpGet("get/{id}")]
        public async Task<ActionResult<GetBookModel>> GetBookById(string id)
        {
            var book = await _mongoDBService.GetBookByIdAsync(id);
            return book == null ? NotFound() : Ok(book);
        }

        // Kitap güncelleme
        [HttpPut("update")]
        public async Task<IActionResult> UpdateBook([FromBody] UpdateBookModel book)
        {
            await _mongoDBService.UpdateBookAsync(book);
            return Ok(new { message = "Book updated successfully" });
        }

        // Kitap Silme
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBook(string id)
        {
            var deleteModel = new DeleteBookModel { Id = id };
            await _mongoDBService.DeleteBookAsync(deleteModel);
            return Ok(new { message = "Book deleted successfully" });
        }
    }
}