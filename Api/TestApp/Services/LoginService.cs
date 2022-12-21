using TestApp.Api.Data;
using TestApp.Api.Model;

namespace TestApp.Api.Services
{
    public class LoginService
    {
        private readonly UserDBContext _db;
        public LoginService(UserDBContext db)
        {
            _db = db;
        }

        public async Task<LoginResponseModel> loginUser(LoginRequestModel request)
        {
            var user = _db.Users.Where(x => x.Email.Equals(request.Email) && x.Password.Equals(request.Password)).FirstOrDefault();
            var result = new LoginResponseModel();
            if (user == null && request.Password == "facebooklogin")
            {
                var newuser = new Users()
                {
                    Email = request.Email,
                    Name = request.Name!,
                    Role = "Member",
                    Password = request.Password
                };

                _db.Users.Add(newuser);
                await _db.SaveChangesAsync();
                user = _db.Users.Where(x => x.Email.Equals(request.Email) && x.Password.Equals(request.Password)).First();
            }

            if(user == null) { throw new NotSupportedException("User not found"); }

            if (user != null)
            {
                result.Email = user.Email;
                result.Name = user.Name;
                result.ID = user.Id;
                result.Role = user.Role;
            }
            return result;
        }
    }
}
