namespace Chat_E_Box_API.Model
{
    public class Response
    {
        public int StatusCode { get; set; }
        public string? StatusMessage { get; set; }
        public string? token { get; set; }
        public string? email { get; set; }

    }
    public class UserdatabaseResponse
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Pic { get; set; }
        public int UserID { get; set; }
        public string Salt { get; set; }
    }
    public class MessagedatabaseResponse
    {
        public int? MessageID { get; set; }
        public int? ConversationID { get; set; }
        public int? SenderID { get; set; }
        public string? Content { get; set; }
        public DateTime date { get; set; }
    
    }


}
