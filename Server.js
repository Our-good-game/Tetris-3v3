var express = require('express')
var app = express()
var session = require('express-session')
var server = require('http').createServer(app)
var {Server, Socket} = require('socket.io')
var io = new Server (server);
app.use(session({
  secret:'secret',
  username: '',
  saveUninitialized: false,
  resave: true,
  cookie : {maxAge : 1000 * 60 * 10},
}))
app.use(express.urlencoded({ extended: false }))


//html
app.get('/', function (req, res) {
  let username = req.session.username;
  if(username==undefined){res.redirect('/login');}
  else res.sendFile(__dirname +'/index.html');
})
app.get('/index.html', function (req, res) {res.redirect('/')})

app.get('/login', function (req, res) {
  res.sendFile(__dirname +'/login.html');
})
app.post('/login', function(req, res) {
  var user = req.body
  if (user.username !== '' ) {
    req.session.username = user.username;
    res.redirect('/');
  }else res.send("name error")
})
app.get('/talking.html', function (req, res) {
  let username = req.session.username;
  if(username==undefined){res.redirect('/login');}
  else res.sendFile(__dirname +'/talking.html');
})
app.get('/1vs1.html', function (req, res) {
  let username = req.session.username;
  if(username==undefined){res.redirect('/login');}
  else res.sendFile(__dirname +'/1vs1.html');
})


//CSS && picture
app.get('/CSS/style.css', function (req, res){res.sendFile(__dirname + '/CSS/style.css');})
app.get('/picture/background.jpg', function (req, res) {res.sendFile(__dirname +'/picture/background.jpg')})
app.get('/pauseitem.png', function (req, res) {res.sendFile(__dirname + '/picture/pauseitem.png');})
app.get('/obj/hana1.png', function (req, res) {res.sendFile(__dirname + '/obj/hana1.png');})
app.get('/obj/hana2.png', function (req, res) {res.sendFile(__dirname + '/obj/hana2.png');})
app.get('/obj/hana3.png', function (req, res) {res.sendFile(__dirname + '/obj/hana3.png');})


//JS mode
app.get('/JS/classic-tetris.js', function (req, res) {res.sendFile(__dirname + '/JS/classic-tetris.js');})
app.get('/JS/player-interface.js', function (req, res) {res.sendFile(__dirname + '/JS/player-interface.js');})
app.get('/JS/timer.js', function (req, res) {res.sendFile(__dirname + '/JS/timer.js');})
app.get('/JS/render.js', function (req, res) {res.sendFile(__dirname + '/JS/render.js');})
app.get('/JS/background.js', function (req, res) {res.sendFile(__dirname + '/JS/background.js');})
app.get('/JS/background2.js', function (req, res) {res.sendFile(__dirname + '/JS/background2.js');})
app.get('/node_modules/jquery/dist/jquery.min.js', function (req, res) {res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.min.js');})

app.get('/audio/hard_drop.wav', function (req, res) {res.sendFile(__dirname + '/audio/hard_drop.wav');})
app.get('/audio/item_taking.wav', function (req, res) {res.sendFile(__dirname + '/audio/item_taking.wav');})
app.get('/audio/item_takeEnd.wav', function (req, res) {res.sendFile(__dirname + '/audio/item_takeEnd.wav');})
app.get('/audio/gamesound.mp3', function (req, res) {res.sendFile(__dirname + '/audio/gamesound.mp3');})


app.get('/id',function(req,res){
  res.send(req.session.username)
})

//socket
var messages=[{name: "Who",message: "test message"}]
var typing = false
var timer = null
var ids = new Map();
var find_queue = []
var people = 0 
io.on('connection', function (socket) {
    people++;console.log(people+' user connected');socket.emit("allMessage",messages);
    
    
    socket.on("sendMessage", function (message){
        messages.push(message)
        io.emit("newMessage",message)
    })
    socket.on('sendTyping',function(){
        console.log('typing')
        typing = true
        io.emit("someoneIsTyping",typing)
        clearTimeout(timer)
        timer = setTimeout(() =>{
          typing =false
          io.emit("someoneIsTyping",typing)
        },3000)
    })
    socket.on('find',function(id){
      ids.set(id,{socket:socket})
      find_queue.push(id);
      if(find_queue.length >= 2){
        socket.emit('find',find_queue[0])
        ids.get(find_queue[0]).socket.emit('find',id)
        find_queue = []
      }
    })
    socket.on('gamming',function(data,p2){
      ids.get(p2).socket.emit('gamming',data)
    })
    socket.on('fight',function(p2){
      ids.get(p2).socket.emit('fight',p2)
    })
    socket.on('disconnect',function(){
      people--;
      console.log(people+' user disconnected')
    })
})
server.listen(8800,function(){console.log("Server socket 8800")})
