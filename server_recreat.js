const { Socket } = require("socket.io");
var intervalQueue = new Map();
function creatTable(config, data){
  let container = {
    config:         config,
    gameLoop:       data.gameLoop,
    gameState:      data.gameState,
    board:          data.board,
    piecePosition:  data.piecePosition,
    pieceRotation:  data.pieceRotation,
    piece:          data.piece,
    next:           [data.next[0],data.next[1],data.next[2]],
    haveHold:       data.haveHold,
    holdPiece:      data.holdPiece,
    lines:          data.lines,
    burnOn:         data.burnOn,
    itemNumber:     data.itemNumber,
    getItem:        data.getItem,
    boardOverLoad:  data.boardOverLoad,
    teamHeart:      data.teamHeart,
    teamShield:     data.teamShield
  }
  return container
}
var gammingTable = new Map()
Socket.on('gmaming',(roomId, config, tetrisData, proAct)=>{
  let tmpTable = creatTable(config, tetrisData)
  let actType
  if(proAct == true) actType = config.profession
  else actType = 'none'
  gammingTable.set(config.id, tmpTable)

  io.emit(roomId, tetrisData,config,actType)
})




socket.on('teamFight',function(config){
  if( cheakRooms( config.roomId ) == false){
    rooms3vs3.forEach(el=>{
      if(el[0] == config.roomId)
      roomsQueue.push(el)
    });console.log( roomsQueue )
  }
  while(queueProcess)setTimeout(()=>{queueProcess = false},1000)
  queueProcess = true
  let tmpTable = 'none'
  if(roomsQueue.length >= 2){
    let num = parseInt(Math.random()*8 + 1)
    rooms3vs3.forEach( el=>{
      if(el[0] == roomsQueue[0][0] || el[0] == roomsQueue[1][0]){
        let tmp = el 
        tmp[0] = num
        fightingQueue.push(tmp)
        for(let i=1; i<el.length; ++i){
          if(el[i] !== '--') ids.get(el[i]).socket.emit('teamFight', roomsQueue[0], roomsQueue[1])
          gammingTable.set(el[i], tmpTable)
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
    let fightInterval = 
    intervalQueue.set(?roomid?, setinterval(()=>{
      io.emit(?roomid?,)
    },1500))
  }
  queueProcess = false
})