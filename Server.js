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
  cookie : {maxAge : 1000 * 600 * 10},
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
app.get('/TESTUSE.html', function (req, res) {
  res.sendFile(__dirname +'/TESTUSE.html');
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
app.get('/3vs3.html', function (req, res) {
  let username = req.session.username;
  if(username==undefined){res.redirect('/login');}
  else res.sendFile(__dirname +'/3vs3.html');
})


//CSS && picture
app.get('/CSS/style.css', function (req, res){res.sendFile(__dirname + '/CSS/style.css');})
app.get('/picture/background.jpg', function (req, res) {res.sendFile(__dirname +'/picture/background.jpg')})
app.get('/pauseitem.png', function (req, res) {res.sendFile(__dirname + '/picture/pauseitem.png');})
app.get('/obj/hana1.png', function (req, res) {res.sendFile(__dirname + '/obj/hana1.png');})
app.get('/obj/hana2.png', function (req, res) {res.sendFile(__dirname + '/obj/hana2.png');})
app.get('/obj/hana3.png', function (req, res) {res.sendFile(__dirname + '/obj/hana3.png');})
app.get('/picture/Item/default.png', function (req, res) {res.sendFile(__dirname + '/picture/Item/default.png');})
app.get('/picture/Item/SpaceChain.png', function (req, res) {res.sendFile(__dirname + '/picture/Item/SpaceChain.png');})
app.get('/picture/Item/defense.png', function (req, res) {res.sendFile(__dirname + '/picture/Item/defense.png');})
app.get('/picture/Item/CompulsoryHold.png', function (req, res) {res.sendFile(__dirname + '/picture/Item/CompulsoryHold.png');})
app.get('/picture/Item/MoveChange.png', function (req, res) {res.sendFile(__dirname + '/picture/Item/MoveChange.png');})
app.get('/picture/Item/shadow.png', function (req, res) {res.sendFile(__dirname + '/picture/Item/shadow.png');})
app.get('/picture/Item/PieceChain.png', function (req, res) {res.sendFile(__dirname + '/picture/Item/PieceChain.png');})
app.get('/picture/Item/PieceChange.png', function (req, res) {res.sendFile(__dirname + '/picture/Item/PieceChange.png');})
app.get('/picture/Item/higher.png', function (req, res) {res.sendFile(__dirname + '/picture/Item/higher.png');})


//JS mode
app.get('/JS/classic-tetris.js', function (req, res) {res.sendFile(__dirname + '/JS/classic-tetris.js');})
app.get('/JS/player-interface.js', function (req, res) {res.sendFile(__dirname + '/JS/player-interface.js');})
app.get('/JS/timer.js', function (req, res) {res.sendFile(__dirname + '/JS/timer.js');})
app.get('/JS/size.js', function (req, res) {res.sendFile(__dirname + '/JS/size.js');})
app.get('/JS/render.js', function (req, res) {res.sendFile(__dirname + '/JS/render.js');})
app.get('/JS/background.js', function (req, res) {res.sendFile(__dirname + '/JS/background.js');})
app.get('/JS/background2.js', function (req, res) {res.sendFile(__dirname + '/JS/background2.js');})
app.get('/node_modules/jquery/dist/jquery.min.js', function (req, res) {res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.min.js');})
app.get('/node_modules/vue/dist/vue.min.js', function (req, res) {res.sendFile(__dirname + '/node_modules/vue/dist/vue.min.js');})

// audio
app.get('/audio/hard_drop.wav', function (req, res) {res.sendFile(__dirname + '/audio/hard_drop.wav');})
app.get('/audio/item_taking.wav', function (req, res) {res.sendFile(__dirname + '/audio/item_taking.wav');})
app.get('/audio/item_takeEnd.wav', function (req, res) {res.sendFile(__dirname + '/audio/item_takeEnd.wav');})
app.get('/audio/gameTheme.mp3', function (req, res) {res.sendFile(__dirname + '/audio/gameTheme.mp3');})
app.get('/audio/line.mp3', function (req, res) {res.sendFile(__dirname + '/audio/line.mp3');})
app.get('/audio/tetris.mp3', function (req, res) {res.sendFile(__dirname + '/audio/tetris.mp3');})

//font
app.get('/huakang_girl_w5.ttf', function (req, res) {res.sendFile(__dirname + '/huakang_girl_w5.ttf');})

app.get('/id',function(req,res){res.send(req.session.username)})

//socket
var messages=[{name: "Who",message: "test message"}]
var typing = false
var timer = null
var ids = new Map();
var people = 0 
var rooms = new Array(3)
for(let i=0; i<rooms.length; ++i)rooms[i] = new Array(2);
function _findroom(id, roomnum){
  if(rooms[roomnum-1][0] == undefined){
    rooms[roomnum-1][0] = id
    return id
  }
  else if(rooms[roomnum-1][1] == undefined){
    rooms[roomnum-1][1] = id
    return rooms[roomnum-1][0]
  }
  else return 0
}
io.on('connection', function (socket) {
    people++;console.log(people+' user connected');
    socket.on("idstore", function (id){
      ids.set(id,{socket:socket})
      let id_queue = new Array();
      ids.forEach(function(value, key) {id_queue.push(key)})
      console.log(id_queue)
    })
    
    
    socket.emit("allMessage",messages);
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
    
    
    socket.on('find',function(id , roomnum){
      let result
      for(let i=0; i<rooms.length; ++i){
        if(rooms[i][0] == id){rooms[i][0] = undefined; result = rooms[i][1]}
        if(rooms[i][1] == id){rooms[i][1] = undefined; result = rooms[i][0]}
      }
      if(result !== undefined)ids.get(result).socket.emit('find', result)
      result = _findroom(id, roomnum)
      socket.emit('find' , result)
      if(result !== id && result !== 0){
        ids.get(result).socket.emit('find', id)
      }
    })
    socket.on('gamming',function(data,p2){
      ids.get(p2).socket.emit('gamming',data)
    })
    socket.on('fight',function(p2){
      ids.get(p2).socket.emit('fight',p2)
    })
    socket.on('disconnect',function(){
      let leaver
      ids.forEach((value, key)=>{
        if(socket.id === value.socket.id)leaver = key
      });ids.delete(leaver)
      let result
      for(let i=0; i<rooms.length; ++i){
        if(rooms[i][0] == leaver){rooms[i][0] = undefined; result = rooms[i][1]}
        if(rooms[i][1] == leaver){rooms[i][1] = undefined; result = rooms[i][0]}
      };if(result !== undefined)ids.get(result).socket.emit('find', result)
      people--;
      console.log(people+' user disconnected')
    })
})
server.listen(22222,'::')
