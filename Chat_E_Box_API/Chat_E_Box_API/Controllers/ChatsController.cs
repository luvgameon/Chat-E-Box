using Chat_E_Box_API.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace Chat_E_Box_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatsController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public ChatsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [EnableCors("AllowAll")]
        [Route("chats")]

        public string createchat(ChatModel chatModel)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("UserCon").ToString());
            SqlCommand cmd = new SqlCommand("INSERT INTO Conversations(Name,isGroupChat) VALUES('" + chatModel.ChatName + "','" + chatModel.isGroupChat + "')", con);
            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();

            SqlDataAdapter da = new SqlDataAdapter("SELECT ConversationID FROM Conversations WHERE Name = '" + chatModel.ChatName + "' AND isGroupChat = '" + chatModel.isGroupChat + "'", con);

            DataTable dt = new DataTable();
            da.Fill(dt);
            string ConversationID = "";

            foreach (DataRow dr in dt.Rows)
            {
                ConversationID = dr["ConversationID"].ToString();

            }

            cmd = new SqlCommand("INSERT INTO UserConversations (UserID,ConversationID) VALUES('" + chatModel.userid1 + "','" + ConversationID + "')", con);
            con.Open();
             i = cmd.ExecuteNonQuery();
            con.Close();
            cmd = new SqlCommand("INSERT INTO UserConversations (UserID,ConversationID) VALUES('" + chatModel.userid2 + "','" + ConversationID + "')", con);
            con.Open();
            i = cmd.ExecuteNonQuery();
            con.Close();

            return "success";
        }


        [HttpPost]
        [EnableCors("AllowAll")]
        [Route("sendmsg")]

        public string sendmsg(ChatModel chatModel)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("UserCon").ToString());
            SqlCommand cmd = new SqlCommand("INSERT INTO Messages(ConversationID,SenderID,Content) VALUES('" + chatModel.ConversationID + "','" + chatModel.SenderID + "','" + chatModel.msgtext + "')", con);
            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i > 0)
            {
            return "success";
            }
            return "Error";
        }

        [HttpPost]
        [EnableCors("AllowAll")]
        [Route("getmsg")]

        public MessagedatabaseResponse[] getmsg(ChatModel chatModel)
        {
            string query = "SELECT * FROM Messages WHERE ConversationID = @ConversationID";
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("UserCon").ToString());
            con.Open();
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.Parameters.AddWithValue("@ConversationID", chatModel.ConversationID);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();

                da.Fill(dt);

                // Convert DataTable to an array
                DataRow[] dataRows = dt.Select();
                MessagedatabaseResponse[] dataArray = dataRows.Select(row =>
                {

                    MessagedatabaseResponse item = new MessagedatabaseResponse();
                    item.MessageID = Int32.Parse(row["MessageID"].ToString());
                    item.ConversationID = Int32.Parse(row["ConversationID"].ToString());
                    item.Content = row["Content"].ToString();
                    item.SenderID = Int32.Parse(row["SenderID"].ToString());
                    item.date = DateTime.Parse(row["date"].ToString());

                    return item;
                }).ToArray();

                return dataArray;
            }
        }
    }
}
