class heart{
  constructor(num, direction, inputCanvas){
    this.life = true 
    this.img = new Image();
    this.img = document.getElementById("heart");
    this.number =  num
    this.dir = direction
    this.canvas = inputCanvas.getContext("2d")
    if( this.dir == "left"){
      this.x = inputCanvas.width /2 - (this.number*50)
    }else if (this.dir == "right"){
      this.x = inputCanvas.width /2 + (this.number*50)
    }
    this.x -= 70
    this. y = 10
  }
  paint (){
    if (this.life){
      this.canvas.beginPath();
      this.canvas.drawImage(this.img, this.x, this.y, 50, 50)
      this.canvas.closePath();
      this.canvas.fill();
      this.canvas.restore()
    }
  }
}