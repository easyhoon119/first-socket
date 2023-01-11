import express from "express";
import http from "http";
import WebSocket from "ws";
import path from "path"

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public",express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
const handleListen = () => console.log("Listening on http://localhost:3000");

// app.listen(3000, handleListen);
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

const sockets = []

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Browser socket is connected!");
    socket.on("close", () => {
        console.log("Browser socket is closed!");
    })
    socket.on("message", (message) => {
        const parsed = JSON.parse(message.toString('utf-8'));
        if(parsed.type === 'message') {
            sockets.forEach(itemSocket => itemSocket.send(`${socket.nickname}: ${parsed.payload}`))
        } else if(parsed.type === 'nickname') {
            socket["nickname"] = parsed.payload;
        }
    })
});

server.listen(3000, handleListen);