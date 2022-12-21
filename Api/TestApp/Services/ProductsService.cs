using Microsoft.EntityFrameworkCore;
using TestApp.Api.Data;
using TestApp.Api.Model;

namespace TestApp.Api.Services
{
    public class ProductsService
    {
        private readonly ProductsDBContext _db;
        private readonly UserDBContext _userdb;
        public ProductsService(ProductsDBContext db, UserDBContext userdb)
        {
            _db = db;
            _userdb = userdb;
        }

        public async Task<IEnumerable<Products>> GetAllProducts()
        {
            return await _db.Products.ToListAsync();
        }

        public async Task AddProducts(ProductDetails request)
        {
            var product = new Products
            {
                Name = request.Name,
                ImageUrl = request.ImageUrl,
                Price = request.Price,
            };

            _db.Products.Add(product);
            await _db.SaveChangesAsync();
        }

        public async Task EditProducts(ProductDetails request)
        {
            var product = _db.Products.Where(x => x.ImageUrl.Equals(request.ImageUrl)).First();

            if (product != null)
            {
                product.Name = request.Name;
                product.ImageUrl = request.ImageUrl;
                product.Price = request.Price;

                await _db.SaveChangesAsync();
            }
        }

        public async Task DeleteProducts(ProductDetails request)
        {
            var product = _db.Products.Where(x => x.ImageUrl.Equals(request.ImageUrl)).First();

            _db.Products.Remove(product);
            await _db.SaveChangesAsync();
        }
    }
}
