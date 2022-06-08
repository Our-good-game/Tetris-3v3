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
  constructor( {
    boardWidth = PlayerInterface.BOARD_WIDTH,
    boardHeight = PlayerInterface.BOARD_HEIGHT,
  } = {}) {
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

    // pointer game controls
    this.playing = false;       // ongoing game
    this.gameLoop = false
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
    this.result = false;

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
    this.gameState = PlayerInterface.STATE_GAME_OVER;
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
}











