class defaultsize {
  constructor(canvas){
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.context.lineJoin = 'round';
    this.boardWidth = 10
    this.boardHeight = 22
    this.paintposA = 0
    this.paintposB = 0
    this.paintposC = canvas.width
    this.paintposD = canvas.height
    this.boardX = canvas.width * 0.25
    this.boardY = canvas.height * 0.15
    this.squareSide = canvas.height * 0.035
    
    this.scoreX =   this.boardX + this.squareSide * 10.5
    this.scoreY =   this.boardY + this.squareSide * 18
    this.nextX =    this.boardX + this.squareSide * 10.5
    this.nextY =    this.boardY + this.squareSide * 3
    this.nextOffsetX =    this.boardX + this.squareSide * 10.5
    this.nextOffsetY =    this.nextY + this.squareSide * 0.5
    this.nextOffsetvec =  this.squareSide * 3
    this.pauseX =     this.boardX + this.squareSide * 3
    this.pauseY =     this.boardY + this.squareSide * 12
    this.holdX =      this.boardX - this.squareSide * 4
    this.holdY =      this.boardY + this.squareSide * 3
    this.comboX =     this.boardX - this.squareSide * 5
    this.comboY =     this.boardX + this.squareSide * 12
    this.nameX =      this.boardX + 3 * this.squareSide
    this.nameY =      this.boardY + this.squareSide

    // board's bounding box
    this.boardBorder = [
      -0.5 +  this.boardX,
      -0.5 +  this.boardY + 2 * this.squareSide,
      0.5 +   this.boardX + this.boardWidth * this.squareSide + 1,
      0.5 +   this.boardY + this.boardHeight * this.squareSide
    ];
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.context.lineJoin = 'round';
  }
}
// boardWidth = 10
// boardHeight = 22
// paintposA = 0
// paintposB = 0
// paintposC = canvas.width
// paintposD = canvas.height
// boardX = canvas.width * 0.25
// boardY = canvas.height * 0.15
// squareSide = canvas.height * 0.035
// scoreX = boardX + squareSide * 10.5
// scoreY = boardY + squareSide * 18
// nextX = boardX + squareSide * 10.5
// nextY = boardY + squareSide * 3
// nextOffsetX = boardX + squareSide * 10.5
// nextOffsetY = nextY + squareSide * 0.5
// nextOffsetvec = squareSide * 3
// pauseX = boardX + squareSide * 3
// pauseY = boardY + squareSide * 12
// holdX = boardX - squareSide * 4
// holdY = boardY + squareSide * 3
// comboX = boardX - squareSide * 5
// comboY = boardX + squareSide * 12
// nameX = boardX + 3 * squareSide
// nameY = boardY + squareSide

// // board's bounding box
// boardBorder = [
//   -0.5 + boardX,
//   -0.5 + boardY + 2 * squareSide,
//   0.5 + boardX + boardWidth * squareSide + 1,
//   0.5 + boardY + boardHeight * squareSide
// ];
// this.canvas = canvas;
// this.context = this.canvas.getContext('2d');
// this.context.lineJoin = 'round';