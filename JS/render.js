class Render{
  constructor(){
    this.canvasFont = '36px huakang_girl_w5',
    this.canvasFontColor = '#FFF',
    this.piececolor = [
      ['#fe103c', '#f890a7'], //z-0
      ['#66fd00', '#c4fe93'], //s-1
      ['#ffde00', '#fff88a'], //o-2
      ['#ff7308', '#ffca9b'], //l-3
      ['#1801ff', '#5a95ff'], //j-4
      ['#b802fd', '#f591fe'], //t-5
      ['#00e6fe', '#86fefe'], //i-6
      ['#fff', '#ddd']        //lock-7
    ]
    this.gameOverColor = ['#fff', '#ddd']
    this.ghostColor = ['#aaaaaa', '#fafafa']
    this.backgroundColor = '#111'
    this.tetrisBackgroundColor = '#000000'
    this.borderColor = '#fff'
    this.gridColor = '#ddd'
    this.displayTetris = false
    this.displayTspin = false
    this.itemImageShow = false;
    this.itemImageOpacity = 0.0;
    this.itemImage = new Image();
  }
    _rendertime(canvas, time){
      canvas.context.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
      let timeStr = Math.floor(time);
      canvas.context.font = this.canvasFont;
      canvas.context.fillStyle = this.canvasFontColor;
      canvas.context.fillText('Time：', 0, 100);
      canvas.context.fillText(timeStr, 15, 140);
    }
    _render(tetris, formal, prof) {
      formal.context.clearRect(formal.paintposA, formal.paintposB, formal.paintposC, formal.paintposD);
      this._drawBackground(tetris, formal, prof);
      this._drawBoard(tetris, formal);
      this._drawGhost(tetris, formal);
      this._drawPiece(tetris, formal);
      this._drawHUD(tetris, formal);
      this._drawPlayerName(tetris, formal);
      this._drawCombo(tetris, formal);
      if (tetris.itemBlockPreview == undefined || tetris.itemBlockPreview !== true) {
        this._drawNext(tetris, formal)
      }
      if ( tetris.haveHold ) {
        this._drawHold(tetris, formal)
      }
      if(tetris.gameState === 3 ) this._drawWinner(tetris, formal)
      if (this.itemImageShow) {
        this._drawItem(tetris, formal);
      }
    }   
    
    _renderNoHUD (tetris, formal, prof) {
      formal.context.clearRect(formal.paintposA, formal.paintposB, formal.paintposC, formal.paintposD);
      this._drawBackgroundSimple(tetris, formal, prof);
      this._drawBoard(tetris, formal);
      this._drawGhost(tetris, formal);
      this._drawPiece(tetris, formal);
      this._drawPlayerName(tetris, formal);
    }

    // draw an individual square on the board
    _drawSquare(x, y, color, border, formal) {
      formal.context.beginPath();
      formal.context.moveTo(x + 1, y + 1);
      formal.context.lineTo(x + formal.squareSide - 1, y + 1);
      formal.context.lineTo(x + formal.squareSide - 1, y + formal.squareSide - 1);
      formal.context.lineTo(x + 1, y + formal.squareSide - 1);
      formal.context.closePath();
      formal.context.fillStyle = color;
      formal.context.strokeStyle = border;
      formal.context.fill();
      formal.context.stroke();
    }

    _drawBackground(tetris, formal, prof) {
      formal.context.lineWidth = 1;
      // if burning a this, make background color flash
      const fillColor = this.backgroundColor;
      // draw background and border
      formal.context.beginPath();
      formal.context.moveTo(formal.boardBorder[0], formal.boardBorder[1]);
      formal.context.lineTo(formal.boardBorder[2], formal.boardBorder[1]);
      formal.context.lineTo(formal.boardBorder[2], formal.boardBorder[3]);
      formal.context.lineTo(formal.boardBorder[0], formal.boardBorder[3]);
      formal.context.closePath();
      formal.context.fillStyle = fillColor;
      formal.context.strokeStyle = this.borderColor;
      if (prof == 'Attacker'){
        formal.context.strokeStyle = '#ff0000';
      }
      if (prof == 'Defender') {
        formal.context.strokeStyle = 'chartreuse';
      }
      if (prof == 'Magician') {
        formal.context.strokeStyle = 'deepskyblue';
      }

      formal.context.lineWidth = 5;

      formal.context.fill();
      formal.context.stroke();
      if (tetris.gameState === 4) {
        // pause overlay:
        // write PAUSE on the board if game is paused
        
        formal.context.font = this.canvasFont;
        formal.context.fillStyle = this.canvasFontColor;
        //formal.context.fillText('PAUSE', tetris.pauseX, tetris.pauseY);
        let pauseImg=new Image();pauseImg.src='pauseitem.png'
        formal.context.drawImage(pauseImg, 270, 250, 160, 160)
      } else {
        // draw grid if not paused
        formal.context.lineWidth = 0.5;
        // horizontal lines
        formal.context.strokeStyle = this.gridColor;
        const boardRight = formal.boardX + formal.squareSide * formal.boardWidth;
        for (let i = 3; i < formal.boardHeight; ++i) {
          const height = formal.boardY + i * formal.squareSide;
          formal.context.beginPath();
          formal.context.moveTo(formal.boardX, height);
          formal.context.lineTo(boardRight, height);
          formal.context.closePath();
          formal.context.stroke();
        }
        // vertical lines
        const boardTop = formal.boardY + 2 * formal.squareSide;
        const boardBottom = formal.boardY + formal.boardHeight * formal.squareSide;
        for (let j = 0; j < formal.boardWidth; ++j) {
          const width = formal.boardX + j * formal.squareSide;
          formal.context.beginPath();
          formal.context.moveTo(width, boardTop);
          formal.context.lineTo(width, boardBottom);
          formal.context.closePath();
          formal.context.stroke();
        }
        // back to regular line width
        formal.context.lineWidth = 1;
      } 
    }
    // 沒有網格線
    _drawBackgroundSimple(tetris, formal, prof) {
      formal.context.lineWidth = 1;
      // if burning a this, make background color flash
      const fillColor = this.backgroundColor;
      // draw background and border
      formal.context.beginPath();
      formal.context.moveTo(formal.boardBorder[0], formal.boardBorder[1]);
      formal.context.lineTo(formal.boardBorder[2], formal.boardBorder[1]);
      formal.context.lineTo(formal.boardBorder[2], formal.boardBorder[3]);
      formal.context.lineTo(formal.boardBorder[0], formal.boardBorder[3]);
      formal.context.closePath();
      formal.context.fillStyle = fillColor;
      formal.context.strokeStyle = this.borderColor;
      if (prof == 'Attacker'){
        formal.context.strokeStyle = '#ff0000';
      }
      if (prof == 'Defender') {
        formal.context.strokeStyle = 'chartreuse';
      }
      if (prof == 'Magician') {
        formal.context.strokeStyle = 'deepskyblue';
      }
      formal.context.lineWidth = 5;
      formal.context.fill();
      formal.context.stroke();
      formal.context.lineWidth = 1;
    }
    _drawBoard(tetris, formal) { 
      if(!tetris.gameLoop )return;
      for (let i = 2; i < formal.boardHeight; ++i) {
        for (let j = 0; j < formal.boardWidth; ++j) {
          if (tetris.board[i][j] != -1) {
            this._drawSquare( 
              formal.boardX + j * formal.squareSide,
              formal.boardY + i * formal.squareSide,
              this.piececolor[tetris.board[i][j]][0], 
              this.piececolor[tetris.board[i][j]][1],
              formal)
          }
        }
      }
    } 
      // draw current piece
      _drawPiece(tetris, formal) {
        if(tetris.gameState !== 0)return;
        // current piece is only drawn in drop state
        const p = tetris.piece.rot[tetris.pieceRotation];
        for (let i = 0; i < p.length; ++i) {
          for (let j = 0; j < p[i].length; ++j) {
            if (p[i][j] != 0 && tetris.piecePosition[1] + i > 1) {
              this._drawSquare(
                formal.boardX + (tetris.piecePosition[0] + j) * formal.squareSide,
                formal.boardY + (tetris.piecePosition[1] + i) * formal.squareSide,
                this.piececolor[tetris.piece.id][0],
                this.piececolor[tetris.piece.id][1],
                formal);
            }
          }
        }
      }
    
      
      // draw ghost piece
      // it is a representation of where a tetromino or other piece will land if allowed to drop into the playfield
      _drawGhost(tetris, formal) {
        if(tetris.gameState !== 0)return;
          // find ghost piece position, which is lowest position for current piece
          const piecePos = [tetris.piecePosition[0], tetris.piecePosition[1]];
          while (tetris._canMove(tetris.piece, tetris.pieceRotation, piecePos, 0, 1)) {
            ++piecePos[1];
          }
    
          // draw ghost piece
          const p = tetris.piece.rot[tetris.pieceRotation];
          for (let i = 0; i < p.length; ++i) {
            for (let j = 0; j < p[i].length; ++j) {
              if (p[i][j] != 0 && piecePos[1] + i > 1) {
                this._drawSquare(
                  formal.boardX + (piecePos[0] + j) * formal.squareSide,
                  formal.boardY + (piecePos[1] + i) * formal.squareSide,
                  this.ghostColor[0], 
                  this.ghostColor[1],
                  formal);
              }
            }
          }
      }
    
      // draw heads-up display
      _drawHUD(tetris, formal) {
        let nextStr = 'Next';
        let holdStr = 'Hold';
        formal.context.font = this.canvasFont;
        formal.context.fillStyle = this.canvasFontColor;
        formal.context.fillText(nextStr, formal.nextX, formal.nextY);
        formal.context.fillText(holdStr, formal.holdX, formal.holdY);
      }
    
      // draw next piece
      _drawNext(tetris, formal) {
        if(!tetris.gameLoop)return
        if(tetris.gameState == 3)return;
        for(let num= 0;num< 3;++num){
          let p = tetris.next[num].rot[0];
          let b = tetris.next[num].box;
          for (let i = b[0]; i < b[0] + b[2]; ++i) {
            for (let j = b[1]; j < b[1] + b[3]; ++j) {
              if (p[i][j] != 0) {
                this._drawSquare(
                  formal.nextOffsetX + (j - b[1]) * formal.squareSide,
                  formal.nextOffsetY + (formal.nextOffsetvec * num)+ (i - b[0]) * formal.squareSide,
                  this.piececolor[tetris.next[num].id][0],
                  this.piececolor[tetris.next[num].id][1],
                  formal);
              }
            }
          }
        }
      }
    
      
      _drawHold(tetris, formal) {
        if(!tetris.gameLoop)return
        if(tetris.gameState == 3)return;
        const p = tetris.holdPiece.rot[0];
        const b = tetris.holdPiece.box;
        for (let i = b[0]; i < b[0] + b[2]; ++i) {
          for (let j = b[1]; j < b[1] + b[3]; ++j) {
            if (p[i][j] != 0) {
              this._drawSquare(
                formal.holdX + (j - b[1]) * formal.squareSide - 10,
                formal.holdY + (i - b[0]) * formal.squareSide + 50,
                this.piececolor[tetris.holdPiece.id][0],
                this.piececolor[tetris.holdPiece.id][1],
                formal);
            }
          }
        }
      }
      _drawCombo(tetris, formal) {
        if(!tetris.gameLoop)return
        if(tetris.gameState == 3)return;
       
        if(tetris.cheakTetris){
          this.displayTetris = true
          setTimeout( ()=>{this.displayTetris = false},1000)
        }
        if(tetris.cheakTspin){
          this.displayTspin = true
          setTimeout( ()=>{this.displayTspin = false},1000)
        }
        if(tetris.combos > 0){
          formal.context.fillText("Combo", formal.comboX, formal.comboY);
          formal.context.fillText(tetris.combos, formal.comboX + formal.squareSide * 1.5, formal.comboY + formal.squareSide * 1.5);
        }
      
        if(tetris.backToBack){
          formal.context.fillText("Back-  ", formal.comboX, formal.comboY + formal.squareSide * 3);
          formal.context.fillText("ToBack", formal.comboX, formal.comboY + formal.squareSide * 4);
        }
        if(this.displayTetris)
          formal.context.fillText("Tetris", formal.comboX , formal.comboY + formal.squareSide * 6); 
        if(tetris.cheakTspin)
          formal.context.fillText("T-spin", formal.comboX, formal.comboY + formal.squareSide * 8);
        
      }
      
      _drawPlayerName(tetris, formal) {
        // console.log (formal.playerName + " draw");
        formal.context.font = this.canvasFont;
        formal.context.fillStyle = this.canvasFontColor;
        formal.context.fillText(formal.playerName, formal.nameX, formal.nameY);
      }
      _drawWinner(tetris, formal) {
        if(tetris.result){
          formal.context.fillStyle = '#F4E952';
          formal.context.fillText('Winner', formal.nameX, formal.nameY - 2 * formal.squareSide);
        }
      }
      _setItemImage (itemImageSrc) {
        this.itemImage.src = itemImageSrc;
        this.itemImageShow = true;
        this.itemImageOpacity = 0.5;
      }
      _drawItem (tetris, formal) {
        if (this.itemImageOpacity - 0.0056 > 0.0) {
          // 大約1.5s會歸0
          this.itemImageOpacity -= 0.0056;
        }
        else {
          this.itemImageOpacity = 0.0;
          this.itemImageShow = false;
        }
        formal.context.globalAlpha = this.itemImageOpacity;
        formal.context.drawImage (this.itemImage, 
                                  formal.boardBorder[0] + 1 * formal.squareSide, 
                                  formal.boardBorder[1] + 6 * formal.squareSide,
                                  8 * formal.squareSide, 8 * formal.squareSide);
        formal.context.globalAlpha = 1.0;
      }
}
