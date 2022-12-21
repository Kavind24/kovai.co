using Microsoft.EntityFrameworkCore;
using TestApp.Api.Data;
using TestApp.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddTransient<LoginService, LoginService>();
builder.Services.AddTransient<ProductsService, ProductsService>();

var connectionString = builder.Configuration.GetConnectionString("TestAppDB");
builder.Services.AddDbContext<ProductsDBContext>(option => option.UseSqlServer(connectionString));
builder.Services.AddDbContext<UserDBContext>(option => option.UseSqlServer(connectionString));
builder.Services.AddAuthentication().AddGoogle(googleOptions =>
{
    googleOptions.ClientId = builder.Configuration["Authentication:Google:ClientId"];
    googleOptions.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(cors => cors.AddPolicy("Default",
    build => build
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("Default");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
