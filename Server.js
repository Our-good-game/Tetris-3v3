const { create } = require('domain')
const e = require('express')
var express = require('express')
var app = express()
var session = require('express-session')
const { uniqueSort } = require('jquery')
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
app.get('/viewing.html', function (req, res) {
  let username = req.session.username;
  if(username==undefined){res.redirect('/login');}
  else res.sendFile(__dirname +'/viewing.html');
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

//socket
var messages=[{name: "Who",message: "test message"}]
var typing = false
var timer = null
var ids = new Map();
let viewer = new Array();
var people = 0 
var rooms3vs3 = new Array()
var roomsQueue = new Array()
var fightingQueue = new Array()
var queueProcess = false

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
app.post('/login', function(req, res) {
  var user = req.body
  if (user.username !== '' ) {
    if(ids.get(user.username) !== undefined)res.send("have the same name! ")
    req.session.username = user.username;
    res.redirect('/');
  }else res.send("name error")
})
app.get('/id',function(req,res){
  res.send(req.session.username)
})
io.on('connection', function (socket) {
    people++
    console.log('user connected' + people)
    socket.on("idStore", function (id){
      ids.set(id,{socket:socket})
      let id_queue = new Array();
      ids.forEach(function(value, key) {id_queue.push(key)})
      console.log(id_queue , ' --- in ')
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
function createRooms(inputId){
  let roomtmp = new Array(4)
  for(let i=0; i<roomtmp.length; ++i)roomtmp[i] = '--'
  rooms3vs3.push(roomtmp)
  let roomId, idCheak = true 
  while(idCheak){
    idCheak = false
    roomId = parseInt(Math.random()*8 + 1)*10 + parseInt(Math.random()*8 + 1)
    rooms3vs3.forEach(el => { if(el[0] == roomId) idCheak = true})
  }
  rooms3vs3[rooms3vs3.length - 1 ][0] = roomId
  rooms3vs3[rooms3vs3.length - 1 ][1] = inputId
  socket.emit('roomInfo', rooms3vs3[rooms3vs3.length - 1 ])
}
function cheakPeople(inputId){
  for(let i=0; i<rooms3vs3.length; ++i){
    for(let j=1; j<rooms3vs3[i].length; ++j)
      if(rooms3vs3[i][j] === inputId)
        rooms3vs3[i][j] = '--'
    let roomUse = false
    for(let j=1; j<rooms3vs3[i].length; ++j)
      if(rooms3vs3[i][j] !== '--')roomUse = true;
    if(!roomUse){
      rooms3vs3[i] = rooms3vs3[0]
      rooms3vs3.shift()
    }
  }
}
function cheakRooms(roomsId){
  roomsQueue.forEach(el => {
    if( roomsId == el ){
      return true
    }return false
  })
}
    socket.on('enterRoom', function(config, act){
      if(act == 0){ // 建立新房間
        try{
          cheakPeople(config.id)
          createRooms(config.id)
        }catch{createRooms(config.id)}
      }
      else {
        let full = false, find = false
        rooms3vs3.forEach(el => {
          if(el[0] == act ){// 找到房間了
            full = find = true
            for(let i=0; i<el.length; ++i){
              if(el[i] === '--'){// 找到房間裡的位置了
                cheakPeople(config.id)
                el[i] = config.id
                full = false
                for(let i=1; i<el.length; ++i)
                  if(el[i] !== '--')ids.get(el[i]).socket.emit('roomInfo', el)
                break
              }
            }
          }
        })
        let roomtmp = new Array(4)
        if(full){ roomtmp[0] = -1
          socket.emit('roomInfo', roomtmp) // 房間人滿了
        }
        if(!find){ roomtmp[0] = -2
          socket.emit('roomInfo', roomtmp) // 沒找到房間
        }
      }console.log("ROOMS" ,rooms3vs3)
    })
    socket.on('teamFight',function(config){
      cheakRooms( config.roomId )
      rooms3vs3.forEach(el=>{if(el[0] == config.roomId){
        roomsQueue.push(el)
      }})
      while(queueProcess)setTimeout(()=>{queueProcess = false},1000)
      queueProcess = true
      if(roomsQueue.length >= 2){
        let num = parseInt(Math.random()*8 + 1)
        rooms3vs3.forEach( el=>{
          if(el[0] == roomsQueue[0][0] || el[0] == roomsQueue[1][0]){
            let tmp = el 
            tmp[0] = num
            fightingQueue.push(tmp)
            for(let i=1; i<el.length; ++i){
              if(el[i] !== '--')
                ids.get(el[i]).socket.emit('teamFight', roomsQueue[0], roomsQueue[1])
            }
          }
        })
        rooms3vs3.forEach( el=>{
          for(let i=1; i<el.length; ++i){
            if(el[i] !== '--')
              ids.get(el[i]).socket.emit('teamFight', fightingQueue[0], fightingQueue[1])
          }
        })
        roomsQueue.shift();roomsQueue.shift()
        console.log("Queuing" , fightingQueue)
      }
      queueProcess = false
    })
    socket.on('teamGamming',function(data, config, action){console.log(config)
      let actType = 'none'
      if( action ) actType = config.profession
      fightingQueue.forEach(el => {
        if(el[0] == config.roomId)
          for(let j=1; j<4; ++j)
            if (el[j] !== "--" ){
              try{
                ids.get(el[j]).socket.emit('teamGamming', data, config, actType)
              }catch{
                console.log('sending error')
              }
            }
      });
        
      // for(let i=0; i<viewer.length; ++i)
      //   ids.get(viewer[i]).socket.emit('teamGamming', data, config, actType)
    })
    socket.on("viewer", function(id){
      if(ids.get(id) !== 'undefined')
        ids.get(id).socket.emit('teamFight', rooms3vs3)
      for(let i=0; i<viewer.length; ++i)
        if(viewer[i]==id)return  
      viewer.push(id)
    })

    socket.on('disconnect',function(){
      let leaver,id_queue = new Array()
      ids.forEach((value, key)=>{
        id_queue.push(key)
        if(socket.id === value.socket.id){
          leaver = key
          ids.delete(leaver)
          cheakPeople(leaver)
        }
      })
      console.log(id_queue , ' --- out ')
      
      for(let i=0; i<viewer.length; ++i){
        if(viewer[i]==leaver){
          viewer[i] = viewer[0]
          viewer.shift()
          break
        }
      }
      //1vs1 處理房間
      let result
      for(let i=0; i<rooms.length; ++i){
        if(rooms[i][0] == leaver){rooms[i][0] = undefined; result = rooms[i][1]}
        if(rooms[i][1] == leaver){rooms[i][1] = undefined; result = rooms[i][0]}
      }
      if(result !== undefined)ids.get(result).socket.emit('find', result)
      
      people--;
      console.log(leaver+' disconnected '+people)
    })
})
server.listen(22222,'::')
