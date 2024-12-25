using Book.API.Models.UserModels;
using MongoDB.Driver;
using BCrypt.Net;

namespace Book.API.Services.UserServices
{
    public class UserService
    {
        private readonly IMongoCollection<UserModel> _users;

        public UserService(IMongoDatabase database)
        {
            _users = database.GetCollection<UserModel>("Users");
        }

        // Kullanıcı kaydetme
        public async Task<string> RegisterUserAsync(RegisterModel registerModel)
        {
            var user = new UserModel
            {
                Username = registerModel.Username,
                Email = registerModel.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(registerModel.Password)  // Şifreyi hash'le
            };

            await _users.InsertOneAsync(user);
            return user.Id.ToString(); // Kullanıcının ID'sini döndür
        }

        // Kullanıcı girişi
        public async Task<UserModel> LoginUserAsync(LoginModel loginModel)
        {
            var user = await _users.Find(u => u.Username == loginModel.Username).FirstOrDefaultAsync();

            if (user != null && BCrypt.Net.BCrypt.Verify(loginModel.Password, user.Password))
            {
                return user;
            }

            return null; // Kullanıcı bulunamadı veya şifre yanlış
        }
    }
}