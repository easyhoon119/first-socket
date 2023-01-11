const msgList = document.querySelector("ul");
const nicknameForm = document.querySelector("form#nick");
const msgForm = document.querySelector("form#message");
const socket = new WebSocket(`ws://${window.location.host}`)

socket.addEventListener("open", () =>{
    console.log("Server socket is connected!");
})

socket.addEventListener("message", (message) => {
    console.log("we recieved this :", message.data, "from the server");
    if(message.data !== 'please enter the nickname') {
        const msgLi = document.createElement("li");
    msgLi.innerText = message.data;
    msgList.append(msgLi);
    }
    else {
        alert(message.data);
    }
    
})

socket.addEventListener("close", () => {
    console.log("Server socket is closed!");
})

// setTimeout(()=>{
//     socket.send("hello I'm Browser");
// },1000)

const handleSubmit = (event) => {
    event.preventDefault();
    const input = msgForm.querySelector("input");
    socket.send(JSON.stringify({type : "message",payload : input.value}));
    input.value = "";
}

const handleNickSubmit = (event) => {
    event.preventDefault();
    const input = nicknameForm.querySelector("input");
    socket.send(JSON.stringify({type : "nickname", payload : input.value}));
}

msgForm.addEventListener("submit", handleSubmit);
nicknameForm.addEventListener("submit", handleNickSubmit);