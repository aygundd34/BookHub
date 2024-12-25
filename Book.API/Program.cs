using Microsoft.AspNetCore.Cors;
using Book.API.Services;
using Book.API.Services.UserServices;
using Book.API.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// CORS yapılandırması
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:5173") // Vite'nin çalıştığı port
            .AllowAnyMethod()
            .AllowAnyHeader());
});


// MongoDB ayarlarını appsettings.json'dan al
builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBSettings"));

// MongoDB istemcisi ve veritabanı bağlantısını DI'ye ekleyin
builder.Services.AddSingleton<IMongoClient>(sp =>
    new MongoClient(sp.GetRequiredService<IOptions<MongoDBSettings>>().Value.ConnectionString));

builder.Services.AddSingleton<IMongoDatabase>(sp =>
    sp.GetRequiredService<IMongoClient>().GetDatabase(sp.GetRequiredService<IOptions<MongoDBSettings>>().Value.DatabaseName));

// BookService'in DI'ye eklenmesi
builder.Services.AddSingleton<BookService>();

// JWT ve UserService eklenmesi
builder.Services.AddSingleton<JWTService>(new JWTService(builder.Configuration["Jwt:SecretKey"]));
builder.Services.AddSingleton<UserService>();

// Diğer servisler
builder.Services.AddControllers();

// Swagger'ı etkinleştirme (isteğe bağlı)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// CORS politikasını kullan
app.UseCors("AllowFrontend");

// Swagger'ı yapılandırma (isteğe bağlı)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();

app.Run();