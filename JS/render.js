class Render{
    _renderLite(tetris){
      tetris.context.clearRect(tetris.paintposA,tetris.paintposB,tetris.paintposC,tetris.paintposD);
      this._drawBackground(tetris);
      this._drawBoard(tetris);
      this._drawGhost(tetris);
      this._drawPiece(tetris);
      this._drawHUD(tetris);
      this._drawNext(tetris);
      if (tetris.haveHold) {this._drawHold(tetris);}
      
    }
    _render(tetris,time,blockpreview) {
      tetris.context.clearRect(tetris.paintposA,tetris.paintposB,tetris.paintposC,tetris.paintposD);
      this._drawBackground(tetris);
      this._drawBoard(tetris);
      this._drawGhost(tetris);
      this._drawPiece(tetris);
      this._drawHUD(tetris);
      this._rendertime(tetris,time);
      if(blockpreview == 0){
        this._drawNext(tetris);
        if (tetris.haveHold) {this._drawHold(tetris);}
      }
    }    
    _rendertime(tetris,time){
      let timeStr = 'Time:    '+Math.floor(time);
      tetris.context.fillText(timeStr,440, 60);
    }
    _drawBackground(tetris) {
        tetris.context.lineWidth = 1;
        // if burning a this, make background color flash
        const fillColor = tetris.gameState === ClassicTetris.STATE_BURN &&
        tetris.linesCleared.length === 4 &&
        tetris.frameCounter % 8 ?   //4 ?
        tetris.tetrisBackgroundColor :
        tetris.backgroundColor;
        // draw background and border
        tetris.context.beginPath();
        tetris.context.moveTo(tetris.boardBorder[0], tetris.boardBorder[1]);
        tetris.context.lineTo(tetris.boardBorder[2], tetris.boardBorder[1]);
        tetris.context.lineTo(tetris.boardBorder[2], tetris.boardBorder[3]);
        tetris.context.lineTo(tetris.boardBorder[0], tetris.boardBorder[3]);
        tetris.context.closePath();
        tetris.context.fillStyle = fillColor;
        tetris.context.strokeStyle = tetris.borderColor;
        tetris.context.fill();
        tetris.context.stroke();
        if (tetris.gameState === ClassicTetris.STATE_PAUSE) {
          // pause overlay:
          // write PAUSE on the board if game is paused
          
          tetris.context.font = tetris.canvasFont;
          tetris.context.fillStyle = tetris.canvasFontColor;
          //tetris.context.fillText('PAUSE', tetris.pauseX, tetris.pauseY);
          let pauseImg=new Image();pauseImg.src='pauseitem.png'
          tetris.context.drawImage(pauseImg,270, 250,160,160)
        } else {
        // draw grid if not paused
        tetris.context.lineWidth = 0.5;
        // horizontal lines
        tetris.context.strokeStyle = tetris.gridColor;
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
      //if(tetris.gameState === ClassicTetris.STATE_GAME_OVER)return;
      for (let i = 2; i < tetris.boardHeight; ++i) {
        for (let j = 0; j < tetris.boardWidth; ++j) {
          if (tetris.board[i][j] != -1) {
            const col = tetris.board[i][j] == 7 ?
                        tetris.gameOverColor :
                        tetris.pieces[tetris.board[i][j]].col;
            this._drawSquare(
                        tetris.boardX + j * tetris.squareSide,
                        tetris.boardY + i * tetris.squareSide,
                        col[0], col[1]);
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
                tetris.piece.col[0], tetris.piece.col[1]);
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
                  tetris.ghostColor[0], tetris.ghostColor[1]);
              }
            }
          }
      }
    
      // draw heads-up display
      _drawHUD(tetris) {
        let scoreStr = 'Lines:   ';
        let nextStr = 'Next';
        let holdStr = 'Hold';
        tetris.context.font = tetris.canvasFont;
        tetris.context.fillStyle = tetris.canvasFontColor;
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
                  tetris.next[num].col[0], tetris.next[num].col[1]);
              }
            }
          }
        }
      }
    
      // draw an individual square on the board
      _drawSquare(x, y, color, border) {
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
                tetris.holdPiece.col[0], tetris.holdPiece.col[1]);
            }
          }
        }
      }
  
}
