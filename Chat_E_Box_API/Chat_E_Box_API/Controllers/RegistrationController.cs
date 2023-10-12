using Chat_E_Box_API.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;
using Chat_E_Box_API.BAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.VisualBasic;
using System.Collections.Generic;

namespace Chat_E_Box_API.Controllers
{
    [EnableCors("AnotherPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IConfiguration _configuration;

         public RegistrationController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [EnableCors("AllowAll")]
        [HttpPost]
        [Route("registration")]
        public string registration (Users users) 
        {
            CommonFunction commanFunction = new CommonFunction(_configuration);
            List<string> passandsalt = new List<string>();
            passandsalt = commanFunction.GenerateHashPassword(users.Password);
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("UserCon").ToString());
            SqlCommand cmd = new SqlCommand("INSERT INTO Users(Name,Email,Salt,Password,Pic) VALUES('" + users.Name + "','" + users.Email + "','" + passandsalt[0] + "','"+ passandsalt[1] +"','" +users.Pic +"')", con);
            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();
            if(i>0)
            {
                return "Success";
            }
            else
            {
                return "Error";
            }
            
        }

        [EnableCors("AllowAll")]
        [HttpPost]
        [Route("login")]
        public Response login (LogUsers users)
        {
            Response response = new Response();
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("UserCon").ToString());

             SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM Users WHERE Email = '" + users.Email + "'",con);
 
             DataTable dt = new DataTable();
            da.Fill(dt);
            string passwordfromDB = "";
            string salt = "";
           foreach(DataRow dr in dt.Rows)
            {
                passwordfromDB = dr["Password"].ToString();
                salt = dr["Salt"].ToString();
       
            }
           CommonFunction commanFunction = new CommonFunction(_configuration);

            var token = commanFunction.GenerateToken(users);
            
           

     
            if(commanFunction.VerifyHashPassword(passwordfromDB,users.Password, salt))
            {
                response.token = token;
                response.StatusCode = 200;
                response.StatusMessage = "Verify User";
                response.email = users.Email;
                return response;
            }
            else
            {
                response.StatusCode = 401;
                response.StatusMessage = "Invalid Credentails";
                return response;
            }

        }

        [HttpPost]
        [EnableCors("AllowAll")]
        [Route("getbyname")]

        public UserdatabaseResponse[] getbyname(Users users)
        {
            string query = "SELECT * FROM Users WHERE Name LIKE '%' + @Name + '%' AND NOT Email =@Email";
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("UserCon").ToString());
            con.Open();
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.Parameters.AddWithValue("@Name", users.Name);
                cmd.Parameters.AddWithValue("@Email", users.Email);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();

                da.Fill(dt);

                // Convert DataTable to an array
                DataRow[] dataRows = dt.Select();
                UserdatabaseResponse[] dataArray = dataRows.Select(row =>
                {

                    UserdatabaseResponse item = new UserdatabaseResponse();
                    item.UserID= Int32.Parse(row["UserID"].ToString());
                    item.Name = row["Name"].ToString(); 
                    item.Email = row["Email"].ToString();
                    item.Pic = row["Pic"].ToString();
                   
                    return item;
                }).ToArray();

                return dataArray;
            }

     
            
        }

        [HttpPost]
        [EnableCors("AllowAll")]
        [Route("getbyemail")]

        public UserdatabaseResponse[] getbyemail(Users users)
        {
            string query = "SELECT * FROM Users WHERE Email = @Email"; 
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("UserCon").ToString());
            con.Open();
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.Parameters.AddWithValue("@Email", users.Email);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();

                da.Fill(dt);

                // Convert DataTable to an array
                DataRow[] dataRows = dt.Select();
                UserdatabaseResponse[] dataArray = dataRows.Select(row =>
                {

                    UserdatabaseResponse item = new UserdatabaseResponse();
                    item.UserID = Int32.Parse(row["UserID"].ToString());
                    item.Name = row["Name"].ToString();
                    item.Email = row["Email"].ToString();
                    item.Pic = row["Pic"].ToString();

                    return item;
                }).ToArray();

                return dataArray;
            }



        }

       


    }
}
