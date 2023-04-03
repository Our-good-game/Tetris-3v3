
class heart{
  constructor(direction, inputCanvas){
    this.life = 5 
    this.img = new Image();
    this.img = document.getElementById("heart");
    this.dir = direction
    this.canvas = inputCanvas.getContext("2d");
    this.canvasWidth = parseInt(inputCanvas.width);
    this.canvasHeight = parseInt(inputCanvas.height);
  }
  paint (){
    let constant = 0
    if( this.dir == "left") constant = -1
    else constant = 1 
    for(let i=1; i <= this.life; ++i){
      this.canvas.beginPath();
      this.canvas.drawImage(this.img, 
                            this.canvasWidth /2 + (i * this.canvasWidth * 0.03 * constant) - this.canvasWidth * 0.03, this.canvasHeight * 0.1, 
                            this.canvasWidth * 0.03, this.canvasWidth * 0.03);
      this.canvas.closePath();
      this.canvas.fill();
      this.canvas.restore()
    }
  }
}
class shield extends heart{
  constructor(direction, inputCanvas){
    super(direction, inputCanvas)
    this.life = 0 
    this.img = document.getElementById("shield");
    this.dir = direction
  }
  paint (){
    let constant = 0
    if( this.dir == "left") constant = -1
    else constant = 1 
    for(let i=1; i <= this.life; ++i){
      this.canvas.beginPath();
      this.canvas.drawImage(this.img, 
                            this.canvasWidth /2 + (i * this.canvasWidth * 0.03 * constant) - this.canvasWidth * 0.03, this.canvasHeight * 0.45, 
                            this.canvasWidth * 0.03, this.canvasWidth * 0.03);
      this.canvas.closePath();
      this.canvas.fill();
      this.canvas.restore()
    }
  }
}