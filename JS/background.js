var canvas1=document.getElementById("js-background")
  canvas1.width=window.innerWidth;
  canvas1.height=window.innerHeight;
var drawcvs=canvas1.getContext("2d");

function randomInt(min, max) {return Math.floor((max - min + 1) * Math.random() + min);}
function randomFloat(min, max) {return (max - min) * Math.random() + min;}

function star(){
  this.x=randomFloat(5,canvas1.width-5);
  this.y=randomFloat(5,canvas1.height-5);
  this.light=randomFloat(0.2,0.9);
  var speed= randomFloat(0.3 , 0.5);
  this.dx=speed *Math.sin(randomFloat(0,2*Math.PI)); 
  this.dy=speed *Math.sin(randomFloat(0,2*Math.PI));
  this.dli=randomFloat(0.01,0.04)
}

star.prototype.move =function(){
  this.x += this.dx;
  this.y += this.dy;
  this.light+=this.dli;
  if(this.x < 0 || this.x > canvas1.width){
    this.x-=this.dx;
    this.dx=-this.dx
  }
  if(this.y < 0 || this.y > canvas1.height){
    this.y-=this.dy;
    this.dy=-this.dy
  }
  if(this.light < 0.2 || this.light > 0.9){
    this.light-=this.dli;
    this.dli=-this.dli;
  }
}

star.prototype.draw = function () {
  drawcvs.fillStyle = "rgba(245,223,93," + this.light + ")";
  drawcvs.beginPath();
  drawcvs.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
  drawcvs.closePath();
  drawcvs.fill();
}

var starPoint = [];
function generateStar(num){
  starPoint=[];
  for(let i=0;i<num;++i){
    starPoint.push(new star());
  }
}

function starLink(s1,s2){
  let distance=(s1.x-s2.x)*(s1.x-s2.x) + (s1.y-s2.y)*(s1.y-s2.y)
  if(distance < 10000){
    let light=(1.1-distance/10000)*0.2
    drawcvs.strokeStyle = "rgba(255,255,255," + light + ")";
    drawcvs.beginPath();
    drawcvs.lineWidth = 1.5;
    drawcvs.moveTo(s1.x, s1.y);
    drawcvs.lineTo(s2.x, s2.y);
    drawcvs.closePath();
    drawcvs.stroke();
  }
}
function drawframe(){
  canvas1.width = window.innerWidth;
  canvas1.height = window.innerHeight;
  drawcvs.fillStyle= 'rgb(10,10,38)';
  drawcvs.fillRect(0,0,canvas1.width,canvas1.height)
  for(let i=0; i < starPoint.length; ++i){
    for(let j=i+1; j < starPoint.length; ++j){
      starLink(starPoint[i],starPoint[j])
    }
    starPoint[i].draw();
    starPoint[i].move();
  }
  window.requestAnimationFrame(drawframe);
}


generateStar(80)
drawframe();