var express = require('express')
var app = express()
var session = require('express-session')
const { appendFileSync } = require('fs')
var server = require('http').createServer(app)
var {Server} = require('socket.io')
var io = new Server (server);
app.use(session({
  secret:'secret',
  username: '',
  saveUninitialized: false,
  resave: true,
  cookie : {maxAge : 1000 * 60 * 10},
}))
app.use(express.urlencoded({ extended: false }))


//http & socket 
app.get('/', function (req, res) {
  var username = req.session.username;
  if(username==undefined){res.redirect('/login');}
  else res.sendFile(__dirname +'/index.html');
})
app.get('/index.html', function (req, res) {res.redirect('/')})

app.get('/login', function (req, res) {
  res.sendFile(__dirname +'/login.html');
})
app.post('/login', function(req, res) {
  var user = req.body
  console.log(user)
  if (user.username !== '' ) {
    req.session.username = user.username;
    res.redirect('/');
  }else res.send("name error")
})
app.get('/talking.html', function (req, res) {res.sendFile(__dirname + '/talking.html');})
app.get('/1vs1.html', function (req, res) {
  
  res.sendFile(__dirname + '/1vs1.html');
})
app.get('/CSS/style.css', function (req, res){res.sendFile(__dirname + '/CSS/style.css');})
app.get('/picture/background.jpg', function (req, res) {res.sendFile(__dirname +'/picture/background.jpg')})
app.get('/pauseitem.png', function (req, res) {res.sendFile(__dirname + '/picture/pauseitem.png');})

  app.get('/JS/classic-tetris.js', function (req, res) {res.sendFile(__dirname + '/JS/classic-tetris.js');})
  app.get('/JS/player-interface.js', function (req, res) {res.sendFile(__dirname + '/JS/player-interface.js');})
  app.get('/JS/timer.js', function (req, res) {res.sendFile(__dirname + '/JS/timer.js');})
  app.get('/JS/render.js', function (req, res) {res.sendFile(__dirname + '/JS/render.js');})
  app.get('/JS/background.js', function (req, res) {res.sendFile(__dirname + '/JS/background.js');})



//socket
var messages=[{name: "Who",message: "test message"}]
var typing = false
var timer = null
var ids=new Map();
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
    socket.on('login',function(id){
      id.pid=Math.floor(Math.random()*1000)
      ids.set(id.pid,{socket:socket,name:id.player,status:id.status})
      socket.emit('login',id)
    })
    socket.on('find',function(id){
        ids.get(id.pid).status= 'find'
        var opponent={player:"unknow", pid:000, status: "nan"}
        ids.forEach(function(value,key){
          if(key!==id.pid && value.status === 'find'){
            opponent.pid=key
            opponent.player=value.name
            opponent.status=value.status
          }
        })
        if(opponent.status==='find'){
          ids.get(opponent.pid).socket.emit('find',id)
          ids.get(opponent.pid).status='game'
          socket.emit('find',opponent)
          ids.get(id.pid).status='game'
        }
    })
    socket.on('fight',function(p2){
        ids.get(p2.pid).socket.emit('fight',p2)
    })
    socket.on('gamming',function(data,p2){
      ids.get(p2.pid).socket.emit('gamming',data)
    })
    
    
    
    socket.on('disconnect',function(){
      people--;
      console.log(people+' user disconnected')
    })
})
server.listen(8800,function(){console.log("Server socket 8800")})
