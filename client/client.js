const socket=io('http://localhost:8000');
const form=document.getElementById('send-container');
const messageInput=window.data;
const messageContainer= document.querySelector('.container');


var audio= new Audio('ding-sound-effect_2.mp3');
var leftaudio= new Audio('mixkit-cowbell-sharp-hit-1743.wav');

 
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
    {
        audio.play();
    }
    
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    window.delta=quill.getContents();
    console.log(delta.ops)
    append(`${name} : ${delta.ops[0].insert} `,'right');
    socket.emit('send',delta);
  
})


const name=prompt("enter your name to join");

socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
append(`${name} joined the chat`,'right');
});

socket.on('receive',data=>{

    append(`${data.name}:${data.message.ops[0].insert} `,'left');
});

socket.on('left',name=>{
    append(`${name} Left the Chat... `,'left');
    leftaudio.play();
});