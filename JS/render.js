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
  }
    _rendertime(canvas,time){
      canvas.context.clearRect(0,0,canvas.canvas.width,canvas.canvas.height);
      let timeStr = Math.floor(time);
      canvas.context.font = this.canvasFont;
      canvas.context.fillStyle = this.canvasFontColor;
      canvas.context.fillText('Time：',0,130);
      canvas.context.fillText(timeStr,15,170);
    }
    _render(tetris) {
      tetris.context.clearRect(tetris.paintposA,tetris.paintposB,tetris.paintposC,tetris.paintposD);
      this._drawBackground(tetris);
      this._drawBoard(tetris);
      this._drawGhost(tetris);
      this._drawPiece(tetris);
      this._drawHUD(tetris);
      if ( tetris.comboTrigger && tetris.combos)this._drawCombo(tetris)
      if ( !tetris.itemBlockPreview ) {this._drawNext(tetris);}
      if ( tetris.haveHold ) {this._drawHold(tetris);}
    }   
    _drawBackground(tetris) {
        tetris.context.lineWidth = 1;
        // if burning a this, make background color flash
        const fillColor = 
        tetris.gameState === ClassicTetris.STATE_BURN &&
        tetris.linesCleared.length === 4 &&
        tetris.frameCounter % 8 ?   //4 ?
        this.tetrisBackgroundColor :
        this.backgroundColor;
        // draw background and border
        tetris.context.beginPath();
        tetris.context.moveTo(tetris.boardBorder[0], tetris.boardBorder[1]);
        tetris.context.lineTo(tetris.boardBorder[2], tetris.boardBorder[1]);
        tetris.context.lineTo(tetris.boardBorder[2], tetris.boardBorder[3]);
        tetris.context.lineTo(tetris.boardBorder[0], tetris.boardBorder[3]);
        tetris.context.closePath();
        tetris.context.fillStyle = fillColor;
        tetris.context.strokeStyle = this.borderColor;
        tetris.context.fill();
        tetris.context.stroke();
        if (tetris.gameState === ClassicTetris.STATE_PAUSE) {
          // pause overlay:
          // write PAUSE on the board if game is paused
          
          tetris.context.font = this.canvasFont;
          tetris.context.fillStyle = this.canvasFontColor;
          //tetris.context.fillText('PAUSE', tetris.pauseX, tetris.pauseY);
          let pauseImg=new Image();pauseImg.src='pauseitem.png'
          tetris.context.drawImage(pauseImg,270, 250,160,160)
        } else {
        // draw grid if not paused
        tetris.context.lineWidth = 0.5;
        // horizontal lines
        tetris.context.strokeStyle =　this.gridColor;
        const boardRight = tetris.boardX + tetris.squareSide * tetris.boardWidth;
        for (let i = 3; i < tetris.boardHeight; ++i) {
            const height = tetris.boardY + i * tetris.squareSide;
            tetris.context.beginPath();
            tetris.context.moveTo(tetris.boardX, height);
            tetris.context.lineTo(boardRight, height);
            tetris.context.closePath();
            tetris.context.stroke();
        }
        // vertical lines
        const boardTop = tetris.boardY + 2 * tetris.squareSide;
        const boardBottom = tetris.boardY + tetris.boardHeight * tetris.squareSide;
        for (let j = 0; j < tetris.boardWidth; ++j) {
            const width = tetris.boardX + j * tetris.squareSide;
            tetris.context.beginPath();
            tetris.context.moveTo(width, boardTop);
            tetris.context.lineTo(width, boardBottom);
            tetris.context.closePath();
            tetris.context.stroke();
        }
          // back to regular line width
          tetris.context.lineWidth = 1;
        } 
      }
    _drawBoard(tetris) { 
      if(tetris.gameState === ClassicTetris.STATE_PAUSE)return;
      for (let i = 2; i < tetris.boardHeight; ++i) {
        for (let j = 0; j < tetris.boardWidth; ++j) {
          if (tetris.board[i][j] != -1) {
            this._drawSquare(
              tetris.boardX + j * tetris.squareSide,
              tetris.boardY + i * tetris.squareSide,
              this.piececolor[tetris.board[i][j]][0], 
              this.piececolor[tetris.board[i][j]][1],
              tetris);
          }
        }
      }
    } 
      // draw current piece
      _drawPiece(tetris) {
        if(tetris.gameState === ClassicTetris.STATE_PAUSE)return;
        if(tetris.gameState === ClassicTetris.STATE_GAME_OVER)return;
        if(tetris.gameState === ClassicTetris.STATE_BURN)return;
        if(tetris.gameState === ClassicTetris.STATE_ARE)return;
        // current piece is only drawn in drop state
        const p = tetris.piece.rot[tetris.pieceRotation];
        for (let i = 0; i < p.length; ++i) {
          for (let j = 0; j < p[i].length; ++j) {
            if (p[i][j] != 0 && tetris.piecePosition[1] + i > 1) {
              this._drawSquare(
                tetris.boardX + (tetris.piecePosition[0] + j) * tetris.squareSide,
                tetris.boardY + (tetris.piecePosition[1] + i) * tetris.squareSide,
                this.piececolor[tetris.piece.id][0],
                this.piececolor[tetris.piece.id][1],
                tetris);
            }
          }
        }
      }
    
      // draw ghost piece
      // it is a representation of where a tetromino or other piece will land if allowed to drop into the playfield
      _drawGhost(tetris) {
        if(tetris.gameState === ClassicTetris.STATE_PAUSE)return;
        if(tetris.gameState === ClassicTetris.STATE_GAME_OVER)return;
        if(tetris.gameState === ClassicTetris.STATE_BURN)return;
        if(tetris.gameState === ClassicTetris.STATE_ARE)return;
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
                  tetris.boardX + (piecePos[0] + j) * tetris.squareSide,
                  tetris.boardY + (piecePos[1] + i) * tetris.squareSide,
                  this.ghostColor[0], 
                  this.ghostColor[1],
                  tetris);
              }
            }
          }
      }
    
      // draw heads-up display
      _drawHUD(tetris) {
        let scoreStr = 'Lines:   ';
        let nextStr = 'Next';
        let holdStr = 'Hold';
        tetris.context.font = this.canvasFont;
        tetris.context.fillStyle = this.canvasFontColor;
        tetris.context.fillText(scoreStr, tetris.scoreX, tetris.scoreY);
        tetris.context.fillText(tetris.lines, tetris.scoreX, tetris.scoreY + 50);
        tetris.context.fillText(nextStr, tetris.nextX, tetris.nextY);
        tetris.context.fillText(holdStr, tetris.holdX, tetris.holdY);
      }
    
      // draw next piece
      _drawNext(tetris) {
        if(tetris.gameState === ClassicTetris.STATE_PAUSE)return;
        if(tetris.gameState === ClassicTetris.STATE_GAME_OVER)return;
        for(let num= 0;num< 3;++num){
          let p = tetris.next[num].rot[0];
          let b = tetris.next[num].box;
          for (let i = b[0]; i < b[0] + b[2]; ++i) {
            for (let j = b[1]; j < b[1] + b[3]; ++j) {
              if (p[i][j] != 0) {
                this._drawSquare(
                  tetris.nextOffsetX + (j - b[1]) * tetris.squareSide,
                  tetris.nextOffsetY + (tetris.nextOffsetvec * num)+ (i - b[0]) * tetris.squareSide,
                  this.piececolor[tetris.next[num].id][0],
                  this.piececolor[tetris.next[num].id][1],
                  tetris);
              }
            }
          }
        }
      }
    
      // draw an individual square on the board
      _drawSquare(x, y, color, border,tetris) {
        tetris.context.beginPath();
        tetris.context.moveTo(x + 1, y + 1);
        tetris.context.lineTo(x + tetris.squareSide - 1, y + 1);
        tetris.context.lineTo(x + tetris.squareSide - 1, y + tetris.squareSide - 1);
        tetris.context.lineTo(x + 1, y + tetris.squareSide - 1);
        tetris.context.closePath();
        tetris.context.fillStyle = color;
        tetris.context.strokeStyle = border;
        tetris.context.fill();
        tetris.context.stroke();
      }
      _drawHold(tetris) {
        if(tetris.gameState === ClassicTetris.STATE_PAUSE)return;
        if(tetris.gameState === ClassicTetris.STATE_GAME_OVER)return;
        const p = tetris.holdPiece.rot[0];
        const b = tetris.holdPiece.box;
        for (let i = b[0]; i < b[0] + b[2]; ++i) {
          for (let j = b[1]; j < b[1] + b[3]; ++j) {
            if (p[i][j] != 0) {
              this._drawSquare(
                tetris.holdX + (j - b[1]) * tetris.squareSide,
                tetris.holdY + (i - b[0]) * tetris.squareSide + 30,
                this.piececolor[tetris.holdPiece.id][0],
                this.piececolor[tetris.holdPiece.id][1],
                tetris);
            }
          }
        }
      }
      _drawCombo(tetris) {
        tetris.context.fillText("Combo", tetris.comboX, tetris.comboY);
        tetris.context.fillText(tetris.combos, tetris.comboX+50, tetris.comboY + 50);
      }
}
