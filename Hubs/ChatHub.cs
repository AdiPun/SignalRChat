using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    // ChatHub class inherits from SignalR's Hub class.
    // The Hub class manages connections, groups, and messaging.
    public class ChatHub: Hub
    {
        // This method can be called by a connected client to send a message to all clients
        public async Task SendMessage(string user,string message, string time)
        {
            // SignalR code is asynchronous to provide maximum scalability
            await Clients.All.SendAsync("ReceiveMessage",user,message,time);
        }
    }
}
