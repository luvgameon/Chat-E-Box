using Chat_E_Box_API.Model;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Chat_E_Box_API.BAL
{
    public class CommonFunction
    {
        private readonly IConfiguration Configuration;
        public CommonFunction(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public List<string> GenerateHashPassword(string password)
        {
            List<string> res = new List<string>();
            string Salt = BCrypt.Net.BCrypt.GenerateSalt(12);

            res.Add(Salt);
            string HashedPassword = BCrypt.Net.BCrypt.HashPassword(password, Salt);
            res.Add(HashedPassword);
            return res;
        }
        public bool VerifyHashPassword(string passwordfromDB,string password,string Salt)
        {
            
            string hashedPasswordToCompare = BCrypt.Net.BCrypt.HashPassword(password, Salt);

            return passwordfromDB == hashedPasswordToCompare;

        }
        public string GenerateToken (LogUsers users)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securitykey,SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(Configuration["Jwt:Issuer"], Configuration["Jwt:Audience"], null,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);


        }


    }
}
