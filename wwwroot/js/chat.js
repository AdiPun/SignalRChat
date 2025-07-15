// Creates and starts a connection.
// Adds to the submit button a handler that sends messages to the hub.
// Adds to the connection object a handler that receives messages from the hub and adds them to the list.

"use strict";

// const Elements
const connectButton = document.getElementById("connectButton");
const sendButton = document.getElementById("sendButton");
const userNameInput = document.getElementById("userInput");
const messageInput = document.getElementById("messageInput");
const messagesList = document.getElementById("messagesList");

// State
let connectionNumber = null;
let userName = null;

// Set up SignalR connection with a const variable
const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// Disable the connect button until connection is established and disable the send and messageInput button.
connectButton.disabled = true;
sendButton.disabled = true;
messageInput.disabled = true;

// On message received
connection.on("ReceiveMessage", function (user, message, time) {
    const li = document.createElement("li");

    li.textContent = `${time} - ${user}: ${message}`;

    messagesList.appendChild(li);
});

// On connection start
connection.start().then(function () {

    // Create a connection number based on the timestamp
    connectionNumber = Math.floor(Date.now() % 10000);

    // Send global message when new connection joins
    SendGlobalMessage(`New connection! Number: ${connectionNumber}`);

    // Enable the connect button
    connectButton.disabled = false;

}).catch(function (err) {
    return console.error("Connection error:", err)
});

// Stops the SignalR connection when the window is closed or refreshed and sends a final disconnected message
window.addEventListener("beforeunload", function (event) {
    SendGlobalMessage(`User disconnected`).finally(() => {
        connection.stop();
    });
});


// Bind a click event listener to connectButton to send message on click
connectButton.addEventListener("click", function (event) {

    const input = userNameInput.value;

    // if no user, don't connect
    if (!input) {
        alert("Please enter a username.");
        return;
    }

    userName = input;

    // Enable the send button and messageInput now but disable the connect button and Username input
    userNameInput.disabled = true;
    connectButton.disabled = true;
    sendButton.disabled = false;
    messageInput.disabled = false;
    messageInput.focus();

    // Announce the name change
    SendGlobalMessage(`Connection number ${connectionNumber} became ${userName}!`);

    event.preventDefault();
});

// Bind a click event listener to sendButton to send message on click
sendButton.addEventListener("click", function (event) {

    const message = messageInput.value;

    // No message, dont send
    if (!message) {

        return;
    }

    SendGlobalMessage(message);
    messageInput.value = ""; // Clears the messageInput element
    messageInput.focus(); // Focuses on messageInput element as if you clicked on it
    event.preventDefault();
});

function SendGlobalMessage(message) {
    const time = new Date().toLocaleTimeString();
    return connection.invoke("SendMessage", userName, message, time)
        .catch(function (err) {
            console.error(err.toString());
        });
}
