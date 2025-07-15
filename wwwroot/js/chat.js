//Creates and starts a connection.
//Adds to the submit button a handler that sends messages to the hub.
//Adds to the connection object a handler that receives messages from the hub and adds them to the list.

"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send and connect button until connection is established.
document.getElementById("connectButton").disabled = true;
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message, time) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you
    // should be aware of possible script injection concerns.

    li.textContent = `${time} - ${user}: ${message}`;
});

connection.start().then(function () {
    document.getElementById("connectButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

// Bind a click event listener to sendButton to send message on click
document.getElementById("sendButton").addEventListener("click", function (event) {
    var message = document.getElementById("messageInput").value;

    // No message, dont send
    if (!message) {
        return;
    }

    var user = document.getElementById("userInput").value;
    var time = new Date();

    connection.invoke("SendMessage", user, message, time.toLocaleTimeString()).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

// Bind a click event listener to connectButton to send message on click
document.getElementById("connectButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;

    // if no user, don't connect
    if (!user) {
        return console.error("Please input a name to connect.");
    }

    // Enable the send button now but disable the connect button
    document.getElementById("sendButton").disabled = false;
    document.getElementById("connectButton").disabled = true;

    var time = new Date();
    var message = "I've connected!"

    connection.invoke("SendMessage", user, message, time.toLocaleTimeString()).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});