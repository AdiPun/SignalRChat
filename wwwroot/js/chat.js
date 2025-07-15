// Creates and starts a connection.
// Adds to the submit button a handler that sends messages to the hub.
// Adds to the connection object a handler that receives messages from the hub and adds them to the list.

"use strict";

// const Elements
const connectButton = document.getElementById("connectButton");
const sendButton = document.getElementById("sendButton");
const userInput = document.getElementById("userInput");
const messageInput = document.getElementById("messageInput");
const messagesList = document.getElementById("messagesList");

// State
let userName = null;

// Set up SignalR connection with a const variable
const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// Disable the send and connect button until connection is established.
document.getElementById("connectButton").disabled = true;
document.getElementById("sendButton").disabled = true;

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

    const input = userInput.value;

    // if no user, don't connect
    if (!input) {
        return console.error("Please input a name to connect.");
    }

    userName = input;

    // Enable the send button now but disable the connect button
    sendButton.disabled = false;
    connectButton.disabled = true;

    SendGlobalMessage("I've connected!");
    event.preventDefault();
});

// Bind a click event listener to sendButton to send message on click
sendButton.addEventListener("click", function (event) {

    const message = messageInput.value;

    // No message, dont send
    if (!message) {

        return console.error("Please input a message to send.");
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