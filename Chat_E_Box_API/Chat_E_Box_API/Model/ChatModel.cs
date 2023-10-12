namespace Chat_E_Box_API.Model
{
    public class ChatModel
    {
        public string? ChatName { get; set; }
        public int? userid1 { get; set; }
        public int? userid2 { get; set; }
        public int? SenderID { get; set; }
        public int? ConversationID { get; set; }
        public string? msgtext { get; set; }
        public Boolean? isGroupChat { get; set; }

    }
}
