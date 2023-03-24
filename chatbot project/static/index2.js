const express = require('express')
const path = require('path')
const app = express()
const server = require('http').Server(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
const PythonAdapter = require('./pyAdapter');


app.set('view engine', 'ejs')
app.set('views','./views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.render('index',{msgHistory:[]})
})

io.on('connection', socket => {
    const chatBot = new PythonAdapter(socket);
    socket.emit('message',chatBot.chats);
    socket.on('disconnect', () => {
        console.log('closed');
    });

    socket.on('message', (message) => {
        console.log(message);
        chatBot.send(message);
        socket.emit('message',chatBot.chats)
    })
})
server.listen(5000, () => console.log('Listening at 5000 port'))


// commands 
