using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using TestApp.Api.Model;
using TestApp.Api.Services;

namespace TestApp.Api.Controllers
{
    [Route("login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly LoginService _loginService;
        private readonly ILogger<LoginController> _logger;
        public LoginController(LoginService loginService, ILogger<LoginController> logger)
        {
            _loginService = loginService;
            _logger = logger;
        }

        [HttpPost(Name = "LoginUser")]
        [ProducesResponseType(typeof(LoginResponseModel), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel request)
        {
            try
            {
                var response = await _loginService.loginUser(request);
                return Ok(response);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }
    }
}
