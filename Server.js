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
// live player list
var ids = new Map();
let viewer = new Array();
var people = 0
var rooms3vs3 = new Array()
var matchingQueue = new Array()
var fightingQueue = new Array()
var queueProcess = false
var rooms = new Array(3)
for(let i=0; i<rooms.length; ++i)rooms[i] = new Array(2);

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
  console.log('Live player count: ' + people)
  
  socket.on("idStore", function (id){
    ids.set(id,{socket:socket})
    let id_queue = new Array();
    ids.forEach(function(value, key) {id_queue.push(key)})
    console.log("'%s' connected, player list %O", id, id_queue)
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
// ------------------------------------------------------------------------------------------------------------
  // 1vs1
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
// ---------------------------------------------------------------------------------------------------------------
  //3vs3
  function createRooms(playerId){
    // roomtmp = {roomId, playerId, teamate1, teamate2}
    let roomtmp = new Array(4);
    for(let i=0; i<roomtmp.length; ++i)roomtmp[i] = '--';
    rooms3vs3.push(roomtmp);
    let roomId, idCheck = true ;
    // 防止重複的roomId
    while(idCheck){
      idCheck = false;
      roomId = parseInt(Math.random()*8 + 1)*10 + parseInt(Math.random()*8 + 1)
      rooms3vs3.forEach(el => { 
        if(el[0] == roomId) 
          idCheck = true;
      });
    }
    rooms3vs3[rooms3vs3.length - 1][0] = roomId
    rooms3vs3[rooms3vs3.length - 1][1] = playerId
    socket.emit('roomInfo', rooms3vs3[rooms3vs3.length - 1])
  }

  // 更新房間資訊
  function refreshRooms(){
    rooms3vs3.forEach(el => {
      // console.log (el[0])
      for(let i=1; i<el.length; ++i)
        if(el[i] !== '--')ids.get(el[i]).socket.emit('roomInfo', el)
    })
  }

  // 將玩家踢出遊戲房間 
  function kickPeople(playerId){
    for(let i=0; i<rooms3vs3.length; ++i){
      for(let j=1; j<rooms3vs3[i].length; ++j)
        if(rooms3vs3[i][j] === playerId)
          rooms3vs3[i][j] = '--'
    }
  }

  // 清除room3vs3的空房間
  function clearRooms(){
    let roomUse = false
    for(let i=0; i<rooms3vs3.length; ++i){
      roomUse = false
      for(let j=1; j<rooms3vs3[i].length; ++j)
        if(rooms3vs3[i][j] !== '--')roomUse = true;
      if(!roomUse){
        rooms3vs3[i] = rooms3vs3[0]
        rooms3vs3.shift()
      }
    }
  }
  
  // 清除MatchingQueue的空房間
  function clearMatchingQueue(){
    let roomUse = false
    for(let i=0; i<matchingQueue.length; ++i){
      roomUse = false
      for(let j=1; j<matchingQueue[i].length; ++j)
        if(matchingQueue[i][j] !== '--')roomUse = true;
      if(!roomUse){
        matchingQueue[i] = matchingQueue[0]
        matchingQueue.shift()
      }
    }
  }

  // 清除fightingQueue的空房間
  function clearFightingQueue(){
    let roomUse = false
    for(let i=0; i<fightingQueue.length; ++i){
      roomUse = false;
      for(let j=1; j<fightingQueue[i].length; ++j)
        if(fightingQueue[i][j] !== '--')roomUse = true;
      if(!roomUse){
        fightingQueue[i] = fightingQueue[0]
        fightingQueue.shift()
      }
    }
  }

  function checkRooms(roomsId){
    let haveRooms = false
    matchingQueue.forEach(el => {
      if( roomsId == el[0] ) haveRooms = true
    })
    return haveRooms
  }

  socket.on('enterRoom', function(config, act){
    if(act == config.roomId)return;
    if(act == 0){ // 建立新房間
      try{
        kickPeople(config.id)
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
              kickPeople(config.id)
              el[i] = config.id
              full = false
              break
            }
          }
        }
      })
      let roomtmp = new Array(4)
      if(full){ 
        // 房間人滿了
        roomtmp[0] = -1;
        socket.emit('roomInfo', roomtmp) 
      }
      if(!find){ 
        // 沒找到房間
        roomtmp[0] = -2;
        socket.emit('roomInfo', roomtmp) 
      }
    }
    clearRooms()
    clearMatchingQueue();
    refreshRooms()
    console.log("3v3 Rooms" ,rooms3vs3)
  })

  socket.on('teamFight',function(config){
    console.log("have same rooms? ", checkRooms( config.roomId ))
    if(checkRooms( config.roomId ) == false){
      rooms3vs3.forEach(el=>{
        if(el[0] == config.roomId){
          matchingQueue.push(el);
        }
      });
      console.log("Matching Queue", matchingQueue);
    }
    while(queueProcess)setTimeout(()=>{queueProcess = false},1000)
    queueProcess = true
    if(matchingQueue.length >= 2){
      let num = parseInt(Math.random()*8 + 1)
      // 
      rooms3vs3.forEach( el=>{
        if(el[0] == matchingQueue[0][0] || el[0] == matchingQueue[1][0]){
          let tmp = el 
          tmp[0] = num
          fightingQueue.push(tmp)
          for(let i=1; i<el.length; ++i){
            if(el[i] !== '--')
              ids.get(el[i]).socket.emit('teamFight', matchingQueue[0], matchingQueue[1])
          }
        }
      })
      matchingQueue.shift();
      matchingQueue.shift();
      console.log("Fighting Queue", fightingQueue)
    }
    queueProcess = false
  })
  
  socket.on('teamGamming',function(data, config, action){
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
  // ---------------------------------------------------------------------------------------------------------------
  socket.on("viewer", function(id){
    if(ids.get(id) !== 'undefined')
      ids.get(id).socket.emit('teamFight', rooms3vs3)
    for(let i=0; i<viewer.length; ++i)
      if(viewer[i]==id)return  
    viewer.push(id)
  })
  socket.on('disconnect',function(){
    let leaver, id_queue = new Array()
    ids.forEach((value, key)=>{
      id_queue.push(key)
      if(socket.id === value.socket.id){
        leaver = key
        ids.delete(leaver)
        kickPeople(leaver)
        clearRooms()
        clearFightingQueue()
        clearMatchingQueue();
        refreshRooms()
      }
    })
    // console.log("Matching Queue", matchingQueue);
    // console.log("Fighting Queue", fightingQueue)
    
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
    console.log("'%s' disconnected, player list %O", leaver, id_queue)
  })
})
server.listen(22222,'::')
  