'use strict';


//-------------------------------------------------------------------------
// 
// ClassicTetris class
// 
//-------------------------------------------------------------------------
class ClassicTetris {


  //-----------------------------------------------------------------------
  // 
  // piece rotations
  // 
  //-----------------------------------------------------------------------
  static Z_ROT = [
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0]
    ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1]
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0]
    ],
  ];

  static S_ROT = [
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 1],
      [0, 0, 1]
    ],
    [
      [0, 0, 0],
      [0, 1, 1],
      [1, 1, 0]
    ],
    [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0]
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
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 1]
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [1, 0, 0]
    ],
    [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0]
    ]
  ];

  static J_ROT = [
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0]
    ],
    [
      [0, 1, 1],
      [0, 1, 0],
      [0, 1, 0]
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 1]
    ],
    [
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 0]
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
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0]
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0]
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0]
    ]
  ];


  // initial positions
  static Z_INI_POS = [3, 1];
  static S_INI_POS = [3, 1];
  static O_INI_POS = [4, 1];
  static L_INI_POS = [3, 1];
  static J_INI_POS = [3, 1];
  static T_INI_POS = [3, 1];
  static I_INI_POS = [3, 1];

  static Z_BOX = [0, 0, 2, 3]; // x y hei wid
  static S_BOX = [0, 0, 2, 3];
  static O_BOX = [0, 0, 2, 2];
  static L_BOX = [0, 0, 2, 3];
  static J_BOX = [0, 0, 2, 3];
  static T_BOX = [0, 0, 2, 3];
  static I_BOX = [1, 0, 1, 4];


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

  // board size in terms of squares
  // this is typically 10x20, but we are adding 2 invisible rows
  // at the top to have enough room to spawn all pieces
  static BOARD_WIDTH = 10;
  static BOARD_HEIGHT = 22;

  // constructor needs a canvas
  constructor(canvas, size, {
    boardWidth = ClassicTetris.BOARD_WIDTH,
    boardHeight = ClassicTetris.BOARD_HEIGHT,
    paintposA=0,
    paintposB=0,
    paintposC=canvas.width,
    paintposD=canvas.height,
    boardX = canvas.width * 0.25,
    boardY = canvas.height * 0,
    // squareSide = Math.sqrt (canvas.height * canvas.width * 0.3 / 200),
    squareSide = window.innerWidth * 0.022 * size,
    scoreX = boardX + squareSide * 10.5,
    scoreY = boardY + squareSide * 18,
    nextX = boardX + squareSide * 10.5,
    nextY = boardY + squareSide * 3,
    nextOffsetX = boardX + squareSide * 10.5,
    nextOffsetY = nextY + squareSide * 0.5,
    nextOffsetvec = squareSide * 3,
    pauseX = boardX + squareSide * 3,
    pauseY = boardY + squareSide * 12,
    holdX = boardX - squareSide * 4,
    holdY = boardY + squareSide * 3,
    comboX = boardX - squareSide * 5,
    comboY = boardX + squareSide * 12,
    nameX = boardX + 3 * squareSide,
    nameY = boardY + squareSide,
    
    playerName = '',

    tapClickMaxDuration = 30000,
    tapClickMaxDistance = 1,

    rotateSound = undefined,
    moveSound = undefined,
    setSound = new Audio ("audio/hard_drop.wav"),
    gameOverSound = undefined,
    lineSound = new Audio ("audio/line.mp3"),
    tetrisSound = new Audio ("audio/tetris.mp3"),
    levelChangeSound = undefined,
    pauseSound = undefined,
    takingItemSound = new Audio ("audio/item_taking.wav"),
    takeEndItemSound = new Audio ("audio/item_takeEnd.wav"),
    gameTheme = new Audio ("audio/gameTheme.mp3")

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
    // canvaes paint
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
    
    // player information
    this.playerName = playerName;

    // HUD stuff coordinates
    this.scoreX = scoreX;             // score coords
    this.scoreY = scoreY;
    this.nextX = nextX;               // next text coords
    this.nextY = nextY;
    this.nextOffsetX = nextOffsetX;   // next piece coords
    this.nextOffsetY = nextOffsetY;
    this.nextOffsetvec = nextOffsetvec;
    this.pauseX = pauseX;             // pause text coords
    this.pauseY = pauseY;
    this.holdX = holdX;
    this.holdY = holdY;
    this.comboX = comboX;
    this.comboY = comboY;
    this.nameX = nameX;
    this.nameY = nameY;


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
    this.takingItemSound = takingItemSound;     // taking item
    this.takeEndItemSound = takeEndItemSound;   // take end item
    this.gameTheme = gameTheme;                 // theme song

     // sounds set
     this.takingItemSound.volume = 0.3;
     this.takingEndItemSound = 1.0;
     this.gameTheme.volume = 0.1;
     this.setSound.volume = 0.3;

    // pieces
    this.pieces = [
      {
        id: 0,
        name: ClassicTetris.Z_PIECE,
        rot: ClassicTetris.Z_ROT,
        iniPos: ClassicTetris.Z_INI_POS,
        box: ClassicTetris.Z_BOX
      },
      {
        id: 1,
        name: ClassicTetris.S_PIECE,
        rot: ClassicTetris.S_ROT,
        iniPos: ClassicTetris.S_INI_POS,
        box: ClassicTetris.S_BOX
      },
      {
        id: 2,
        name: ClassicTetris.O_PIECE,
        rot: ClassicTetris.O_ROT,
        iniPos: ClassicTetris.O_INI_POS,
        box: ClassicTetris.O_BOX
      },
      {
        id: 3,
        name: ClassicTetris.L_PIECE,
        rot: ClassicTetris.L_ROT,
        iniPos: ClassicTetris.L_INI_POS,
        box: ClassicTetris.L_BOX
      },
      {
        id: 4,
        name: ClassicTetris.J_PIECE,
        rot: ClassicTetris.J_ROT,
        iniPos: ClassicTetris.J_INI_POS,
        box: ClassicTetris.J_BOX
      },
      {
        id: 5,
        name: ClassicTetris.T_PIECE,
        rot: ClassicTetris.T_ROT,
        iniPos: ClassicTetris.T_INI_POS,
        box: ClassicTetris.T_BOX
      },
      {
        id: 6,
        name: ClassicTetris.I_PIECE,
        rot: ClassicTetris.I_ROT,
        iniPos: ClassicTetris.I_INI_POS,
        box: ClassicTetris.I_BOX
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
    

    // items && socre
    this.items=[
      {id: 0, name: 'LockSpace',       url:"picture/Item/SpaceChain.png"},
      {id: 1, name: 'Defense',         url:'picture/Item/defense.png'},
      {id: 2, name: 'HardHoldOn',      url:"picture/Item/CompulsoryHold.png"},
      {id: 3, name: 'LeftRightChange', url:"picture/Item/MoveChange.png"},
      {id: 4, name: 'BlockPreview',    url:"picture/Item/shadow.png"},
      {id: 5, name: 'ChangeTetris',    url:"picture/Item/PieceChange.png"},
      {id: 6, name: 'LockTetris',      url:"picture/Item/PieceChain.png"},
    ];
    this.burnOn = 0
    this.raise = 0;
    this.comboTrigger = false;
    this.combos = 0;
    this.backToBackTrigger = false 
    this.backToBack = false
    this.lastRotate =  false 
    this.cheakTspin =  false 
    this.cheakTetris = false
    this.getItem = 'undefined'
    // changeItemIcon
    this.itemNumber = -1;
    this.itemLockSpace = false;
    this.itemDefense = false
    this.itemLeftRightChange = false;
    this.itemBlockPreview = false;
    this.itemLockTetris = false;

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
    this.queue = [0, 1, 2, 3, 4, 5, 6, -1, 0, 1, 2, 3, 4, 5, 6]; 
    //for rondom of pieces rule
    this.holdPiece = undefined;       
    // holding piece

    // game parameters
    this.startLevel = 5;
    this.level = 0;
    this.lines = 0;
    this.oldlines = this.lines;
    this.score = 0;
    this.last_sec=0;
    this.pressDownScore = 0;
    this.result = false;
    
    // event listeners
    this.handlers = new Map();
    this.handlers.set(ClassicTetris.GAME_START, []);
    this.handlers.set(ClassicTetris.GAME_OVER, []);
    this.handlers.set(ClassicTetris.GAME_OVER_START, []);
    this.handlers.set(ClassicTetris.GAME_OVER_END, []);
    this.handlers.set(ClassicTetris.GAME_PAUSE, []);
    this.handlers.set(ClassicTetris.GAME_RESUME, []);
    this.handlers.set(ClassicTetris.PIECE_MOVE_LEFT, []);
    this.handlers.set(ClassicTetris.PIECE_MOVE_RIGHT, []);
    this.handlers.set(ClassicTetris.PIECE_MOVE_DOWN, []);
    this.handlers.set(ClassicTetris.PIECE_HARD_DROP, []);
    this.handlers.set(ClassicTetris.PIECE_ROTATE_CLOCKWISE, []);
    this.handlers.set(ClassicTetris.PIECE_ROTATE_ANTICLOCKWISE, []);
    this.handlers.set(ClassicTetris.PIECE_LOCK, []);
    this.handlers.set(ClassicTetris.NEXT_PIECE, []);
    this.handlers.set(ClassicTetris.LEVEL_CHANGE, []);
    this.handlers.set(ClassicTetris.SCORE_CHANGE, []);
    this.handlers.set(ClassicTetris.LINE_CLEAR_START, []);
    this.handlers.set(ClassicTetris.LINE_CLEAR_END, []);
    this.handlers.set(ClassicTetris.LINE_CLEAR, []);

    // animation frames counters
    this.frameCounter = 0;
    this.areFrames = -1;
    this.framesTilDrop = 60;

    // counters for line-clear and game-over animations
    this.columnsCleared = -1;
    this.gameOverLine = -1;

    // game state
    this.previousGameState = ClassicTetris.STATE_GAME_OVER;
    this.gameState = ClassicTetris.STATE_GAME_OVER;

    // an empty row used to exploit syntactic sugar
    this.emptyRow = [];
    for (let i = 0; i < this.boardWidth; ++i) this.emptyRow.push(-1);
  }

  //----------------------------------------------------------------------------------------
  // 
  // setters 
  // 
  //----------------------------------------------------------------------------------------


  togglePlayPause() {
    if (this.playing) {
      // this.doUndoPause = true;
      if (this.gameState !== ClassicTetris.STATE_PAUSE &&
          this.gameState !== ClassicTetris.STATE_GAME_OVER){
        return false;
      }
    } else {
      this.play();
    }
    return true;
  }

  quit() {
    if (this.playing && this.gameState != ClassicTetris.STATE_GAME_OVER) {
      this._triggerGameOver();
    }
  }
  
  
  changeItemIcon() {
    let itemIcon = document.getElementById('itemIcon');
    let delayTime = 0;
    let interval;
    //read-only
    let t=this
    // Clears the previous setInterval timer
    changeIcon()


    // Function that run at irregular intervals
    function changeIcon() {
      // Clears the previous setInterval timer
      clearInterval(interval);
      if (delayTime < 1000) {
        t.takingItemSound.currentTime = 0;
        t.takingItemSound.play();
      }
      else if (delayTime == 1000){
        t.takeEndItemSound.currentTime = 0;
        t.takeEndItemSound.play();
      }
      else {return 0;}
      itemIcon.src = t.items[t.randomIcon()].url;
      delayTime += 100;
      interval = setInterval(changeIcon, delayTime);
    }
  }
  randomIcon() {
    let random = this.itemNumber;
    while (random === this.itemNumber) {
      random = Math.floor(Math.random() * this.items.length);
    }this.itemNumber = random
    return random;
  }

  // start new game
  async play() {
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
    this._dispatch(ClassicTetris.GAME_START, {
      type: ClassicTetris.GAME_START,
      level: this.level,
      score: this.score,
      lines: this.lines,
    });

    // fire new piece placed event
    this._dispatch(ClassicTetris.NEXT_PIECE, {
      type: ClassicTetris.NEXT_PIECE,
      piece: this.piece.name,
      nextPiece: this.next[0].name
    });
    // game loop
    this.gameLoop = true;

    do {
      this._process();
      if(p2!= undefined && this.frameCounter% 12 ===0 ){
        SendData(this); this.burnOn=0;
      }
      
      draw._render(this,P1canvas);    
      
      await this._sleep();
    } while (this.gameLoop);

    // remove event listeners
    // enable UI
    //this._removeEventListeners();
    this._enableUI();

    // toggle playing flag
    this.playing = false;

    // fire game finish event
    this._dispatch(ClassicTetris.GAME_OVER, {
      type: ClassicTetris.GAME_OVER,
      level: this.level,
      score: this.score,
      lines: this.lines,
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
    this.hold = true;
    this.haveHold = false;
    this.queue = [0, 1, 2, 3, 4, 5, 6, -1, 0, 1, 2, 3, 4, 5, 6];
    //  pointer coords
    this.xIni = undefined;
    this.yIni = undefined;
    this.tIni = undefined;

    // select random pieces
    this._nextPieceId();
    this.piece = this.pieces[this.queue[14]];
    
    // initial piece's position and rotation
    this.piecePosition = this.piece.iniPos.slice(0);
    this.pieceRotation = 0;

    // starting level, lines and score
    this.level = this.startLevel;
    this.lines = 0;
    this.score = 0;
    this.pressDownScore = 0;

    // clear board
    for (let i = 0; i < this.boardHeight; ++i)
      for (let j = 0; j < this.boardWidth; ++j)
        this.board[i][j] = -1;

    // frame counters
    this.frameCounter = 0;
    this.areFrames = -1;
    this.framesTilDrop = 60;
    this.columnsCleared = -1;
    this.gameOverLine = -1;
    // frames until the piece automatically moves down

    // initial state
    this.previousGameState = ClassicTetris.STATE_DROP;
    this.gameState = ClassicTetris.STATE_DROP;
    this.result = true
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
        if ( this.itemLeftRightChange ) {
          this.moveLeft = !(this.moveRight = true);
        } else {
          this.moveRight = !(this.moveLeft = true);
        }
        break;
      case 39:
      case 68:
        // right
        event.preventDefault();
        if ( this.itemLeftRightChange ) {
          this.moveRight = !(this.moveLeft = true);
        } else {
          this.moveLeft = !(this.moveRight = true);
        }
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
        if (this.itemLockSpace ) {break;}
        this.hardDrop = true;
        this.hold = false;
        break;
      case 27:
      case 80:
        // pause
        /*
        event.preventDefault();
        if (this.gameState != ClassicTetris.STATE_GAME_OVER) {
          this.doUndoPause = true;
        }
        break;
        */
      case 16:
        event.preventDefault();
        // hold piece
        if (this.haveHold) {
          if (this.hold ) {
            var tempPiece = this.holdPiece;
            this.piecePosition = this.piece.iniPos.slice(0);
            this.pieceRotation = 0;
            this.holdPiece = this.piece;
            this.piece = tempPiece;
            this.hold = false;
          } else return;//can't hold
        } else if(this.hold){
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
        break;
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
    if(this.last_sec){
      
    }
    // process current state
    switch (this.gameState) {
      case ClassicTetris.STATE_DROP:
        if ( this.itemLockTetris ) {
        }else { this._processDrop(); }
        break;
      case ClassicTetris.STATE_BURN:
        this._processBurn();
        break;
      case ClassicTetris.STATE_ARE:
        this._processARE();
        break;
      case ClassicTetris.STATE_GAME_OVER:
        this._processGameOver();
        break;
      case ClassicTetris.STATE_PAUSE:
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
      this.lastRotate = false
      // play move sound
      if (this.moveSound) {
        this.moveSound.currentTime = 0;
        this.moveSound.play();
      }

      // fire move left event
      this._dispatch(ClassicTetris.PIECE_MOVE_LEFT, {
        type: ClassicTetris.PIECE_MOVE_LEFT,
        piece: this.piece.name,
        rotation: this.pieceRotation,
        oldPosition: oldPosition,
        newPosition: [...this.piecePosition]
      });

    }
    if (this.moveRight && this._canMovePiece(1, 0)) {
      const oldPosition = [...this.piecePosition];
      ++this.piecePosition[0];
      this.lastRotate = false
      // play move sound
      if (this.moveSound) {
        this.moveSound.currentTime = 0;
        this.moveSound.play();
      }

      // fire move right event
      this._dispatch(ClassicTetris.PIECE_MOVE_RIGHT, {
        type: ClassicTetris.PIECE_MOVE_RIGHT,
        piece: this.piece.name,
        rotation: this.pieceRotation,
        oldPosition: oldPosition,
        newPosition: [...this.piecePosition]
      });

    }
    if (this.rotateClockwise) {
      const oldRotation = this.pieceRotation;
      this.pieceRotation = (this.pieceRotation + 1 + this.piece.rot.length ) % this.piece.rot.length;
      let canrot=false
      switch(this.piece.id){
        case 0:case 1:case 3:case 4:case 5:
          if(this.pieceRotation===0){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(-1,0)){canrot=true;--this.piecePosition[0];}
            else if(this._canMovePiece(-1,1)){canrot=true;--this.piecePosition[0];++this.piecePosition[1];}
            else if(this._canMovePiece(0,-2)){canrot=true;this.piecePosition[1]-=2;}
            else if(this._canMovePiece(-1,-2)){canrot=true;--this.piecePosition[0];this.piecePosition[1]-=2;}
          }
          else if(this.pieceRotation===1){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(-1,0)){canrot=true;--this.piecePosition[0];}
            else if(this._canMovePiece(-1,-1)){canrot=true;--this.piecePosition[0];--this.piecePosition[1];}
            else if(this._canMovePiece(0,2)){canrot=true;this.piecePosition[1]+=2;}
            else if(this._canMovePiece(-1,2)){canrot=true;--this.piecePosition[0];this.piecePosition[1]+=2;}
          }
          else if(this.pieceRotation===2){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(1,0)){canrot=true;++this.piecePosition[0];}
            else if(this._canMovePiece(1,1)){canrot=true;++this.piecePosition[0];++this.piecePosition[1];}
            else if(this._canMovePiece(0,-2)){canrot=true;this.piecePosition[1]-=2;}
            else if(this._canMovePiece(1,-2)){canrot=true;++this.piecePosition[0];this.piecePosition[1]-=2;}
          }
          else if(this.pieceRotation===3){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(1,0)){canrot=true;++this.piecePosition[0];}
            else if(this._canMovePiece(1,-1)){canrot=true;++this.piecePosition[0];--this.piecePosition[1];}
            else if(this._canMovePiece(0,2)){canrot=true;this.piecePosition[1]+=2;}
            else if(this._canMovePiece(1,2)){canrot=true;++this.piecePosition[0];this.piecePosition[1]+=2;}
          }
        break;
        case 6:
          if(this.pieceRotation===0){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(1,0)){canrot=true;++this.piecePosition[0];}
            else if(this._canMovePiece(-2,0)){canrot=true;this.piecePosition[0]-=2;}
            else if(this._canMovePiece(1,2)){canrot=true;++this.piecePosition[0];this.piecePosition[1]+=2;}
            else if(this._canMovePiece(-2,-1)){canrot=true;this.piecePosition[0]-=2;--this.piecePosition[1];}
          }
          else if(this.pieceRotation===1){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(-2,0)){canrot=true;this.piecePosition[0]-=2;}
            else if(this._canMovePiece(1,0)){canrot=true;++this.piecePosition[0];}
            else if(this._canMovePiece(-2,1)){canrot=true;this.piecePosition[0]-=2;++this.piecePosition[1];}
            else if(this._canMovePiece(1,-2)){canrot=true;++this.piecePosition[0];this.piecePosition[1]-=2;}
          }
          else if(this.pieceRotation===2){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(-1,0)){canrot=true;--this.piecePosition[0];}
            else if(this._canMovePiece(2,0)){canrot=true;this.piecePosition[0]+=2;}
            else if(this._canMovePiece(-1,-2)){canrot=true;--this.piecePosition[0];this.piecePosition[1]-=2;}
            else if(this._canMovePiece(2,1)){canrot=true;this.piecePosition[0]+=2;++this.piecePosition[1];}
          }
          else if(this.pieceRotation===3){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(2,0)){canrot=true;this.piecePosition[0]+=2;}
            else if(this._canMovePiece(-1,0)){canrot=true;--this.piecePosition[0];}
            else if(this._canMovePiece(2,-1)){canrot=true;this.piecePosition[0]+=2;--this.piecePosition[1];}
            else if(this._canMovePiece(-1,2)){canrot=true;--this.piecePosition[0];this.piecePosition[1]+=2;}
          }
        break;
      }
      if(!canrot)this.pieceRotation = oldRotation
      else this.lastRotate = true
      this._dispatch(ClassicTetris.PIECE_ROTATE_CLOCKWISE, {
        type: ClassicTetris.PIECE_ROTATE_CLOCKWISE,
        piece: this.piece.name,
        position: [...this.piecePosition],
        oldRotation: oldRotation,
        newRotation: this.pieceRotation
      });
    }

    if (this.rotateAnticlockwise) {
      const oldRotation = this.pieceRotation;
      this.pieceRotation = (this.pieceRotation - 1 + this.piece.rot.length ) % this.piece.rot.length;
      let canrot=false
      switch(this.piece.id){
        case 0:case 1:case 3:case 4:case 5:
          if(this.pieceRotation===2){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(-1,0)){canrot=true;--this.piecePosition[0];}
            else if(this._canMovePiece(-1,1)){canrot=true;--this.piecePosition[0];++this.piecePosition[1];}
            else if(this._canMovePiece(0,-2)){canrot=true;this.piecePosition[1]-=2;}
            else if(this._canMovePiece(-1,-2)){canrot=true;--this.piecePosition[0];this.piecePosition[1]-=2;}
          }
          else if(this.pieceRotation===3){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(1,0)){canrot=true;++this.piecePosition[0];}
            else if(this._canMovePiece(1,-1)){canrot=true;++this.piecePosition[0];--this.piecePosition[1];}
            else if(this._canMovePiece(0,2)){canrot=true;this.piecePosition[1]+=2;}
            else if(this._canMovePiece(1,2)){canrot=true;++this.piecePosition[0];this.piecePosition[1]+=2;}
          }
          else if(this.pieceRotation===0){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(1,0)){canrot=true;++this.piecePosition[0];}
            else if(this._canMovePiece(1,1)){canrot=true;++this.piecePosition[0];++this.piecePosition[1];}
            else if(this._canMovePiece(0,-2)){canrot=true;this.piecePosition[1]-=2;}
            else if(this._canMovePiece(1,-2)){canrot=true;++this.piecePosition[0];this.piecePosition[1]-=2;}
          }
          else if(this.pieceRotation===1){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(-1,0)){canrot=true;--this.piecePosition[0];}
            else if(this._canMovePiece(-1,-1)){canrot=true;--this.piecePosition[0];--this.piecePosition[1];}
            else if(this._canMovePiece(0,2)){canrot=true;this.piecePosition[1]+=2;}
            else if(this._canMovePiece(-1,2)){canrot=true;--this.piecePosition[0];this.piecePosition[1]+=2;}
          }
        break;
        case 6:
          if(this.pieceRotation===2){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(1,0)){canrot=true;++this.piecePosition[0];}
            else if(this._canMovePiece(-2,0)){canrot=true;this.piecePosition[0]-=2;}
            else if(this._canMovePiece(1,2)){canrot=true;++this.piecePosition[0];this.piecePosition[1]+=2;}
            else if(this._canMovePiece(-2,-1)){canrot=true;this.piecePosition[0]-=2;--this.piecePosition[1];}
          }
          else if(this.pieceRotation===3){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(-2,0)){canrot=true;this.piecePosition[0]-=2;}
            else if(this._canMovePiece(1,0)){canrot=true;++this.piecePosition[0];}
            else if(this._canMovePiece(-2,1)){canrot=true;this.piecePosition[0]-=2;++this.piecePosition[1];}
            else if(this._canMovePiece(1,-2)){canrot=true;++this.piecePosition[0];this.piecePosition[1]-=2;}
          }
          else if(this.pieceRotation===0){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(-1,0)){canrot=true;--this.piecePosition[0];}
            else if(this._canMovePiece(2,0)){canrot=true;this.piecePosition[0]+=2;}
            else if(this._canMovePiece(-1,-2)){canrot=true;--this.piecePosition[0];this.piecePosition[1]-=2;}
            else if(this._canMovePiece(2,1)){canrot=true;this.piecePosition[0]+=2;++this.piecePosition[1];}
          }
          else if(this.pieceRotation===1){
            if(this._canMovePiece(0,0)){canrot=true;}
            else if(this._canMovePiece(2,0)){canrot=true;this.piecePosition[0]+=2;}
            else if(this._canMovePiece(-1,0)){canrot=true;--this.piecePosition[0];}
            else if(this._canMovePiece(2,-1)){canrot=true;this.piecePosition[0]+=2;--this.piecePosition[1];}
            else if(this._canMovePiece(-1,2)){canrot=true;--this.piecePosition[0];this.piecePosition[1]+=2;}
          }
        break;
      }
      if(!canrot)this.pieceRotation = oldRotation
      else this.lastRotate = true
      this._dispatch(ClassicTetris.PIECE_ROTATE_CLOCKWISE, {
        type: ClassicTetris.PIECE_ROTATE_CLOCKWISE,
        piece: this.piece.name,
        position: [...this.piecePosition],
        oldRotation: oldRotation,
        newRotation: this.pieceRotation
      });
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
      this._dispatch(ClassicTetris.PIECE_HARD_DROP, {
        type: ClassicTetris.PIECE_HARD_DROP,
        piece: this.piece.name,
        rotation: this.pieceRotation,
        oldPosition: oldPosition,
        newPosition: [...this.piecePosition]
      });

      // do piece lock
      this._lockPiece();

    } else if (this.moveDown || this.framesTilDrop === 0) {
      if (this._canMovePiece(0, 1)) {

        const oldPosition = [...this.piecePosition];
        ++this.piecePosition[1];

        // reset auto-drop frames
        this.framesTilDrop = 60
        // fire move down event
        this._dispatch(ClassicTetris.PIECE_MOVE_DOWN, {
          type: ClassicTetris.PIECE_MOVE_DOWN,
          piece: this.piece.name,
          rotation: this.pieceRotation,
          oldPosition: oldPosition,
          newPosition: [...this.piecePosition],
          downPressed: this.moveDown
        });

      } else if(this.framesTilDrop != 0){
        this.framesTilDrop = 60
      }
      else{
        // lock piece if it couldn't move down
        this._lockPiece();
      }
    }
  }

  _lockPiece() {
    this.hold = false;
    this.framesTilDrop = -1;
    if(this.piece.id === 5){
      if(this.lastRotate)
        if(!this._canMovePiece(0,-1))this.cheakTspin = true
    }
    this._setPiece();
    
    // fire piece lock event
    this._dispatch(ClassicTetris.PIECE_LOCK, {
      type: ClassicTetris.PIECE_LOCK,
      piece: this.piece.name,
      rotation: this.pieceRotation,
      position: [...this.piecePosition]
    });

    this.linesCleared = this._getLinesCleared();
    if (this.linesCleared.length > 0) {
      // clear those lines
      this.columnsCleared = 0;
      this.gameState = ClassicTetris.STATE_BURN;
      
      // cheak special burnOn
      if(this.linesCleared.length === 4)this.cheakTetris = true;
      if(this.backToBackTrigger)this.backToBack = true;
      if( this.cheakTetris || this.cheakTspin)
        this.backToBackTrigger = true
      else {
        this.backToBackTrigger = false
        this.backToBack = false
      }
      
      // process combo && burnOn && detrash
      if(this.comboTrigger){ this.combos++; } 
      else { this.comboTrigger = true; }
      if(this.cheakTetris)this.burnOn += 4; 
      else if(this.cheakTspin){this.burnOn += this.linesCleared.length*2 }
      else this.burnOn += this.linesCleared.length -1; 
      if(this.backToBack)++this.burnOn
      let temp = [0,1,1,2,2,3,3]
      if(this.burnOn < 7) this.burnOn+=temp[this.combos]
      else this.burnOn+=4;
      if(this.raise > 0)this.raise -= this.burnOn
      if(this.burnOn > 0 && this.raise){
        //triiggertrashanime()
      }
      
      
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
      this._dispatch(ClassicTetris.LINE_CLEAR_START, {
        type: ClassicTetris.LINE_CLEAR_START,
        linesBurnt: [...this.linesCleared]
      });

    } else {
      if(this.raise > 0)this.setBlockLine();
      // combo init
      this.combos = 0;
      this.comboTrigger = false
      
      // play piece lock sound
      if (this.setSound) {
        this.setSound.currentTime = 0;
        this.setSound.play();
      }

      // update score
      const oldScore = this.score;
      this.score += this.linesCleared.length

      // fire score change event
      this._dispatch(ClassicTetris.SCORE_CHANGE, {
        type: ClassicTetris.SCORE_CHANGE,
        oldScore: oldScore,
        newScore: this.score
      });

      // entry delay for next piece
      this.areFrames = this._getARE();
      this.gameState = ClassicTetris.STATE_ARE;
    }
  }

  _processBurn() {
    if ((this.frameCounter % 8) === 0) {  //4) === 0) {
      ++this.columnsCleared;this.columnsCleared=3;
      if (this.columnsCleared < 3) {
        // // remove another columns of squares
        // const mid = this.boardWidth / 2;
        // for (let i = 0; i < this.linesCleared.length; ++i) {
        //   this.board[this.linesCleared[i]][mid + this.columnsCleared] = -1;
        //   this.board[this.linesCleared[i]][mid - 1 - this.columnsCleared] = -1;
        // }

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
        this._dispatch(ClassicTetris.LINE_CLEAR_END, {
          type: ClassicTetris.LINE_CLEAR_END,
          linesBurnt: [...this.linesCleared]
        });

        // fire lines clear event
        this._dispatch(ClassicTetris.LINE_CLEAR, {
          type: ClassicTetris.LINE_CLEAR,
          oldLines: oldLines,
          newLines: this.lines
        });

        // fire score change event
        this._dispatch(ClassicTetris.SCORE_CHANGE, {
          type: ClassicTetris.SCORE_CHANGE,
          oldScore: oldScore,
          newScore: this.score
        });

       

        // entry delay for next piece
        this.areFrames = this._getARE();
        this.gameState = ClassicTetris.STATE_ARE;
      }
    }

  }

  _processARE() {
    // wait are frames
    --this.areFrames;
    if (this.areFrames === 0) {
      this.areFrames = -1;
      this.hold = true;// 調整為can hold
      this.lastRotate = false
      this.cheakTspin = false 
      this.cheakTetris = false
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
        this.framesTilDrop = 60
        this.gameState = ClassicTetris.STATE_DROP;

        // fire new piece placed event
        this._dispatch(ClassicTetris.NEXT_PIECE, {
          type: ClassicTetris.NEXT_PIECE,
          piece: this.piece.name,
          nextPiece: this.next[0].name
        });

      } else {
        // can't place piece -it's game over
        this._setPiece();
        this.result = false 
        this._triggerGameOver();
      }
      
    }
  }
  
  
  _triggerGameOver() {
    if(this.gameState === ClassicTetris.STATE_GAME_OVER )return;
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
    this.gameState = ClassicTetris.STATE_GAME_OVER;

    // fire game-over animation start event
    this._dispatch(ClassicTetris.GAME_OVER_START, {
      type: ClassicTetris.GAME_OVER_START,
      level: this.level,
      score: this.score,
      lines: this.lines,
      time: this.time
    });
  }

  _processGameOver() {
    if ((this.frameCounter % 8) === 0) {  //4) === 0) {
      ++this.gameOverLine;
      
      if (this.gameOverLine < this.boardHeight) {
        // paint next row
        for (let i = 0; i < this.boardWidth; ++i) this.board[this.gameOverLine][i] = -1;
        draw._render(this);
      } else {
        // game-over animation is done -stop the game loop
        this.gameLoop = false;
        // fire game-over animation end event
        this._dispatch(ClassicTetris.GAME_OVER_END, {
          type: ClassicTetris.GAME_OVER_END,
          level: this.level,
          score: this.score,
          lines: this.lines,
        });
      }
    }
  }

  // pause or unpause if requested
  _pauseCheck() {
    if (this.doUndoPause) {
      if (this.gameState === ClassicTetris.STATE_PAUSE) {
        this.gameState = this.previousGameState;

        // reset pointer flags
        this.pointerMoveDownEnabled = false;

        // resume theme song
        if (this.gameTheme) {
          this.gameTheme.play();
        }

        // fire resume event
        this._dispatch(ClassicTetris.GAME_RESUME, {
          type: ClassicTetris.GAME_RESUME,
          level: this.level,
          score: this.score,
          lines: this.lines,
        });

      } else {
        this.previousGameState = this.gameState;
        this.gameState = ClassicTetris.STATE_PAUSE;

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
        this._dispatch(ClassicTetris.GAME_PAUSE, {
          type: ClassicTetris.GAME_PAUSE,
          level: this.level,
          score: this.score,
          lines: this.lines,
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
  // game rules: https://tetris.wiki/ClassicTetris_(NES,_Nintendo)
  // 
  //--------------------------------------------------------------------------------------------

  _nextPieceId() {
    //reset queue
    if (this.queue[7] == -1) {
      for (let i = 0; i < 7; ++i) {
        let pos = Math.floor(Math.random() * 7);
        let temp = this.queue[pos];
        this.queue[pos] = this.queue[i];
        this.queue[i] = temp;
      } this.queue[7] = 7;
      for (let i = 8; i < 15; ++i) {
        let pos = Math.floor(Math.random() * 7) + 8;
        let temp = this.queue[pos];
        this.queue[pos] = this.queue[i];
        this.queue[i] = temp;
      }
    }
    //random queue
    if (this.queue[0] == 7) {
      for (let i = 0; i < 7; ++i) {
        this.queue[i] = this.queue[i + 1];
      } this.queue[7] = 7;
      for (let i = 8; i < 15; ++i) {
        let pos = Math.floor(Math.random() * 7) +8;
        let temp = this.queue[pos];
        this.queue[pos] = this.queue[i];
        this.queue[i] = temp;
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
    return 6//are * 2;   //return are;
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

  // line clear delay is an additional 17~20 frames depending on the frame that the piece locks; 
  // the animation has 5 steps that advance when the global frame counter modulo 4 equals 0. 
  // As a consequence, the first step of the line clear animation is not always a set number of frames
  _getLinesCleared() {
    const arr = [];
    for (let i = 0; i < this.boardHeight; ++i) {
      let b = true;
      for (let j = 0; b && j < this.boardWidth; ++j)
        if (this.board[i][j] === -1 ) b = false;
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
  // items function
  // 
  //-----------------------------------------------------------
  _getItem() {
      this.oldlines = (this.lines / 5) * 5;
      this.changeItemIcon();
      setTimeout( () => {                                       
        if (this.items[this.itemNumber].name == 'Defense') {
          this.itemDefense = true; 
          console.log ('get item-' + this.items[this.itemNumber].name);
        }
        else { 
          socket.emit('item', this.items[this.itemNumber].name, p2);
          console.log ('emit item-' + this.items[this.itemNumber].name);
        }
      }, 6000 )
  }
  // 6sec 為changeItemIcon()執行總時間
  itemdelay() {return new Promise(resolve => { });}
  _itemProcess(){
    if(!this.itemDefense){
      switch(this.getItem){
        case 'LockSpace':       this.setItemLockSpace();break;
        case 'Defense':         break;
        case 'HardHoldOn':      this.setHardHoldOn();break;
        case 'LeftRightChange': this.setLeftRightChange();break;
        case 'BlockPreview':    this.setBlockPreview();break;
        case 'ChangeTetris':    this.setChangeOpponentTetris();break;
        case 'LockTetris':      this.setLockOpponentTetris();break;
        case 'BlockALine':      this.setBlockLine();break;
      }
      console.log(this.getItem)
    }else {this.itemDefense=false}
  }
  
  setItemLockSpace() { 
    this.itemLockSpace = true;
    setTimeout( () => {
      this.itemLockSpace = false;
    }, 10000 );
  }
  
  setHardHoldOn() {
    if (this.haveHold) {
        var tempPiece = this.holdPiece;
        this.piecePosition = this.piece.iniPos.slice(0);
        this.pieceRotation = 0;
        this.holdPiece = this.piece;
        this.piece = tempPiece;
        this.hold = false;
    } else {
      this.holdPiece = Object.assign({}, this.piece);
      this.piecePosition = this.piece.iniPos.slice(0);
      this.pieceRotation = 0;
      this.haveHold = true;
      this.hold = false;
      this.piece = this.next[0];
      this.piecePosition = this.piece.iniPos.slice(0);
      this.pieceRotation = 0;
      this._nextPieceId();
    }
  }
  
  setLeftRightChange() { 
    this.itemLeftRightChange = true;
    setTimeout( () => {
      this.itemLeftRightChange = false;
    }, 8000 );
  }
  
  setBlockPreview() { 
    this.itemBlockPreview = true;
    setTimeout( () => {
      this.itemBlockPreview = false;
    }, 10000 );
  }
  
  setChangeOpponentTetris() {
    for (let i = 0; i < 7; i++) {
      this._nextPieceId();
    }
  }
  
  setLockOpponentTetris() { 
    this.itemLockTetris = true;
    setTimeout( () => {
      this.itemLockTetris = false;
    }, 3000 );
  }
  setBlockLine() {
    /*board 
        -1 = background 
         7 = lock
    */
    this.raise = Math.min(20,this.raise)
    let hole = Math.floor( Math.random() * 10 ) ;
    
    for (let j = 0; j < this.boardHeight - this.raise; ++j) {
      for (let i = 0; i < this.boardWidth; ++i) {  
        this.board[j][i] = this.board[j+this.raise][i]
      }
    }
    for (let i = 0; i < this.boardWidth; ++i) 
      for (let j = this.boardHeight - this.raise; j < this.boardHeight; ++j) 
        if( i == hole )this.board[j][i] = -1;
        else this.board[j][i] = 7;
    
    this.raise = 0;
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