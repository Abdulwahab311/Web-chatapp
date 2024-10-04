const socket = io()
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message-area')
let = name;

do{
    name = prompt('Enter the name')
}while(!name)

textarea.addEventListener('keyup', (e)=>{
    if(e.key === "Enter"){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user: name,
        message: message.trim()
    }
    appendMessage(msg, "outgoing")
    textarea.value = ''
    scrollToBottom()
    socket.emit("message", msg)
}

function appendMessage(msg, type){
let mainDev = document.createElement('div')
let className = type
mainDev.classList.add(className, 'message')


let markup =`
    <h1>${msg.user}</h1>
    <p>${msg.message}</p>
`

mainDev.innerHTML = markup

messageArea.appendChild(mainDev)
}

socket.on("message", (msg)=>{
   appendMessage(msg, "incoming");
   scrollToBottom()
})

function scrollToBottom (){
messageArea.scrollTop = messageArea.scrollHeight 
}