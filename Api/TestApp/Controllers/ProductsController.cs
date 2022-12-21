using Microsoft.AspNetCore.Mvc;
using System.Net;
using TestApp.Api.Model;
using TestApp.Api.Services;

namespace TestApp.Api.Controllers
{
    [Route("products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsService _productsService;
        private readonly ILogger<ProductsController> _logger;
        public ProductsController(ProductsService productsService, ILogger<ProductsController> logger)
        {
            _productsService = productsService;
            _logger = logger;
        }

        [HttpGet(Name = "GetAllProducts")]
        [ProducesResponseType(typeof(IEnumerable<ProductDetails>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var response = await _productsService.GetAllProducts();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut(Name = "AddProducts")]
        [ProducesResponseType(typeof(IEnumerable<ProductDetails>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddProducts([FromBody] ProductDetails request)
        {
            try
            {
                await _productsService.AddProducts(request);
                var response = await _productsService.GetAllProducts();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("edit")]
        [ProducesResponseType(typeof(IEnumerable<ProductDetails>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> EditProducts([FromBody] ProductDetails request)
        {
            try
            {
                await _productsService.EditProducts(request);
                var response = await _productsService.GetAllProducts();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete(Name = "DeleteProducts")]
        [ProducesResponseType(typeof(IEnumerable<ProductDetails>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteProducts([FromBody] ProductDetails request)
        {
            try
            {
                await _productsService.DeleteProducts(request);
                var response = await _productsService.GetAllProducts();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
