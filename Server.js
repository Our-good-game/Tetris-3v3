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
app.get('/CSS/:id', function (req, res){res.sendFile(__dirname + req.originalUrl);})
app.get('/picture/:id', function (req, res) {res.sendFile(__dirname + req.originalUrl)})
app.get('/picture/Item/:id', function (req, res) {res.sendFile(__dirname + req.originalUrl);})

//JS mode
app.get('/JS/:id', function (req, res) {res.sendFile(__dirname + req.originalUrl);})
app.get('/node_modules/jquery/dist/jquery.min.js', function (req, res) {res.sendFile(__dirname + '/node_modules/jquery/dist/jquery.min.js');})
app.get('/node_modules/vue/dist/vue.min.js', function (req, res) {res.sendFile(__dirname + '/node_modules/vue/dist/vue.min.js');})

// audio
app.get('/audio/:id', function (req, res) {res.sendFile(__dirname + req.originalUrl);})
app.get('/id',function(req,res){res.send(req.session.username)})

//socket
var messages=[{name: "Who",message: "test message"}]
var typing = false
var timer = null
var ids = new Map();
var people = 0 
var rooms = new Array(3)
var rooms3vs3 = new Array(2)
for(let i=0; i<rooms.length; ++i)rooms[i] = new Array(2);
for(let i=0; i<rooms3vs3.length; ++i)rooms3vs3[i] = new Array(3);
for(let i=0; i<2; ++i)
  for(let j=0; j<3; ++j)
    rooms3vs3[i][j] = "--"
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
    
    // 1vs1
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

/* ---------------------------------------------------------------------------------------------------------------*/

    //3vs3
    socket.on('enterRoom', function(config, act){
      let same = false 
      if(act === "change"){
        let posi,posj,full = true
        for(let j=0; j<3; ++j)
          for(let i=0; i<2; ++i)
            if (rooms3vs3[i][j] == config.id){
              posi = i
              posj = j
              i=10;j=10
            }
        for(let j = 0; j<3; ++j){
          if(rooms3vs3[(posi+1)%2][j] == "--") {
            full = false;
            rooms3vs3[(posi+1)%2][j] = config.id
            rooms3vs3[posi][posj] = "--"
            break;
          }
        }
      }
      else {
        for(let j=0; j<3; ++j)
          for(let i=0; i<2; ++i)
            if(rooms3vs3[i][j] == config.id)same=true;
        if(same != true)
          for(let j=0; j<3; ++j)
            for(let i=0; i<2; ++i)
              if (rooms3vs3[i][j] == "--"){
                rooms3vs3[i][j] = config.id
                i=10;j=10
              }
      }
      
      for(let j=0; j<3; ++j)
        for(let i=0; i<2; ++i)
          if (rooms3vs3[i][j] !== "--")
            ids.get(rooms3vs3[i][j]).socket.emit('roomInfo', rooms3vs3) 
    })
    socket.on('teamFight',function(config){
      for(let j=0; j<3; ++j)
        for(let i=0; i<2; ++i)
          if (rooms3vs3[i][j] !== "--")
            ids.get(rooms3vs3[i][j]).socket.emit('teamFight', rooms3vs3)
    })
    socket.on('teamGamming',function(data, config, action){// 處理道具
      let actType = 'none'
      if( action ) actType = config.profession
      for(let i=0; i<2; ++i)
        for(let j=0; j<3; ++j)
          if (rooms3vs3[i][j] !== "--" )
            ids.get(rooms3vs3[i][j]).socket.emit('teamGamming', data, config, actType)
    })

    socket.on('item', function(item, config){
      // right -> i = 0 (丟給left的敵人)
      // left  -> i = 1 (丟給right的敵人) 
      let i = 0;
      if (config.team == "left") i = 1; 
      for(let j=0; j<3; ++j)
        if (rooms3vs3[i][j] !== "--")
          ids.get(rooms3vs3[i][j]).socket.emit('item', item);
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
      for(let j=0; j<3; ++j)
        for(let i=0; i<2; ++i)
          if(rooms3vs3[i][j] == leaver)rooms3vs3[i][j] = "--"
      for(let j=0; j<3; ++j)
        for(let i=0; i<2; ++i)
          if (rooms3vs3[i][j] !== "--")
            ids.get(rooms3vs3[i][j]).socket.emit('roomInfo', rooms3vs3)
      people--;
      console.log(people+' user disconnected')
    })
})
server.listen(22222,'::')
