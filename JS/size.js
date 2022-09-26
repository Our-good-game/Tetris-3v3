class defaultSize {
  constructor(canvas){
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.context.lineJoin = 'round';
    this.playerName = ' '
    this._setPosition(canvas);
  }
  _setPosition(canvas) {
    this.boardWidth  = 10
    this.boardHeight = 22
    this.paintposA   = 0
    this.paintposB   = 0
    this.paintposC   = canvas.width
    this.paintposD   = canvas.height
    this.boardX      = canvas.width * 0.25
    this.boardY      = canvas.height * 0.15
    this.squareSide  = Math.sqrt (canvas.height * canvas.width / 700)
    
    this.scoreX        = this.boardX + this.squareSide * 10.5
    this.scoreY        = this.boardY + this.squareSide * 18
    this.nextX         = this.boardX + this.squareSide * 10.5
    this.nextY         = this.boardY + this.squareSide * 3
    this.nextOffsetX   = this.boardX + this.squareSide * 10.5
    this.nextOffsetY   = this.nextY  + this.squareSide * 0.5
    this.nextOffsetvec =               this.squareSide * 3
    this.holdX         = this.boardX - this.squareSide * 4
    this.holdY         = this.boardY + this.squareSide * 3
    this.comboX        = this.boardX - this.squareSide * 4.5
    this.comboY        = this.boardY + this.squareSide * 12
    this.nameX         = this.boardX + this.squareSide * 4
    this.nameY         = this.boardY + this.squareSide
    this.countDownX    = this.boardX + this.squareSide * 5
    this.countDownY    = this.boardY + this.squareSide * 12

    // board's bounding box
    this.boardBorder = [
      -0.5 +  this.boardX,
      -0.5 +  this.boardY + 2 * this.squareSide,
      0.5 +   this.boardX + this.boardWidth * this.squareSide + 1,
      0.5 +   this.boardY + this.boardHeight * this.squareSide
    ];
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

class teamModSize {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.context.lineJoin = 'round';
    this.playerName = " "
    this._setPosition(canvas);
  }
  _setPosition (canvas) {
    this.boardWidth = 10
    this.boardHeight = 22
    this.paintposA = 0
    this.paintposB = 0
    this.paintposC = canvas.width
    this.paintposD = canvas.height
    this.boardX = canvas.width * 0.25
    this.boardY = 0
    this.squareSide = Math.sqrt (canvas.height * canvas.width / 500)
    
    this.scoreX        = this.boardX + this.squareSide * 10.5
    this.scoreY        = this.boardY + this.squareSide * 18
    this.nextX         = this.boardX + this.squareSide * 10.5 
    this.nextY         = this.boardY + this.squareSide * 3
    this.nextOffsetX   = this.boardX + this.squareSide * 10.5
    this.nextOffsetY   = this.nextY  + this.squareSide * 0.5
    this.nextOffsetvec =               this.squareSide * 3
    this.holdX         = this.boardX - this.squareSide * 4
    this.holdY         = this.boardY + this.squareSide * 3
    this.comboX        = this.boardX + this.squareSide * 10.5
    this.comboY        = this.boardY + this.squareSide * 14
    this.nameX         = this.boardX + this.squareSide * 4
    this.nameY         = this.boardY + this.squareSide
    this.countDownX    = this.boardX + this.squareSide * 3.5
    this.countDownY    = this.boardY + this.squareSide * 10

    // board's bounding box
    this.boardBorder = [
      -0.5 +  this.boardX,
      -0.5 +  this.boardY + 2 * this.squareSide,
      0.5 +   this.boardX + this.boardWidth * this.squareSide + 1,
      0.5 +   this.boardY + this.boardHeight * this.squareSide
    ];
  }
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

class viewModSize {
  constructor(canvas) {
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
    this.boardY = 0
    this.squareSide = canvas.width * 0.030
    
    this.scoreX =   this.boardX + this.squareSide * 10.5
    this.scoreY =   this.boardY + this.squareSide * 18
    this.nextX =    this.boardX + this.squareSide * 10.5 
    this.nextY =    this.boardY + this.squareSide * 3
    this.nextOffsetX =    this.boardX + this.squareSide * 10.5
    this.nextOffsetY =    this.nextY + this.squareSide * 0.5
    this.nextOffsetvec =  this.squareSide * 3
    this.holdX =      this.boardX - this.squareSide * 4
    this.holdY =      this.boardY + this.squareSide * 3
    this.comboX =     this.boardX + this.squareSide * 10.5
    this.comboY =     this.boardX + this.squareSide * 11
    this.nameX =      this.boardX + 3 * this.squareSide
    this.nameY =      this.boardY + this.squareSide

    // board's bounding box
    this.boardBorder = [
      -0.5 +  this.boardX,
      -0.5 +  this.boardY + 2 * this.squareSide,
      0.5 +   this.boardX + this.boardWidth * this.squareSide + 1,
      0.5 +   this.boardY + this.boardHeight * this.squareSide
    ];
  }
}