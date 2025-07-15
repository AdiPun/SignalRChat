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

// Username state
let userName = null;

// Set up SignalR connection with a const variable
const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// Disable the send and connect button until connection is established.
connectButton.disabled = true;
sendButton.disabled = true;

// On message received
connection.on("ReceiveMessage", function (user, message, time) {
    const li = document.createElement("li");

    li.textContent = `${time} - ${user}: ${message}`;

    messagesList.appendChild(li);
});

// On connection start
connection.start().then(function () {
    connectButton.disabled = false;
}).catch(function (err) {
    return console.error("Connection error:", err)
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

    // Enable the send button now but disable the connect button and Username input
    userNameInput.disabled = true;
    connectButton.disabled = true;
    sendButton.disabled = false;

    SendGlobalMessage("I've connected!");
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

    // Gets the current time
    const time = new Date().toLocaleTimeString();

    connection.invoke("SendMessage", userName, message, time).catch(function (err) {
        return console.error(err.toString());
    });
}