using Book.API.Models.UserModels;
using Book.API.Services.UserServices;
using Microsoft.AspNetCore.Mvc;

namespace Book.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly JWTService _jwtService;

        public UserController(UserService userService, JWTService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }

        // Kullanıcı kaydetme
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterModel registerModel)
        {
            var userId = await _userService.RegisterUserAsync(registerModel);
            return Ok(new { message = "User registered successfully", userId = userId });
        }


        // Kullanıcı girişi
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            var user = await _userService.LoginUserAsync(loginModel);

            if (user == null)
                return Unauthorized(new { message = "Invalid username or password" });

            var token = _jwtService.GenerateToken(user);
            return Ok(new { message = "Login successful", token });
        }
    }
}