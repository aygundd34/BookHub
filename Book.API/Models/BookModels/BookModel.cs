using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Book.API.Models
{
    public class BookModel
    {
        public ObjectId Id { get; set; }
        [BsonElement("Title")]
        public string Title { get; set; }
    
        [BsonElement("Author")]
        public string Author { get; set; }
        public string Summary { get; set; }
        public string Genre { get; set; }
        public int Year { get; set; }
    }


}