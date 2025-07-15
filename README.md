# SignalRChat
A simple real-time messaging app built with ASP.NET Core SignalR. Messages sent from one client appear instantly on all connected clients.

<img width="3085" height="1687" alt="image" src="https://github.com/user-attachments/assets/68a78a15-1b35-4790-a9df-730b6ebfec26" />

# Features
- Real-time communication using SignalR

- Unique connection ID per user

- Connect/disconnect notifications with timestamps

- Timestamps on all messages

- Multi-user broadcast messaging

- Basic username handling
# Usage
Open the solution in Visual Studio or Visual Studio Code

Press Ctrl+F5 to run the app without debugging.

Duplicate the browser window that just came up. (Middle mouse click on the browser's reload button) or Copy the URL from the address bar, open another browser tab, and paste the URL in the new address bar.

You'll see a new connection message and a connection ID assigned to it.

Enter a name and click Connect.

A message like "Connection number 3398 became Joe!" is broadcast to all users.

Type a message and click Send Message.

The name and message are displayed on both pages instantly with time stamps.

# External links
This project follows Microsoft’s official tutorial:

[Create a web app project with SignalR (ASP.NET Core)](https://learn.microsoft.com/en-us/aspnet/core/tutorials/signalr?view=aspnetcore-9.0&tabs=visual-studio#create-a-web-app-project)
