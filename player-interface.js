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
  static ch = 'null';//檢查旋轉時撞牆問題
  
  // doard size in terms of squares
  // this is typically 10x20, but we are adding 2 invisible rows
  // at the top to have enough room to spawn all pieces
  static BOARD_WIDTH = 10;
  static BOARD_HEIGHT = 22;

  // constructor needs a canvas
  constructor(canvas, {
    boardWidth = PlayerInterface.BOARD_WIDTH,
    boardHeight = PlayerInterface.BOARD_HEIGHT,

    boardX = 915,
    boardY = 39,
    squareSide = 28,
    //+75
    timeX = 620,
    timeY = 60,
    scoreX = 1215,
    scoreY = 545,
    //levelX = 440,
    //levelY = 120,
    //linesX = 440,
    //linesY = 150,
    nextX = 810,
    nextY = 130,
    nextOffsetX = 800,
    nextOffsetY = 150,
    //add two next off set
    nextOffsetX2 = 800,
    nextOffsetY2 = 270,
    nextOffsetX3 = 800,
    nextOffsetY3 = 390,
    pauseX = 995,
    pauseY = 290,
    holdX = 1215,
    holdY = 130,
    //字體屬性
    canvasFont = '36px georgia',
    canvasFontColor = '#000',
    //方塊顏色
    zColor = ['#fe103c', '#f890a7'],
    sColor = ['#66fd00', '#c4fe93'],
    oColor = ['#ffde00', '#fff88a'],
    lColor = ['#ff7308', '#ffca9b'],
    jColor = ['#1801ff', '#5a95ff'],
    tColor = ['#b802fd', '#f591fe'],
    iColor = ['#00e6fe', '#86fefe'],

    gameOverColor = ['#fff', '#ddd'],
    ghostColor = ['#aaaaaa', '#fafafa'],//落下顏色


    backgroundColor = '#345',//背景
    tetrisBackgroundColor = '#000000',//
    borderColor = '#fff',//外框
    gridColor = '#ddd',//網線

    tapClickMaxDuration = 30000,
    tapClickMaxDistance = 1,

    rotateSound = undefined,
    moveSound = undefined,
    setSound = undefined,
    gameOverSound = undefined,
    lineSound = undefined,
    tetrisSound = undefined,
    levelChangeSound = undefined,
    pauseSound = undefined,
    gameTheme = undefined

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
    this.temp_sec = 0.017;
    this.timeX = timeX;
    this.timeY = timeY;
    this.scoreX = scoreX;             // score coords
    this.scoreY = scoreY;
    //this.levelX = levelX;             // level coords
    //this.levelY = levelY;
    //this.linesX = linesX;             // lines coords
    //this.linesY = linesY;
    this.nextX = nextX;               // next text coords
    this.nextY = nextY;
    this.nextOffsetX = nextOffsetX;   // next piece coords
    this.nextOffsetY = nextOffsetY;
    this.nextOffsetX2 = nextOffsetX2;
    this.nextOffsetY2 = nextOffsetY2;
    this.nextOffsetX3 = nextOffsetX3;
    this.nextOffsetY3 = nextOffsetY3;
    this.pauseX = pauseX;             // pause text coords
    this.pauseY = pauseY;
    this.holdX = holdX;
    this.holdY = holdY;

    // canvas font 
    this.canvasFont = canvasFont;
    this.canvasFontColor = canvasFontColor;

    // piece colors
    this.zColor = [...zColor];
    this.sColor = [...sColor];
    this.oColor = [...oColor];
    this.lColor = [...lColor];
    this.jColor = [...jColor];
    this.tColor = [...tColor];
    this.iColor = [...iColor];

    // game over tile colors
    this.gameOverColor = [...gameOverColor];
    this.ghostColor = [...ghostColor];

    this.backgroundColor = backgroundColor;
    this.tetrisBackgroundColor = tetrisBackgroundColor;
    this.borderColor = borderColor;
    this.gridColor = gridColor;

    // max time between pointerdown and pointerup for the game to count it as click
    this.tapClickMaxDuration = tapClickMaxDuration;   // grandpa's tap/click duration!
    // maximum distance between pointer-down and pointer-up coordinates 
    // for the game to count it as a click/tap
    this.tapClickMaxDistance = tapClickMaxDistance;

    // sounds
    this.rotateSound = rotateSound;             // rotation
    this.moveSound = moveSound;                 // move
    this.setSound = setSound;                   // piece lock
    this.gameOverSound = gameOverSound;         // game over
    this.lineSound = lineSound;                 // line burn
    this.tetrisSound = tetrisSound;             // tetris
    this.levelChangeSound = levelChangeSound;   // level increase
    this.pauseSound = pauseSound;               // game paused
    this.gameTheme = gameTheme;                 // theme song

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

    // movement/controls
    this.moveLeft = false;
    this.moveRight = false;
    this.moveDown = false;
    this.rotateClockwise = false;
    this.rotateAnticlockwise = false;
    this.hardDrop = true;
    this.doUndoPause = false;   // pause state changed
    this.hold = false;
    this.haveHold = false;

    // pointer coords
    this.xIni = undefined;
    this.yIni = undefined;
    this.tIni = undefined;

    // pointer game controls
    this.pointerMoveDownEnabled = false;  // flag to allow/disallow pointer to move piece down

    // game flags
    this.playing = false;       // ongoing game
    this.gameLoop = false;      // ongoing game loop (loop ends after game-over animation)

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

    // paint something for the user to see
    this._render();
  }

  //----------------------------------------------------------------------------------------
  // 
  // setters 
  // 
  //----------------------------------------------------------------------------------------

  // set the starting level
  // does nothing if playing
  setStartLevel(level) {
    if (this.gameState === PlayerInterface.STATE_GAME_OVER) {
      this.startLevel = Math.max(0, Math.min(19, level));  // between 0 and 19
    }
  }

  // set the border and fill colors for game-over squares
  setGameOverColor(color) {
    this.gameOverColor = [...color];
  }

  // set ghost piece colors
  setGhostColor(color) {
    this.ghostColor = [...color];
  }

  // set the border and fill colors for a piece
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


  //----------------------------------------------------------------------------------------
  // 
  // helper functions
  // 
  //----------------------------------------------------------------------------------------

  // frames before the piece drops 1 tile
  // depends on the level
  _getFramesPerGridcell(level) {
    if (level === 0) return 96;  //48;
    else if (level === 1) return 86;  //43;
    else if (level === 2) return 76;  //38;
    else if (level === 3) return 66;  //33;
    else if (level === 4) return 56;  //28;
    else if (level === 5) return 46;  //23;
    else if (level === 6) return 36;  //18;
    else if (level === 7) return 26;  //13;
    else if (level === 8) return 16;  //8;
    else if (level === 9) return 12;  //6;
    else if (level <= 12) return 10;  //5;
    else if (level <= 15) return 8;  //4;
    else if (level <= 18) return 6;  //3;
    else if (level <= 28) return 4;  //2;
    return 2;  //1;
  }


  //----------------------------------------------------------------------------------------
  // 
  // public functions
  // 
  //  - play
  // 
  //----------------------------------------------------------------------------------------

  // t = 60;

  togglePlayPause() {
    if (this.playing) {
      this.temp_sec = 0.017;
      this.doUndoPause = true;
    } else {
      this.play();
    }
  }

  quit() {
    if (this.playing && this.gameState != PlayerInterface.STATE_GAME_OVER) {
      this._triggerGameOver();
    }
  }



  // start new game
  async play() {
    this.temp_sec = 0.017;
    if (this.playing) return;
    this.playing = true;


    // disable UI
    // attach event listeners
    this._disableUI();
    this._addEventListeners();

    // reset params
    this._resetParams();

    // play theme song
    if (this.gameTheme) {
      this.gameTheme.currentTime = 0;
      this.gameTheme.loop = true;
      this.gameTheme.play();
    }

    // fire game start event
    this._dispatch(PlayerInterface.GAME_START, {
      type: PlayerInterface.GAME_START,
      level: this.level,
      score: this.score,
      lines: this.lines,
      time: this.time
    });

    // fire new piece placed event
    this._dispatch(PlayerInterface.NEXT_PIECE, {
      type: PlayerInterface.NEXT_PIECE,
      piece: this.piece.name,
      nextPiece: this.next[0].name
    });
    // game loop
    this.gameLoop = true;

    do {
      this._process();
      this._render();
      this.time -= this.temp_sec;
      await this._sleep();
      if (this.time <= 0.1) {
        this.quit();
      }
    } while (this.gameLoop);

    // remove event listeners
    // enable UI
    this._removeEventListeners();
    this._enableUI();

    // toggle playing flag
    this.playing = false;

    // fire game finish event
    this._dispatch(PlayerInterface.GAME_OVER, {
      type: PlayerInterface.GAME_OVER,
      level: this.level,
      score: this.score,
      lines: this.lines,
      time: this.time
    });
  }

  // get game params ready for a new game
  _resetParams() {
    //  pointer stuff
    this.pointerMoveDownEnabled = false;

    // movement/control flags
    this.moveLeft = false;
    this.moveRight = false;
    this.moveDown = false;
    this.rotateClockwise = false;
    this.rotateAnticlockwise = false;
    this.hardDrop = false;
    this.doUndoPause = false;
    this.hold = false;
    this.haveHold = false;
    this.queue = [0, 1, 2, 3, 4, 5, 6, -1, 0, 1, 2, 3, 4, 5, 6];
    //  pointer coords
    this.xIni = undefined;
    this.yIni = undefined;
    this.tIni = undefined;

    // select random pieces
    this._nextPieceId();
    this.piece = this.next[0];
    this._nextPieceId();
    // initial piece's position and rotation
    this.piecePosition = this.piece.iniPos.slice(0);
    this.pieceRotation = 0;

    // starting level, lines and score
    this.level = this.startLevel;
    this.lines = 0;
    this.score = 0;
    this.time = 60;
    this.pressDownScore = 0;

    // clear board
    for (let i = 0; i < this.boardHeight; ++i)
      for (let j = 0; j < this.boardWidth; ++j)
        this.board[i][j] = -1;

    // frame counters
    this.frameCounter = 0;
    this.areFrames = -1;
    this.framesTilDrop = -1;
    this.columnsCleared = -1;
    this.gameOverLine = -1;
    this.cheakwall = false;
    // frames until the piece automatically moves down
    this.framesTilDrop = 36 + this._getFramesPerGridcell(this.level);   // 18 + this._getFramesPerGridcell(this.level);

    // initial state
    this.previousGameState = PlayerInterface.STATE_DROP;
    this.gameState = PlayerInterface.STATE_DROP;
  }


  // add and remove event listeners
  _addEventListeners() {
    this.canvas.addEventListener('contextmenu', this._handleContextMenu, { capture: true, passive: false });
    document.addEventListener('pointerdown', this._handlePointerDown, { capture: true, passive: false });
    document.addEventListener('pointermove', this._handlePointerMove, { capture: true, passive: false });
    document.addEventListener('pointerup', this._handlePointerUp, { capture: true, passive: false });
    document.addEventListener('pointercancel', this._handlePointerCancel, { capture: true, passive: false });
    document.addEventListener('wheel', this._handleWheel, { capture: true, passive: false });
    document.addEventListener('keydown', this._handleKeyDown, { capture: true, passive: false });
  }

  _removeEventListeners() {
    this.canvas.removeEventListener('contextmenu', this._handleContextMenu, true);
    document.removeEventListener('pointerdown', this._handlePointerDown, true);
    document.removeEventListener('pointermove', this._handlePointerMove, true);
    document.removeEventListener('pointerup', this._handlePointerUp, true);
    document.removeEventListener('pointercancel', this._handlePointerCancel, true);
    document.removeEventListener('wheel', this._handleWheel, true);
    document.removeEventListener('keydown', this._handleKeyDown, true);
  }

  // disable/enable UI
  _disableUI() {
    this.canvas.style.touchAction = 'none';
  }

  _enableUI() {
    this.canvas.style.touchAction = 'auto';
  }


  //-----------------------------------------------------------
  // 
  // event handlers
  // 
  //-----------------------------------------------------------

  // context menu handler: don't open during game
  _handleContextMenu = event => {
    event.preventDefault();
  }


  //
  // default keyboard inputs:
  //
  // action                 key           key-code
  // ---------------------------------------------
  // left                   left arrow      37
  // left                   'a'             65
  // right                  right arrow     39
  // right                  'd'             68
  // rotate clockwise       up arrow        38
  // rotate clockwise       'k'             75
  // rotate clockwise       'w'             87
  // rotate clockwise       'x'             88
  // rotate anticlockwise   'l'             76 
  // rotate anticlockwise   'z'             90 
  // down                   down arrow      40
  // down                   's'             83
  // hard drop              space bar       32
  // pause                  esc             27
  // pause                  'p'             80
  // hold                  'shift'          16
  // key event listener
  _handleKeyDown = event => {
    
    switch (event.keyCode || event.which) { 
      case 37:
      case 65:
        // left
        event.preventDefault();
        this.moveRight = !(this.moveLeft = true);
        break;
      case 39:
      case 68:
        // right
        event.preventDefault();
        this.moveLeft = !(this.moveRight = true);
        break;
      case 38:
      case 75:
      case 87:
      case 88:
        // rotate clockwise
        event.preventDefault();
        this.rotateAnticlockwise = !(this.rotateClockwise = true);
        break;
      case 76:
      case 90:
        // rotate anticlockwise
        event.preventDefault();
        this.rotateClockwise = !(this.rotateAnticlockwise = true);
        break;
      case 40:
      case 83:
        // down
        event.preventDefault();
        this.moveDown = true;
        break;
      case 32:
        // hard drop
        event.preventDefault();
        this.hardDrop = true;
        break;  
      case 27:
      case 80:
        // pause
        event.preventDefault();
        if (this.gameState != PlayerInterface.STATE_GAME_OVER) {
          this.doUndoPause = true;
        }
        break;
      case 16:
        // hold piece
        if (this.haveHold) {
          if (this.hold) {
            var tempPiece = this.holdPiece;
            this.piecePosition = this.piece.iniPos.slice(0);
            this.pieceRotation = 0;
            this.holdPiece = this.piece;
            this.piece = tempPiece;
            this.hold = false;
          } else return;//can't hold
        } else {
          this.holdPiece = Object.assign({}, this.piece);
          this.piecePosition = this.piece.iniPos.slice(0);
          this.pieceRotation = 0;
          this.haveHold = true;
          this.hold = false;
          // get next piece
          this.piece = this.next[0];
          this.piecePosition = this.piece.iniPos.slice(0);
          this.pieceRotation = 0;
          this._nextPieceId();
        }
        event.preventDefault();
        break;
    }
  }


  //
  // pointer device inputs:
  //
  // action                 pointer moves
  // ------------------------------------------------------------------
  // left                   move the pointer to the left of the piece
  // right                  move the pointer to the right of the piece
  // down                   use the pointer drag the piece down
  // rotate clockwise       click / tap            
  //                        (left mouse button,       
  //                        touch contact, 
  //                        pen contact),
  //                        wheel up
  // rotate anticlockwise   click / tap 
  //                        (mouse wheel,
  //                        right mouse button, 
  //                        pen barrel button,
  //                        X1 (back) mouse,
  //                        X2 (forward) mouse,
  //                        pen eraser button),
  //                        wheel down

  // pointer move handler
  _handlePointerMove = event => {
    event.preventDefault();

    // no movement tracking during pause
    if (this.gameState === PlayerInterface.STATE_PAUSE) return;

    // find out if pointer is left or right or below the piece
    // then move piece accordingly
    const { x, y } = this._getEventCoords(event);

    // get pointer's row & column
    const row = ((y - this.boardY) / this.squareSide) | 0;
    const column = ((x - this.boardX) / this.squareSide) | 0;

    // get piece's bounds, calculate center column and row center 
    const { top, bottom, left, right } = this._getPieceBounds();
    const middleRow = ((top + bottom) / 2) | 0;
    const middleColumn = ((left + right) / 2) | 0;

    // enable pointer's ability to move down
    // if the pointer is on the piece or above
    if (row <= bottom) {
      this.pointerMoveDownEnabled = true;
    }

    // move left 
    if (column < middleColumn) {
      this.moveRight = !(this.moveLeft = true);
    }

    // move right
    if (column > middleColumn) {
      this.moveLeft = !(this.moveRight = true);
    }

    // move down
    if (this.pointerMoveDownEnabled && row > middleRow) {
      this.moveDown = true;
    }
  }


  // pointerdown handler
  _handlePointerDown = event => {
    //event.preventDefault();

    // do nothing during pause
    if (this.gameState === PlayerInterface.STATE_PAUSE) return;

    const { x, y } = this._getEventCoords(event);
    this.xIni = x;                  // store pointer coords
    this.yIni = y;
    this.tIni = performance.now();  // time since time origin
  }


  // touch gesture times, relevant in tap detection:
  // Fingertip forces and completion time for index finger and thumb touchscreen gestures.
  // https://www.ncbi.nlm.nih.gov/pubmed/28314216
  // "Tap was the fastest gesture to complete at 133(83)ms,   // Mean(±SD) times
  // followed by slide right at 421(181)ms. 
  // On average, participants took the longest to complete the stretch gesture at 920(398)ms."

  // pointer up handler
  _handlePointerUp = event => {
    event.preventDefault();

    // do nothing during pause
    if (this.gameState === PlayerInterface.STATE_PAUSE) return;

    const { x, y } = this._getEventCoords(event);
    const a = this.xIni - x;                  // calculate distance
    const b = this.yIni - y;                  // between tap-down and tap-up coordinates
    const dist = Math.sqrt(a * a + b * b);

    // detect tap/click:
    if (dist <= this.tapClickMaxDistance &&                           // similar coords
      performance.now() - this.tIni <= this.tapClickMaxDuration) {  // gesture was short

      if (event.button === 0) {
        // left mouse button, touch contact, pen contact
        // rotate piece clockwise
        this.rotateAnticlockwise = !(this.rotateClockwise = true);

      } else {
        // right button, mouse wheel...
        // rotate piece anticlockwise
        this.rotateClockwise = !(this.rotateAnticlockwise = true);

      }
    }
  }


  // pointer cancel
  _handlePointerCancel = event => {
    event.preventDefault();

    // reset pointer flags
    this.pointerMoveDownEnabled = false;
  }

  // wheel rotates the piece
  _handleWheel = event => {
    event.preventDefault();

    // do nothing during pause
    if (this.gameState === PlayerInterface.STATE_PAUSE) return;

    if (event.deltaY > 0) {
      // rotate piece clockwise
      this.rotateAnticlockwise = !(this.rotateClockwise = true);
    } else if (event.deltaY < 0) {
      // rotate piece anticlockwise
      this.rotateClockwise = !(this.rotateAnticlockwise = true);
    }
  }


  // pointer coordinates
  _getEventCoords(event) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  // get current piece's left and right bounds
  _getPieceBounds() {
    const p = this.piece.rot[this.pieceRotation];
    let top = this.boardHeight;
    let bottom = 0;
    let left = this.boardWidth;
    let right = 0;
    for (let i = 0; i < p.length; ++i) {
      for (let j = 0; j < p[i].length; ++j) {
        if (p[i][j] != 0) {
          const x = this.piecePosition[0] + j;
          const y = this.piecePosition[1] + i;
          left = Math.min(left, x);
          right = Math.max(right, x);
          top = Math.min(top, y);
          bottom = Math.max(bottom, y);
        }
      }
    }
    return {
      top: top,
      bottom: bottom,
      left: left,
      right: right
    };
  }


  //-----------------------------------------------------------
  // 
  // game logic
  // 
  //-----------------------------------------------------------

  _process() {

    // game possibly paused/unpaused
    this._pauseCheck();

    // process current state
    switch (this.gameState) {
      case PlayerInterface.STATE_DROP:
        this._processDrop();
        break;
      case PlayerInterface.STATE_BURN:
        this._processBurn();
        break;
      case PlayerInterface.STATE_ARE:
        this._processARE();
        break;
      case PlayerInterface.STATE_GAME_OVER:
        this._processGameOver();
        break;
      case PlayerInterface.STATE_PAUSE:
        this.temp_sec = 0;
        // do nothing if paused
        break;
    }
    // clear input flags
    this._resetInputs();

    // global frame counter
    ++this.frameCounter;
  }


  _processDrop() {
    // decrease drop counter
    --this.framesTilDrop;


    // do move if buffered
    if (this.moveLeft && this._canMovePiece(-1, 0)) {
      const oldPosition = [...this.piecePosition];
      --this.piecePosition[0];

      // play move sound
      if (this.moveSound) {
        this.moveSound.currentTime = 0;
        this.moveSound.play();
      }

      // fire move left event
      this._dispatch(PlayerInterface.PIECE_MOVE_LEFT, {
        type: PlayerInterface.PIECE_MOVE_LEFT,
        piece: this.piece.name,
        rotation: this.pieceRotation,
        oldPosition: oldPosition,
        newPosition: [...this.piecePosition]
      });

    }
    if (this.moveRight && this._canMovePiece(1, 0)) {
      const oldPosition = [...this.piecePosition];
      ++this.piecePosition[0];

      // play move sound
      if (this.moveSound) {
        this.moveSound.currentTime = 0;
        this.moveSound.play();
      }

      // fire move right event
      this._dispatch(PlayerInterface.PIECE_MOVE_RIGHT, {
        type: PlayerInterface.PIECE_MOVE_RIGHT,
        piece: this.piece.name,
        rotation: this.pieceRotation,
        oldPosition: oldPosition,
        newPosition: [...this.piecePosition]
      });

    }
    if (this.rotateClockwise) {
      if (this._canRot((this.pieceRotation + 1) % this.piece.rot.length)) {
        const oldRotation = this.pieceRotation;
        this.pieceRotation = (this.pieceRotation + 1) % this.piece.rot.length;

        // play rotation sound
        if (this.rotateSound) {
          this.rotateSound.currentTime = 0;
          this.rotateSound.play();
        }

        // fire clockwise rotation event
        this._dispatch(PlayerInterface.PIECE_ROTATE_CLOCKWISE, {
          type: PlayerInterface.PIECE_ROTATE_CLOCKWISE,
          piece: this.piece.name,
          position: [...this.piecePosition],
          oldRotation: oldRotation,
          newRotation: this.pieceRotation
        });
      } else if (this.cheakwall) {
        if (this.piece.id < 6 &&
          this._canMove(this.piece, (this.pieceRotation + 1) % this.piece.rot.length, this.piecePosition, 1, 0)) {
          ++this.piecePosition[0];
        } else if (this.piece.id == 6 &&
          this._canMove(this.piece, (this.pieceRotation + 1) % this.piece.rot.length, this.piecePosition, 2, 0)) {
          this.piecePosition[0] = this.piecePosition[0] + 2;
        } else if (this._canMove(this.piece, (this.pieceRotation + 1) % this.piece.rot.length, this.piecePosition, -1, 0)) {
          --this.piecePosition[0];
        } else return;
        const oldRotation = this.pieceRotation;
        this.pieceRotation = (this.pieceRotation + 1) % this.piece.rot.length;
        // play rotation sound
        if (this.rotateSound) {
          this.rotateSound.currentTime = 0;
          this.rotateSound.play();
        }
        // fire clockwise rotation event
        this._dispatch(PlayerInterface.PIECE_ROTATE_CLOCKWISE, {
          type: PlayerInterface.PIECE_ROTATE_CLOCKWISE,
          piece: this.piece.name,
          position: [...this.piecePosition],
          oldRotation: oldRotation,
          newRotation: this.pieceRotation
        });
      }
    }

    if (this.rotateAnticlockwise) {
      if (this._canRot((this.pieceRotation + this.piece.rot.length - 1) % this.piece.rot.length)) {
        const oldRotation = this.pieceRotation;
        this.pieceRotation = (this.pieceRotation + this.piece.rot.length - 1) % this.piece.rot.length;

        // play rotation sound
        if (this.rotateSound) {
          this.rotateSound.currentTime = 0;
          this.rotateSound.play();
        }

        // fire clockwise rotation event
        this._dispatch(PlayerInterface.PIECE_ROTATE_CLOCKWISE, {
          type: PlayerInterface.PIECE_ROTATE_CLOCKWISE,
          piece: this.piece.name,
          position: [...this.piecePosition],
          oldRotation: oldRotation,
          newRotation: this.pieceRotation
        });
      } else if (this.cheakwall) {
        if (this.piece.id < 6 &&
          this._canMove(this.piece, (this.pieceRotation + this.piece.rot.length - 1) % this.piece.rot.length, this.piecePosition, 1, 0)) {
          ++this.piecePosition[0];
        } else if (this.piece.id == 6 &&
          this._canMove(this.piece, (this.pieceRotation + this.piece.rot.length - 1) % this.piece.rot.length, this.piecePosition, 2, 0)) {
          this.piecePosition[0] = this.piecePosition[0] + 2;
        } else if (this._canMove(this.piece, (this.pieceRotation + this.piece.rot.length - 1) % this.piece.rot.length, this.piecePosition, -1, 0)) {
          --this.piecePosition[0];
        } else return;
        const oldRotation = this.pieceRotation;
        this.pieceRotation = (this.pieceRotation + this.piece.rot.length - 1) % this.piece.rot.length;
        // play rotation sound
        if (this.rotateSound) {
          this.rotateSound.currentTime = 0;
          this.rotateSound.play();
        }
        // fire clockwise rotation event
        this._dispatch(PlayerInterface.PIECE_ROTATE_CLOCKWISE, {
          type: PlayerInterface.PIECE_ROTATE_CLOCKWISE,
          piece: this.piece.name,
          position: [...this.piecePosition],
          oldRotation: oldRotation,
          newRotation: this.pieceRotation
        });
      }

    }

    // hard drop or move down
    // move down: if drop counter says so
    //            or player pushed down
    if (this.hardDrop) {

      // hard drop = push piece as far down as possible
      // score increase is 2x the numer of dropped lines
      const oldPosition = [...this.piecePosition];
      while (this._canMovePiece(0, 1)) {
        ++this.piecePosition[1];
        this.pressDownScore += 2;
      }

      // fire hard drop event
      this._dispatch(PlayerInterface.PIECE_HARD_DROP, {
        type: PlayerInterface.PIECE_HARD_DROP,
        piece: this.piece.name,
        rotation: this.pieceRotation,
        oldPosition: oldPosition,
        newPosition: [...this.piecePosition]
      });

      // do piece lock
      this._lockPiece();

    } else if (this.moveDown || this.framesTilDrop === 0) {
      if (this._canMovePiece(0, 1)) {

        if (this.moveDown) {
          // soft drop makes 1 point per dropped line
          ++this.pressDownScore;
        }
        const oldPosition = [...this.piecePosition];
        ++this.piecePosition[1];

        // reset auto-drop frames
        this.framesTilDrop = this._getFramesPerGridcell(this.level);

        // fire move down event
        this._dispatch(PlayerInterface.PIECE_MOVE_DOWN, {
          type: PlayerInterface.PIECE_MOVE_DOWN,
          piece: this.piece.name,
          rotation: this.pieceRotation,
          oldPosition: oldPosition,
          newPosition: [...this.piecePosition],
          downPressed: this.moveDown
        });

      } else {
        // lock piece if it couldn't move down
        this._lockPiece();
      }
    }
  }

  _lockPiece() {
    this.framesTilDrop = -1;
    this._setPiece();

    // fire piece lock event
    this._dispatch(PlayerInterface.PIECE_LOCK, {
      type: PlayerInterface.PIECE_LOCK,
      piece: this.piece.name,
      rotation: this.pieceRotation,
      position: [...this.piecePosition]
    });

    this.linesCleared = this._getLinesCleared();
    if (this.linesCleared.length > 0) {

      // clear those lines
      this.columnsCleared = 0;
      this.gameState = PlayerInterface.STATE_BURN;

      // remove initial columns of squares for animation
      const mid = this.boardWidth / 2;
      for (let i = 0; i < this.linesCleared.length; ++i) {
        this.board[this.linesCleared[i]][mid + this.columnsCleared] = -1;
        this.board[this.linesCleared[i]][mid - 1 - this.columnsCleared] = -1;
      }

      // play corresponding lines clear sound
      const sound = this.linesCleared.length === 4 ? this.tetrisSound : this.lineSound;
      if (sound) {
        sound.currentTime = 0;
        sound.play();
      }

      // fire burn start event
      this._dispatch(PlayerInterface.LINE_CLEAR_START, {
        type: PlayerInterface.LINE_CLEAR_START,
        linesBurnt: [...this.linesCleared]
      });

    } else {

      // play piece lock sound
      if (this.setSound) {
        this.setSound.currentTime = 0;
        this.setSound.play();
      }

      // update score
      const oldScore = this.score;
      this.score += this.pressDownScore;

      // fire score change event
      this._dispatch(PlayerInterface.SCORE_CHANGE, {
        type: PlayerInterface.SCORE_CHANGE,
        oldScore: oldScore,
        newScore: this.score
      });

      // entry delay for next piece
      this.areFrames = this._getARE();
      this.gameState = PlayerInterface.STATE_ARE;
    }
  }

  _processBurn() {
    if ((this.frameCounter % 8) === 0) {  //4) === 0) {
      ++this.columnsCleared;
      if (this.columnsCleared < 5) {
        // remove another columns of squares
        const mid = this.boardWidth / 2;
        for (let i = 0; i < this.linesCleared.length; ++i) {
          this.board[this.linesCleared[i]][mid + this.columnsCleared] = -1;
          this.board[this.linesCleared[i]][mid - 1 - this.columnsCleared] = -1;
        }

      } else {
        this.columnsCleared = -1;

        // clean board up
        for (let i = this.linesCleared.length - 1; i >= 0; --i) {
          this.board.splice(this.linesCleared[i], 1);
        }
        while (this.board.length < this.boardHeight) {
          this.board.unshift([...this.emptyRow]);
        }

        // add score and lines
        const oldScore = this.score;
        const oldLines = this.lines;
        this.score += this.pressDownScore + this._getLinesScore(this.linesCleared.length, this.level);
        this.lines += this.linesCleared.length;

        // fire lines burn end event
        this._dispatch(PlayerInterface.LINE_CLEAR_END, {
          type: PlayerInterface.LINE_CLEAR_END,
          linesBurnt: [...this.linesCleared]
        });

        // fire lines clear event
        this._dispatch(PlayerInterface.LINE_CLEAR, {
          type: PlayerInterface.LINE_CLEAR,
          oldLines: oldLines,
          newLines: this.lines
        });

        // fire score change event
        this._dispatch(PlayerInterface.SCORE_CHANGE, {
          type: PlayerInterface.SCORE_CHANGE,
          oldScore: oldScore,
          newScore: this.score
        });

        // increase level?
        const levelTemp = this._getLevel();
        if (this.level != levelTemp) {
          const oldLevel = this.level;
          this.level = levelTemp;

          // play level change sound
          if (this.levelChangeSound) {
            this.levelChangeSound.currentTime = 0;
            this.levelChangeSound.play();
          }

          // fire level change event
          this._dispatch(PlayerInterface.LEVEL_CHANGE, {
            type: PlayerInterface.LEVEL_CHANGE,
            oldLevel: oldLevel,
            newLevel: this.level
          });

        }

        // entry delay for next piece
        this.areFrames = this._getARE();
        this.gameState = PlayerInterface.STATE_ARE;
      }
    }

  }

  _processARE() {
    // wait are frames
    --this.areFrames;
    // 調整為can hold
    this.hold = true;
    if (this.areFrames === 0) {
      this.areFrames = -1;

      // reset drop points
      this.pressDownScore = 0;
      this.pointerMoveDownEnabled = false;

      // get next piece
      this.piece = this.next[0];
      this.piecePosition = this.piece.iniPos.slice(0);
      this.pieceRotation = 0;
      this._nextPieceId();

      // try to place current piece
      if (this._canMovePiece(0, 0)) {
        this.framesTilDrop = this._getFramesPerGridcell(this.level);
        this.gameState = PlayerInterface.STATE_DROP;

        // fire new piece placed event
        this._dispatch(PlayerInterface.NEXT_PIECE, {
          type: PlayerInterface.NEXT_PIECE,
          piece: this.piece.name,
          nextPiece: this.next[0].name
        });

      } else {
        // can't place piece -it's game over
        this._setPiece();
        this._triggerGameOver();
      }
    }
  }

  _triggerGameOver() {
    // stop theme song
    if (this.gameTheme) {
      this.gameTheme.pause();
    }

    // play game over sound
    if (this.gameOverSound) {
      this.gameOverSound.currentTime = 0;
      this.gameOverSound.play();
    }

    this.gameOverLine = 1;
    this.gameState = PlayerInterface.STATE_GAME_OVER;

    // fire game-over animation start event
    this._dispatch(PlayerInterface.GAME_OVER_START, {
      type: PlayerInterface.GAME_OVER_START,
      level: this.level,
      score: this.score,
      lines: this.lines,
      time: this.time
    });
  }

  _processGameOver() {
    this.temp_sec = 0;
    if ((this.frameCounter % 8) === 0) {  //4) === 0) {
      ++this.gameOverLine;
      if (this.gameOverLine < this.boardHeight) {
        // paint next row
        for (let i = 0; i < this.boardWidth; ++i) this.board[this.gameOverLine][i] = 7;

      } else {
        // game-over animation is done -stop the game loop
        this.gameLoop = false;

        // fire game-over animation end event
        this._dispatch(PlayerInterface.GAME_OVER_END, {
          type: PlayerInterface.GAME_OVER_END,
          level: this.level,
          score: this.score,
          lines: this.lines,
          time: this.time
        });
      }
    }
  }

  // pause or unpause if requested
  _pauseCheck() {
    if (this.doUndoPause) {
      // this.time = 60;
      if (this.gameState === PlayerInterface.STATE_PAUSE) {
        this.gameState = this.previousGameState;

        // reset pointer flags
        this.pointerMoveDownEnabled = false;

        // resume theme song
        if (this.gameTheme) {
          this.gameTheme.play();
        }

        // fire resume event
        this._dispatch(PlayerInterface.GAME_RESUME, {
          type: PlayerInterface.GAME_RESUME,
          level: this.level,
          score: this.score,
          lines: this.lines,
          time: this.time
        });

      } else {
        this.previousGameState = this.gameState;
        this.gameState = PlayerInterface.STATE_PAUSE;

        // pause theme song
        if (this.gameTheme) {
          this.gameTheme.pause();
        }

        // play pause sound
        if (this.pauseSound) {
          this.pauseSound.currentTime = 0;
          this.pauseSound.play();
        }

        // fire pause event
        this._dispatch(PlayerInterface.GAME_PAUSE, {
          type: PlayerInterface.GAME_PAUSE,
          level: this.level,
          score: this.score,
          lines: this.lines,
          time: this.time
        });

      }
    }
  }

  // get them inputs ready for the next iteration
  _resetInputs() {
    this.moveLeft = false;
    this.moveRight = false;
    this.moveDown = false;
    this.rotateClockwise = false;
    this.rotateAnticlockwise = false;
    this.hardDrop = false;
    this.doUndoPause = false;
  }


  //--------------------------------------------------------------------------------------------
  // 
  // game rules: https://tetris.wiki/PlayerInterface_(NES,_Nintendo)
  // 
  //--------------------------------------------------------------------------------------------

  _nextPieceId() {
    if (this.queue[7] == -1) {
      for (let i = 0; i < 7; ++i) {
        let pos = Math.floor(Math.random() * 7);
        let temp = this.queue[pos];
        this.queue[pos] = this.queue[i];
        this.queue[i] = temp;
      } this.queue[7] = 7;
      for (let i = 0; i < 7; ++i) {
        let pos = Math.floor(Math.random() * 7) + 8;
        let temp = this.queue[pos];
        this.queue[pos] = this.queue[i + 8];
        this.queue[i + 8] = temp;
      }
    }
    if (this.queue[0] == 7) {
      for (let i = 0; i < 7; ++i) {
        this.queue[i] = this.queue[i + 1];
      } this.queue[7] = 7;
      for (let i = 0; i < 7; ++i) {
        let pos = Math.floor(Math.random() * 7) + 8;
        let temp = this.queue[pos];
        this.queue[pos] = this.queue[i + 8];
        this.queue[i + 8] = temp;
      }
    }
    let temp = this.queue[0];
    for (let i = 0; i < 14; ++i) {
      this.queue[i] = this.queue[i + 1];
    } this.queue[14] = temp;
    let i = 0;
    for (let p = 0; p < 3; ++p) {
      if (this.queue[i] == 7) ++i;
      this.next[p] = this.pieces[this.queue[i]];
      ++i;
    }

  }

  // score for lines cleared
  // depends on the level and # of lines cleared
  _getLinesScore(lines, lvl) {
    if (lines === 1) return 40 * (lvl + 1);
    else if (lines === 2) return 100 * (lvl + 1);
    else if (lines === 3) return 300 * (lvl + 1);
    return 1200 * (lvl + 1);    // tetris!
  }
  // ARE is 10~18 frames depending on the height at which the piece locked; 
  // pieces that lock in the bottom two rows are followed by 10 frames of entry delay, 
  // and each group of 4 rows above that has an entry delay 2 frames longer than the last
  _getARE() {
    const h = this._getLockHeight();
    const are = 10 + (((h + 2) / 4) | 0) * 2;
    return are * 2;   //return are;
  }

  // height at which the piece locked
  _getLockHeight() {
    let h = 0;
    const p = this.piece.rot[this.pieceRotation];
    for (let i = 0; i < p.length; ++i) {
      for (let j = 0; j < p[i].length; ++j) {
        if (p[i][j] != 0)
          h = Math.max(h, this.piecePosition[1] + i);
      }
    }
    return this.boardHeight - 1 - h;
  }

  // when the player clears (startLevel × 10 + 10) or max(100, (startLevel × 10 - 50)) lines, 
  // whatever comes first, the level advances by 1. After this, the level advances by 1 for every 10 lines.
  _getLevel() {
    const a = this.lines - Math.min(this.startLevel * 10 + 10, Math.max(100, this.startLevel * 10 - 50));
    return this.startLevel + (a >= 0 ? ((a / 10) | 0) + 1 : 0);
  }

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

  // can the piece rotate
  _canRot(rotation) {
    const p = this.piece.rot[rotation];
    for (let i = 0; i < p.length; ++i) {
      for (let j = 0; j < p[i].length; ++j) {
        if (p[i][j] != 0) {
          const x = this.piecePosition[0] + j;
          const y = this.piecePosition[1] + i;
          if (x < 0 || x >= this.boardWidth || this.board[y][x] != -1) {
            this.cheakwall = true;
            return false;
          }
          if (y >= this.boardHeight) {
            this.cheakwall = false;
            return false;
          }
        }
      }
    }
    return true;
  }


  //-----------------------------------------------------------
  // 
  // render
  // 
  //-----------------------------------------------------------

  _render() {
    this._drawBackground();
    this._drawBoard();
    this._drawGhost();
    this._drawPiece();
    this._drawHUD();
    this._drawNext();
    this._drawNext2();
    this._drawNext3();
    if (this.haveHold) {
      this._drawHold();
    }
  }

  _drawBackground() {
    // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.lineWidth = 1;

    // if burning a tetris, make background color flash
    const fillColor = this.gameState === PlayerInterface.STATE_BURN &&
      this.linesCleared.length === 4 &&
      this.frameCounter % 8 ?   //4 ?
      this.tetrisBackgroundColor :
      this.backgroundColor;

    // draw background and border
    this.context.beginPath();
    this.context.moveTo(this.boardBorder[0], this.boardBorder[1]);
    this.context.lineTo(this.boardBorder[2], this.boardBorder[1]);
    this.context.lineTo(this.boardBorder[2], this.boardBorder[3]);
    this.context.lineTo(this.boardBorder[0], this.boardBorder[3]);
    this.context.closePath();
    this.context.fillStyle = fillColor;
    this.context.strokeStyle = this.borderColor;
    this.context.fill();
    this.context.stroke();


    if (this.gameState === PlayerInterface.STATE_PAUSE) {
      // pause overlay:
      // write PAUSE on the board if game is paused
      this.context.font = this.canvasFont;
      this.context.fillStyle = this.canvasFontColor;
      this.context.fillText('PAUSE', this.pauseX, this.pauseY);

    } else {
      // draw grid if not paused
      this.context.lineWidth = 0.5;

      // horizontal lines
      this.context.strokeStyle = this.gridColor;
      const boardRight = this.boardX + this.squareSide * this.boardWidth;
      for (let i = 3; i < this.boardHeight; ++i) {
        const height = this.boardY + i * this.squareSide;
        this.context.beginPath();
        this.context.moveTo(this.boardX, height);
        this.context.lineTo(boardRight, height);
        this.context.closePath();
        this.context.stroke();
      }
      // vertical lines
      const boardTop = this.boardY + 2 * this.squareSide;
      const boardBottom = this.boardY + this.boardHeight * this.squareSide;
      for (let j = 0; j < this.boardWidth; ++j) {
        const width = this.boardX + j * this.squareSide;
        this.context.beginPath();
        this.context.moveTo(width, boardTop);
        this.context.lineTo(width, boardBottom);
        this.context.closePath();
        this.context.stroke();
      }

      // back to regular line width
      this.context.lineWidth = 1;
    }
  }

  _drawBoard() {
    if (!(this.gameState === PlayerInterface.STATE_PAUSE)) {
      // draw the game board if the game is not paused
      for (let i = 2; i < this.boardHeight; ++i) {
        for (let j = 0; j < this.boardWidth; ++j) {
          if (this.board[i][j] != -1) {
            const col = this.board[i][j] == 7 ?
              this.gameOverColor :
              this.pieces[this.board[i][j]].col;
            this._drawSquare(
              this.boardX + j * this.squareSide,
              this.boardY + i * this.squareSide,
              col[0], col[1]);
          }
        }
      }
    }
  }

  // draw current piece
  _drawPiece() {
    if (this.gameState === PlayerInterface.STATE_DROP) {
      // current piece is only drawn in drop state
      const p = this.piece.rot[this.pieceRotation];
      for (let i = 0; i < p.length; ++i) {
        for (let j = 0; j < p[i].length; ++j) {
          if (p[i][j] != 0 && this.piecePosition[1] + i > 1) {
            this._drawSquare(
              this.boardX + (this.piecePosition[0] + j) * this.squareSide,
              this.boardY + (this.piecePosition[1] + i) * this.squareSide,
              this.piece.col[0], this.piece.col[1]);
          }
        }
      }
    }
  }

  // draw ghost piece
  // it is a representation of where a tetromino or other piece will land if allowed to drop into the playfield
  _drawGhost() {
    if (this.gameState === PlayerInterface.STATE_DROP) {

      // find ghost piece position, which is lowest position for current piece
      const piecePos = [this.piecePosition[0], this.piecePosition[1]];
      while (this._canMove(this.piece, this.pieceRotation, piecePos, 0, 1)) {
        ++piecePos[1];
      }

      // draw ghost piece
      const p = this.piece.rot[this.pieceRotation];
      for (let i = 0; i < p.length; ++i) {
        for (let j = 0; j < p[i].length; ++j) {
          if (p[i][j] != 0 && piecePos[1] + i > 1) {
            this._drawSquare(
              this.boardX + (piecePos[0] + j) * this.squareSide,
              this.boardY + (piecePos[1] + i) * this.squareSide,
              this.ghostColor[0], this.ghostColor[1]);
          }
        }
      }
    }
  }

  // draw heads-up display
  _drawHUD() {
    let timesStr = 'Time:    ';
    let scoreStr = 'Score:   ';
    let levelStr = 'Level:   ';
    let linesStr = 'Lines:   ';
    let nextStr = 'Next';
    let holdStr = 'Hold';
    // if (this.gameState != PlayerInterface.STATE_PAUSE) {
    // show data only if game is not paused
    let tmp_time = this.time;
    tmp_time = parseInt(tmp_time);
    // scoreStr += this.score;
    levelStr += this.level;
    linesStr += this.lines;
    timesStr += tmp_time;
    //}

    this.context.font = this.canvasFont;
    this.context.fillStyle = this.canvasFontColor;
    this.context.fillText(timesStr, this.timeX, this.timeY);
    this.context.fillText(scoreStr, this.scoreX, this.scoreY);
    this.context.fillText(this.score, this.scoreX, this.scoreY + 50);
    //this.context.fillText(levelStr, this.levelX, this.levelY);
    //this.context.fillText(linesStr, this.linesX, this.linesY);
    this.context.fillText(nextStr, this.nextX, this.nextY);
    this.context.fillText(holdStr, this.holdX, this.holdY);
  }

  // draw next piece
  _drawNext() {
    if (this.gameState === ClassicTetris.STATE_PAUSE ||
      this.gameState === ClassicTetris.STATE_GAME_OVER) return;

    const p = this.next[0].rot[0];
    const b = this.next[0].box;
    for (let i = b[0]; i < b[0] + b[2]; ++i) {
      for (let j = b[1]; j < b[1] + b[3]; ++j) {
        if (p[i][j] != 0) {
          this._drawSquare(
            this.nextOffsetX + (j - b[1]) * this.squareSide,
            this.nextOffsetY + (i - b[0]) * this.squareSide,
            this.next[0].col[0], this.next[0].col[1]);
        }
      }
    }
  }
  _drawNext2() {
    if (this.gameState === ClassicTetris.STATE_PAUSE ||
      this.gameState === ClassicTetris.STATE_GAME_OVER) return;

    const p = this.next[1].rot[0];
    const b = this.next[1].box;
    for (let i = b[0]; i < b[0] + b[2]; ++i) {
      for (let j = b[1]; j < b[1] + b[3]; ++j) {
        if (p[i][j] != 0) {
          this._drawSquare(
            this.nextOffsetX2 + (j - b[1]) * this.squareSide,
            this.nextOffsetY2 + (i - b[0]) * this.squareSide,
            this.next[1].col[0], this.next[1].col[1]);
        }
      }
    }
  }
  _drawNext3() {
    if (this.gameState === ClassicTetris.STATE_PAUSE ||
      this.gameState === ClassicTetris.STATE_GAME_OVER) return;

    const p = this.next[2].rot[0];
    const b = this.next[2].box;
    for (let i = b[0]; i < b[0] + b[2]; ++i) {
      for (let j = b[1]; j < b[1] + b[3]; ++j) {
        if (p[i][j] != 0) {
          this._drawSquare(
            this.nextOffsetX3 + (j - b[1]) * this.squareSide,
            this.nextOffsetY3 + (i - b[0]) * this.squareSide,
            this.next[2].col[0], this.next[2].col[1]);
        }
      }
    }
  }

  // draw an individual square on the board
  _drawSquare(x, y, color, border) {
    this.context.beginPath();
    this.context.moveTo(x + 1, y + 1);
    this.context.lineTo(x + this.squareSide - 1, y + 1);
    this.context.lineTo(x + this.squareSide - 1, y + this.squareSide - 1);
    this.context.lineTo(x + 1, y + this.squareSide - 1);
    this.context.closePath();
    this.context.fillStyle = color;
    this.context.strokeStyle = border;
    this.context.fill();
    this.context.stroke();
  }

  _drawHold() {

    if (this.gameState === ClassicTetris.STATE_PAUSE ||
      this.gameState === ClassicTetris.STATE_GAME_OVER) return;

    const p = this.holdPiece.rot[0];
    const b = this.holdPiece.box;
    for (let i = b[0]; i < b[0] + b[2]; ++i) {
      for (let j = b[1]; j < b[1] + b[3]; ++j) {
        if (p[i][j] != 0) {
          this._drawSquare(
            this.holdX + (j - b[1]) * this.squareSide,
            this.holdY + (i - b[0]) * this.squareSide + 30,
            this.holdPiece.col[0], this.holdPiece.col[1]);
        }
      }
    }
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










