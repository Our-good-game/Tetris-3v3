'use strict';

//-------------------------------------------------------------------------
// 
// PlayerInterface class
// 
//-------------------------------------------------------------------------
class PlayerInterface {


  //-----------------------------------------------------------------------
  // 
  // piece rotations
  // 
  //-----------------------------------------------------------------------
  
  static Z_ROT = [
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1]
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0]
    ]
  ];

  static S_ROT = [
    [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1]
    ]
  ];

  static O_ROT = [
    [
      [1, 1],
      [1, 1]
    ]
  ];

  static L_ROT = [
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0]
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ],
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ]
  ];
  
  static J_ROT = [
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1]
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
    ],
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0]
    ]
  ];

  static T_ROT = [
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 0]
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0]
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0]
    ]
  ];

  static I_ROT = [
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0]
    ]
  ];


  // initial positions
  static Z_INI_POS = [4, 1];
  static S_INI_POS = [4, 1];
  static O_INI_POS = [4, 2];
  static L_INI_POS = [4, 1];
  static J_INI_POS = [4, 1];
  static T_INI_POS = [4, 2];
  static I_INI_POS = [3, 0];

  static Z_BOX = [1, 0, 2, 3]; // x y hei wid
  static S_BOX = [1, 0, 2, 3];
  static O_BOX = [0, 0, 2, 2];
  static L_BOX = [1, 0, 2, 3];
  static J_BOX = [1, 0, 2, 3];
  static T_BOX = [0, 0, 2, 3];
  static I_BOX = [2, 0, 1, 4];


  // piece names
  static Z_PIECE = 'z';
  static S_PIECE = 's';
  static O_PIECE = 'o';
  static L_PIECE = 'l';
  static J_PIECE = 'j';
  static T_PIECE = 't';
  static I_PIECE = 'i';


  // game states
  static STATE_DROP = 0;
  static STATE_BURN = 1;
  static STATE_ARE = 2;
  static STATE_GAME_OVER = 3;
  static STATE_PAUSE = 4;


  // events
  static GAME_START = 'game-start';
  static GAME_OVER = 'game-over';

  static GAME_OVER_START = 'game-over-start';
  static GAME_OVER_END = 'game-over-end';

  static GAME_PAUSE = 'game-pause';
  static GAME_RESUME = 'game-resume';

  static PIECE_MOVE_LEFT = 'piece-move-left';
  static PIECE_MOVE_RIGHT = 'piece-move-right';
  static PIECE_MOVE_DOWN = 'piece-move-down';
  static PIECE_HARD_DROP = 'piece-hard-drop';

  static PIECE_ROTATE_CLOCKWISE = 'piece-rotate-clockwise';
  static PIECE_ROTATE_ANTICLOCKWISE = 'piece-rotate-anticlockwise';

  static PIECE_LOCK = 'piece-lock';
  static NEXT_PIECE = 'next-piece';

  static LEVEL_CHANGE = 'level-change';
  static SCORE_CHANGE = 'score-change';

  static LINE_CLEAR_START = 'line-clear-start';
  static LINE_CLEAR_END = 'line-clear-end';

  static LINE_CLEAR = 'line-clear';
 
  
  // doard size in terms of squares
  // this is typically 10x20, but we are adding 2 invisible rows
  // at the top to have enough room to spawn all pieces
  static BOARD_WIDTH = 10;
  static BOARD_HEIGHT = 22;

  // constructor needs a canvas
  constructor(canvas, {
    boardWidth = PlayerInterface.BOARD_WIDTH,
    boardHeight = PlayerInterface.BOARD_HEIGHT,
    paintposA=0,
    paintposB=0,
    paintposC = canvas.width,
    paintposD = canvas.height,
    boardX = canvas.width * 0.25,
    boardY = canvas.height * 0.15,
    squareSide = canvas.height * 0.035,
    
    scoreX = boardX + squareSide * 10.5,
    scoreY = boardY + squareSide * 18,
    nextX = boardX + squareSide * 10.5,
    nextY = boardY + squareSide * 3,
    nextOffsetX = boardX + squareSide * 10.5,
    nextOffsetY = nextY + squareSide * 0.5,
    nextOffsetvec = squareSide * 3,
    pauseX = boardX + squareSide * 3,
    pauseY = boardY + squareSide * 12,
    holdX = boardX - squareSide * 3,
    holdY = boardY + squareSide * 3,

    tapClickMaxDuration = 30000,
    tapClickMaxDistance = 1,


  } = {}) {

    // game canvas
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.context.lineJoin = 'round';

    // board dimensions
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;

    // init board
    this.board = [];
    for (let i = 0; i < this.boardHeight; ++i) {
      const row = [];
      for (let j = 0; j < this.boardWidth; ++j) row.push(7);
      this.board.push(row);
    }
    for (let i = 0; i < this.boardHeight; ++i) {
      for (let j = 0; j < this.boardWidth; ++j)this.board[i][j]=-1
    }
    //canvaes paint
    this.paintposA = paintposA;
    this.paintposB = paintposB;
    this.paintposC = paintposC;
    this.paintposD = paintposD;
    // render parameters
    this.boardX = boardX;           // board's left
    this.boardY = boardY;           // board's top
    this.squareSide = squareSide;   // width of individual squares


    // board's bounding box
    this.boardBorder = [
      -0.5 + this.boardX,
      -0.5 + this.boardY + 2 * this.squareSide,
      0.5 + this.boardX + this.boardWidth * this.squareSide + 1,
      0.5 + this.boardY + this.boardHeight * this.squareSide
    ];

    // HUD stuff coordinates
    this.scoreX = scoreX;             // score coords
    this.scoreY = scoreY;
    this.nextX = nextX;               // next text coords
    this.nextY = nextY;
    this.nextOffsetX = nextOffsetX;   // next piece coords
    this.nextOffsetY = nextOffsetY;
    this.nextOffsetvec = nextOffsetvec
    this.pauseX = pauseX;             // pause text coords
    this.pauseY = pauseY;
    this.holdX = holdX;
    this.holdY = holdY;

    
   

    // max time between pointerdown and pointerup for the game to count it as click
    this.tapClickMaxDuration = tapClickMaxDuration;   // grandpa's tap/click duration!
    // maximum distance between pointer-down and pointer-up coordinates 
    // for the game to count it as a click/tap
    this.tapClickMaxDistance = tapClickMaxDistance;

    

    // pieces
    this.pieces = [
      {
        id: 0,
        name: PlayerInterface.Z_PIECE,
        rot: PlayerInterface.Z_ROT,
        iniPos: PlayerInterface.Z_INI_POS,
        col: this.zColor,
        box: PlayerInterface.Z_BOX
      },
      {
        id: 1,
        name: PlayerInterface.S_PIECE,
        rot: PlayerInterface.S_ROT,
        iniPos: PlayerInterface.S_INI_POS,
        col: this.sColor,
        box: PlayerInterface.S_BOX
      },
      {
        id: 2,
        name: PlayerInterface.O_PIECE,
        rot: PlayerInterface.O_ROT,
        iniPos: PlayerInterface.O_INI_POS,
        col: this.oColor,
        box: PlayerInterface.O_BOX
      },
      {
        id: 3,
        name: PlayerInterface.L_PIECE,
        rot: PlayerInterface.L_ROT,
        iniPos: PlayerInterface.L_INI_POS,
        col: this.lColor,
        box: PlayerInterface.L_BOX
      },
      {
        id: 4,
        name: PlayerInterface.J_PIECE,
        rot: PlayerInterface.J_ROT,
        iniPos: PlayerInterface.J_INI_POS,
        col: this.jColor,
        box: PlayerInterface.J_BOX
      },
      {
        id: 5,
        name: PlayerInterface.T_PIECE,
        rot: PlayerInterface.T_ROT,
        iniPos: PlayerInterface.T_INI_POS,
        col: this.tColor,
        box: PlayerInterface.T_BOX
      },
      {
        id: 6,
        name: PlayerInterface.I_PIECE,
        rot: PlayerInterface.I_ROT,
        iniPos: PlayerInterface.I_INI_POS,
        col: this.iColor,
        box: PlayerInterface.I_BOX
      },
    ];

    // items 
    this.items=[
      {
        id: 0,
        name: 'LockSpace',
      },
      {
        id: 1,
        name: 'Defense',
      },
      {
        id: 2,
        name: 'HoldOn',
      },
      {
        id: 3,
        name: 'LeftRightChange',
      },
      {
        id: 4,
        name: 'BlockPreview',
      },
      {
        id: 5,
        name: 'ChangeTetris',
      },
      {
        id: 6,
        name: 'LockTetris',
      },
      {
        id: 7,
        name :'BlockALine',
      },
    ];
    this.send_item= undefined;
    this.get_item= undefined
    this.blockHeight=0;
    this.item_defense=false
    
    // pointer coords
    this.xIni = undefined;
    this.yIni = undefined;
    this.tIni = undefined;

    // pointer game controls
    this.pointerMoveDownEnabled = false;  // flag to allow/disallow pointer to move piece down

    this.playing = false;       // ongoing game
    
    this.piece = this.pieces[0];      // current piece
    this.piecePosition = [0, 0];    // current piece's position
    this.pieceRotation = 0;           // current piece's rotation
    this.next = [
      this.pieces[0],
      this.pieces[0],
      this.pieces[0],
    ];       // next piece
    this.queue = [0, 1, 2, 3, 4, 5, 6, -1, 0, 1, 2, 3, 4, 5, 6]; //for rondom of pieces rule
    this.holdPiece = undefined;       // holding poece

    // game parameters
    this.startLevel = 0;
    this.level = 0;
    this.lines = 0;
    this.score = 0;
    this.time = 60;
    this.pressDownScore = 0;

    // event listeners
    this.handlers = new Map();
    this.handlers.set(PlayerInterface.GAME_START, []);
    this.handlers.set(PlayerInterface.GAME_OVER, []);
    this.handlers.set(PlayerInterface.GAME_OVER_START, []);
    this.handlers.set(PlayerInterface.GAME_OVER_END, []);
    this.handlers.set(PlayerInterface.GAME_PAUSE, []);
    this.handlers.set(PlayerInterface.GAME_RESUME, []);
    this.handlers.set(PlayerInterface.PIECE_MOVE_LEFT, []);
    this.handlers.set(PlayerInterface.PIECE_MOVE_RIGHT, []);
    this.handlers.set(PlayerInterface.PIECE_MOVE_DOWN, []);
    this.handlers.set(PlayerInterface.PIECE_HARD_DROP, []);
    this.handlers.set(PlayerInterface.PIECE_ROTATE_CLOCKWISE, []);
    this.handlers.set(PlayerInterface.PIECE_ROTATE_ANTICLOCKWISE, []);
    this.handlers.set(PlayerInterface.PIECE_LOCK, []);
    this.handlers.set(PlayerInterface.NEXT_PIECE, []);
    this.handlers.set(PlayerInterface.LEVEL_CHANGE, []);
    this.handlers.set(PlayerInterface.SCORE_CHANGE, []);
    this.handlers.set(PlayerInterface.LINE_CLEAR_START, []);
    this.handlers.set(PlayerInterface.LINE_CLEAR_END, []);
    this.handlers.set(PlayerInterface.LINE_CLEAR, []);

    // animation frames counters
    this.frameCounter = 0;
    this.areFrames = -1;
    this.framesTilDrop = -1;

    // counters for line-clear and game-over animations
    this.columnsCleared = -1;
    this.gameOverLine = -1;

    // game state
    this.previousGameState = PlayerInterface.STATE_GAME_OVER;
    this.gameState = PlayerInterface.STATE_GAME_OVER;

    // an empty row used to exploit syntactic sugar
    this.emptyRow = [];
    for (let i = 0; i < this.boardWidth; ++i) this.emptyRow.push(-1);
  }

 
  setGameOverColor(color) { this.gameOverColor = [...color]; }
  setGhostColor(color) {this.ghostColor = [...color];}
  setPieceColor(piece, color) {
    switch (piece) {
      case PlayerInterface.Z_PIECE: this.zColor = [...color]; break;
      case PlayerInterface.S_PIECE: this.sColor = [...color]; break;
      case PlayerInterface.O_PIECE: this.oColor = [...color]; break;
      case PlayerInterface.L_PIECE: this.lColor = [...color]; break;
      case PlayerInterface.J_PIECE: this.jColor = [...color]; break;
      case PlayerInterface.T_PIECE: this.tColor = [...color]; break;
      case PlayerInterface.I_PIECE: this.iColor = [...color]; break;
    }
  }


  //--------------------------------------------------------------------------------------------
  // 
  // game rules: https://tetris.wiki/PlayerInterface_(NES,_Nintendo)
  // 
  //--------------------------------------------------------------------------------------------


  // line clear delay is an additional 17~20 frames depending on the frame that the piece locks; 
  // the animation has 5 steps that advance when the global frame counter modulo 4 equals 0. 
  // As a consequence, the first step of the line clear animation is not always a set number of frames
  _getLinesCleared() {
    const arr = [];
    for (let i = 0; i < this.boardHeight; ++i) {
      let b = true;
      for (let j = 0; b && j < this.boardWidth; ++j)
        if (this.board[i][j] === -1) b = false;
      if (b) arr.push(i);
    }
    return arr;
  }

  // set piece down on board (lock it)
  _setPiece() {
    const p = this.piece.rot[this.pieceRotation];
    for (let i = 0; i < p.length; ++i) {
      for (let j = 0; j < p[i].length; ++j) {
        if (p[i][j] != 0) {
          this.board[this.piecePosition[1] + i][this.piecePosition[0] + j] = this.piece.id;
        }
      }
    }
  }

  // can the piece move
  _canMovePiece(offsetX, offsetY) {
    return this._canMove(this.piece, this.pieceRotation, this.piecePosition, offsetX, offsetY);
  }
  _canMove(piece, pieceRot, piecePos, offsetX, offsetY) {
    const p = piece.rot[pieceRot];
    for (let i = 0; i < p.length; ++i) {
      for (let j = 0; j < p[i].length; ++j) {
        if (p[i][j] != 0) {
          const x = offsetX + piecePos[0] + j;
          const y = offsetY + piecePos[1] + i;
          if (x < 0 || x >= this.boardWidth || y >= this.boardHeight || this.board[y][x] != -1)
            return false;
        }
      }
    }
    return true;
  }

 
  //-----------------------------------------------------------
  // 
  // sleep function
  // 
  //-----------------------------------------------------------

  _sleep() { return new Promise(requestAnimationFrame); }



  //-----------------------------------------------------------
  // 
  // observer pattern
  // 
  //-----------------------------------------------------------

  // add an event handler
  on(event, handler) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.push(handler);
    }
  }

  // remove an event handler
  off(event, handler) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index != -1) handlers.splice(index, 1);
    }
  }

  // fire events
  _dispatch(event, data) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      for (const handler of handlers) {
        handler(data);
      }
    }
  }
}











