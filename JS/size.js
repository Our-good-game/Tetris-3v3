class defaultsize {
  constructor(canvas){
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.context.lineJoin = 'round';
    this.playerName = ' '
    
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
  // disable/enable UI
  _disableUI() {
    this.canvas.style.touchAction = 'none';
    this.canvas.addEventListener('contextmenu', this._handleContextMenu, { capture: true, passive: false });
  }
  _enableUI() {
    this.canvas.style.touchAction = 'auto';
    this.canvas.removeEventListener('contextmenu', this._handleContextMenu, true);
  }
  _handleContextMenu = event => {
    event.preventDefault();
  }

}
class teammatesize {
  constructor(canvas){
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.context.lineJoin = 'round';
    this.playerName = " "
    
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