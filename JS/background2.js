var canvas=document.getElementById("js-background")
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
var drawcvs=canvas.getContext("2d");

function randomInt(min, max) {return Math.floor((max - min ) * Math.random() + min);}
function randomFloat(min, max) {return (max - min) * Math.random() + min;}

class obj{
  constructor(num){
    this.img=new Image();
    this.img=document.getElementById("Tetris"+randomInt(1,8));
    this.x=randomFloat(0,window.innerWidth*num);
    this.y=randomFloat(0,canvas.height-100);
    this.a=randomInt(0,90)
    this.dx=randomFloat(0.8,2) 
    this.dy=randomFloat(-0.1 , 0.3);
    this.dr=randomInt(1,3);
  }
  center(){
    let x=this.x +15
    let y=this.y +15
    return {x , y}
  }
}
function generate(down,up){
  let newpoint=randomInt(down,up);
  objs=[];
  for(let i=0;i<newpoint;++i){
    objs.push(new obj(0.5));
  }
}
 function relife(pos){
  let g=randomInt(-1,3);
  objs.splice(pos,1);
  for(let i=0; i<g; ++i){
    objs.push(new obj(0.1));
  }
}
var objs = [];

function moveobj (obj){
  obj.x += obj.dx;
  obj.y += obj.dy;
  obj.a += obj.dr;
  
  if(obj.y < 0 || obj.y > canvas.height-10){
    obj.y-=obj.dy;
    obj.dy=-obj.dy;
  }
  if(obj.a < 2 || obj.a > 270  ){
    obj.dr= -obj.dr;
  }
  if(obj.x > canvas.width){return true;}
  return false;
}

function drawobj(obj) {
  drawcvs.save()
  transform (obj)
  drawcvs.beginPath();
  drawcvs.drawImage(obj.img, obj.x, obj.y, obj.img.width * 0.5, obj.img.height * 0.5);
  drawcvs.closePath();
  drawcvs.fill();
  drawcvs.restore()
}
function transform (obj) {
  let {x, y} = obj.center();
  drawcvs.translate(x, y);
  drawcvs.rotate(obj.a* Math.PI/180);
  drawcvs.translate(-x, -y)
}


function drawframe(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawcvs.fillStyle= 'rgb(10,10,38)';
  drawcvs.fillRect(0,0,canvas.width,canvas.height)

  for(let i=0; i < objs.length; ++i){
    drawobj(objs[i]);
    if(moveobj(objs[i])){
      relife(i);--i;
    }
  }
  window.requestAnimationFrame(drawframe);
}

generate(30,30);
drawframe();