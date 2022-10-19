require("socket.io")
var socket = io()
var config = {
   id: undefined,
   team: undefined,       // left or right
   teamNumber: 0,         // 1 2 3
   profession: undefined, // ['Attacker', 'Defender', 'Magician']
   roomId: -1
 }
if(whenDataChange){
   socket.emit(gamming,roomId,data)
   pro.act = false
}
socket.on(config.roomId,()=>{

})