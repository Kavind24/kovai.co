using System.ComponentModel.DataAnnotations;

namespace TestApp.Api.Model
{
    public class LoginRequestModel
    {
        public string Name { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
