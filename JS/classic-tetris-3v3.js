'use strict';


//-------------------------------------------------------------------------
// 
// ClassicTetris3v3 class
// 
//-------------------------------------------------------------------------
class ClassicTetris3v3 extends Items{
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
  constructor( {
    boardWidth = ClassicTetris3v3.BOARD_WIDTH,
    boardHeight = ClassicTetris3v3.BOARD_HEIGHT,

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
    super()
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
        name: ClassicTetris3v3.Z_PIECE,
        rot: ClassicTetris3v3.Z_ROT,
        iniPos: ClassicTetris3v3.Z_INI_POS,
        box: ClassicTetris3v3.Z_BOX
      },
      {
        id: 1,
        name: ClassicTetris3v3.S_PIECE,
        rot: ClassicTetris3v3.S_ROT,
        iniPos: ClassicTetris3v3.S_INI_POS,
        box: ClassicTetris3v3.S_BOX
      },
      {
        id: 2,
        name: ClassicTetris3v3.O_PIECE,
        rot: ClassicTetris3v3.O_ROT,
        iniPos: ClassicTetris3v3.O_INI_POS,
        box: ClassicTetris3v3.O_BOX
      },
      {
        id: 3,
        name: ClassicTetris3v3.L_PIECE,
        rot: ClassicTetris3v3.L_ROT,
        iniPos: ClassicTetris3v3.L_INI_POS,
        box: ClassicTetris3v3.L_BOX
      },
      {
        id: 4,
        name: ClassicTetris3v3.J_PIECE,
        rot: ClassicTetris3v3.J_ROT,
        iniPos: ClassicTetris3v3.J_INI_POS,
        box: ClassicTetris3v3.J_BOX
      },
      {
        id: 5,
        name: ClassicTetris3v3.T_PIECE,
        rot: ClassicTetris3v3.T_ROT,
        iniPos: ClassicTetris3v3.T_INI_POS,
        box: ClassicTetris3v3.T_BOX
      },
      {
        id: 6,
        name: ClassicTetris3v3.I_PIECE,
        rot: ClassicTetris3v3.I_ROT,
        iniPos: ClassicTetris3v3.I_INI_POS,
        box: ClassicTetris3v3.I_BOX
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
    
    this.burnOn = 0
    this.raise = 0;
    this.comboTrigger = false;
    this.combos = 0;
    this.backToBackTrigger = false 
    this.backToBack = false
    this.lastRotate =  false 
    this.cheakTspin =  false 
    this.cheakTetris = false

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
    this.pressDownScore = 0;
    this.result = undefined;
    this.boardOverLoad = false

    // event listeners
    this.handlers = new Map();
    this.handlers.set(ClassicTetris3v3.GAME_START, []);
    this.handlers.set(ClassicTetris3v3.GAME_OVER, []);
    this.handlers.set(ClassicTetris3v3.GAME_OVER_START, []);
    this.handlers.set(ClassicTetris3v3.GAME_OVER_END, []);
    this.handlers.set(ClassicTetris3v3.GAME_PAUSE, []);
    this.handlers.set(ClassicTetris3v3.GAME_RESUME, []);
    this.handlers.set(ClassicTetris3v3.PIECE_MOVE_LEFT, []);
    this.handlers.set(ClassicTetris3v3.PIECE_MOVE_RIGHT, []);
    this.handlers.set(ClassicTetris3v3.PIECE_MOVE_DOWN, []);
    this.handlers.set(ClassicTetris3v3.PIECE_HARD_DROP, []);
    this.handlers.set(ClassicTetris3v3.PIECE_ROTATE_CLOCKWISE, []);
    this.handlers.set(ClassicTetris3v3.PIECE_ROTATE_ANTICLOCKWISE, []);
    this.handlers.set(ClassicTetris3v3.PIECE_LOCK, []);
    this.handlers.set(ClassicTetris3v3.NEXT_PIECE, []);
    this.handlers.set(ClassicTetris3v3.LEVEL_CHANGE, []);
    this.handlers.set(ClassicTetris3v3.SCORE_CHANGE, []);
    this.handlers.set(ClassicTetris3v3.LINE_CLEAR_START, []);
    this.handlers.set(ClassicTetris3v3.LINE_CLEAR_END, []);
    this.handlers.set(ClassicTetris3v3.LINE_CLEAR, []);

    // animation frames counters
    this.maxFramesTilDrop = 70
    this.frameCounter = 0;
    this.areFrames = -1;
    this.framesTilDrop = this.maxFramesTilDrop

    // counters for line-clear and game-over animations
    this.columnsCleared = -1;
    this.gameOverLine = -1;

    // game state
    this.previousGameState = ClassicTetris3v3.STATE_GAME_OVER;
    this.gameState = ClassicTetris3v3.STATE_GAME_OVER;

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
      if (this.gameState !== ClassicTetris3v3.STATE_PAUSE &&
          this.gameState !== ClassicTetris3v3.STATE_GAME_OVER){
        return false;
      }
    } else {
      this.play();
    }
    return true;
  }

  quit() {
    if (this.playing && this.gameState != ClassicTetris3v3.STATE_GAME_OVER) {
      this._triggerGameOver();
    }
  }
  
  
  

  // start new game
  async play() {
    if (this.playing) return;
    this.playing = true;
    // attach event listeners
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
    this._dispatch(ClassicTetris3v3.GAME_START, {
      type: ClassicTetris3v3.GAME_START,
      level: this.level,
      score: this.score,
      lines: this.lines,
    });

    // fire new piece placed event
    this._dispatch(ClassicTetris3v3.NEXT_PIECE, {
      type: ClassicTetris3v3.NEXT_PIECE,
      piece: this.piece.name,
      nextPiece: this.next[0].name
    });
    // game loop
    this.gameLoop = true;

    do {
      this._process();
      if(this.frameCounter % 8 === 0 )SendData(this)
      if(this.boardOverLoad){
        SendData(this)
        this._resetParams();
      }
      draw._render(this, myCanvas);
      
      await this._sleep();
    } while (this.gameLoop);
    myCanvas._enableUI();
    // toggle playing flag
    this.playing = false;
    this._removeEventListeners()
    // fire game finish event
    this._dispatch(ClassicTetris3v3.GAME_OVER, {
      type: ClassicTetris3v3.GAME_OVER,
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
    this.moveLeft = false
    this.moveRight = false
    this.moveDown = false
    this.rotateClockwise = false
    this.rotateAnticlockwise = false
    this.hardDrop = false
    this.doUndoPause = false
    this.hold = true
    this.haveHold = false
    this.boardOverLoad = false

    //  pointer coords
    this.xIni = undefined
    this.yIni = undefined
    this.tIni = undefined
    
    // select random pieces
    this.queue = [0, 1, 2, 3, 4, 5, 6, -1, 0, 1, 2, 3, 4, 5, 6]
    this._nextPieceId();
    this.piece = this.pieces[this.queue[14]];
    for (let i = 0; i < 3; ++i)this.next[i] = this.pieces[this.queue[i]]
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
    this.maxFramesTilDrop = 70
    this.framesTilDrop = this.maxFramesTilDrop;
    this.columnsCleared = -1;
    this.gameOverLine = -1;
    // frames until the piece automatically moves down

    // initial state
    this.previousGameState = ClassicTetris3v3.STATE_DROP;
    this.gameState = ClassicTetris3v3.STATE_DROP;
    this.result = undefined

    // item icon
    document.getElementById('itemIcon').src = "/picture/Item/default.png";
    document.getElementById('itemIcon2').src = "/picture/Item/default.png";
  }


  // add and remove event listeners
  _addEventListeners() {
    document.addEventListener('pointerdown', this._handlePointerDown, { capture: true, passive: false });
    document.addEventListener('pointermove', this._handlePointerMove, { capture: true, passive: false });
    document.addEventListener('pointerup', this._handlePointerUp, { capture: true, passive: false });
    document.addEventListener('pointercancel', this._handlePointerCancel, { capture: true, passive: false });
    document.addEventListener('wheel', this._handleWheel, { capture: true, passive: false });
    document.addEventListener('keydown', this._handleKeyDown, { capture: true, passive: false });
  }

  _removeEventListeners() {
    document.removeEventListener('pointerdown', this._handlePointerDown, true);
    document.removeEventListener('pointermove', this._handlePointerMove, true);
    document.removeEventListener('pointerup', this._handlePointerUp, true);
    document.removeEventListener('pointercancel', this._handlePointerCancel, true);
    document.removeEventListener('wheel', this._handleWheel, true);
    document.removeEventListener('keydown', this._handleKeyDown, true);
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
  // rotate anticlockwise   'z'             90 
  // down                   down arrow      40
  // hard drop              space bar       32
  // hold                  'shift'          16
  // key event listener
  _handleKeyDown = event => {

    switch (event.keyCode || event.which) {
      case 37:
        // left
        event.preventDefault();
        if ( this.itemLeftRightChange ) {
          this.moveLeft = !(this.moveRight = true);
        } else {
          this.moveRight = !(this.moveLeft = true);
        }
        break;
      case 39:
        // right
        event.preventDefault();
        if ( this.itemLeftRightChange ) {
          this.moveRight = !(this.moveLeft = true);
        } else {
          this.moveLeft = !(this.moveRight = true);
        }
        break;
      case 38:
        // rotate clockwise
        event.preventDefault();
        this.rotateAnticlockwise = !(this.rotateClockwise = true);
        break;
      case 90:
        // rotate anticlockwise
        event.preventDefault();
        this.rotateClockwise = !(this.rotateAnticlockwise = true);
        break;
      case 40:
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
      case 16:
        event.preventDefault();
        // hold piece
        if ( this.hold )
          this.holdOnPiece = true;
      break;
      case 65: 
        config.profession = 'Attacker'
        myProfession.changeProfession(config)
        // change to Attacker
      break;
      case 83: 
        config.profession = 'Magician'
        myProfession.changeProfession(config)
        // change to Magician
      break;
      case 68: 
        config.profession = 'Defender'
        myProfession.changeProfession(config)
        // change to Defender
      break;
    }
  }

  //-----------------------------------------------------------
  // 
  // game logic
  // 
  //-----------------------------------------------------------

  _process() {
    
    switch (this.gameState) {
      case ClassicTetris3v3.STATE_DROP:
        if ( !this.itemLockTetris )  this._processDrop(); 
        break;
      case ClassicTetris3v3.STATE_BURN:
        this._processBurn();
        break;
      case ClassicTetris3v3.STATE_ARE:
        this._processARE();
        break;
      case ClassicTetris3v3.STATE_GAME_OVER:
        this._processGameOver();
        break;
      case ClassicTetris3v3.STATE_PAUSE:
        break;
    }
    // clear input flags
    this._resetInputs();

    // global frame counter
    ++this.frameCounter;
    if(this.frameCounter == 180){
      --this.maxFramesTilDrop
      this.frameCounter = 0
    }
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
      this._dispatch(ClassicTetris3v3.PIECE_MOVE_LEFT, {
        type: ClassicTetris3v3.PIECE_MOVE_LEFT,
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
      this._dispatch(ClassicTetris3v3.PIECE_MOVE_RIGHT, {
        type: ClassicTetris3v3.PIECE_MOVE_RIGHT,
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
      this._dispatch(ClassicTetris3v3.PIECE_ROTATE_CLOCKWISE, {
        type: ClassicTetris3v3.PIECE_ROTATE_CLOCKWISE,
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
      this._dispatch(ClassicTetris3v3.PIECE_ROTATE_CLOCKWISE, {
        type: ClassicTetris3v3.PIECE_ROTATE_CLOCKWISE,
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
      this._dispatch(ClassicTetris3v3.PIECE_HARD_DROP, {
        type: ClassicTetris3v3.PIECE_HARD_DROP,
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
        this.framesTilDrop = this.maxFramesTilDrop
        // fire move down event
        this._dispatch(ClassicTetris3v3.PIECE_MOVE_DOWN, {
          type: ClassicTetris3v3.PIECE_MOVE_DOWN,
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
    
    if( this.holdOnPiece || this.itemHoldOn){
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
        // get next piece
        this.piece = this.next[0];
        this.piecePosition = this.piece.iniPos.slice(0);
        this.pieceRotation = 0;
        this._nextPieceId();
      }
      this.holdOnPiece = false
      this.itemHoldOn = false
    }
    if( this.itemChangeTetris ){
      this.itemChangeTetris = false
      for (let i = 0; i < 7; i++) 
        this._nextPieceId();
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
    this._dispatch(ClassicTetris3v3.PIECE_LOCK, {
      type: ClassicTetris3v3.PIECE_LOCK,
      piece: this.piece.name,
      rotation: this.pieceRotation,
      position: [...this.piecePosition]
    });

    this.linesCleared = this._getLinesCleared();
    if (this.linesCleared.length > 0) {
      // clear those lines
      this.columnsCleared = 0;
      this.gameState = ClassicTetris3v3.STATE_BURN;
      
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
      if(this.combos < 7) this.burnOn+=temp[this.combos]
      else this.burnOn+=4;
      if(this.raise > 0)this.raise -= this.burnOn
      if(this.burnOn > 0 && this.raise){
        //triiggertrashanime()
      }
      
      myProfession.modifyEnergy(this.burnOn);
      this.burnOn = 0
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
      this._dispatch(ClassicTetris3v3.LINE_CLEAR_START, {
        type: ClassicTetris3v3.LINE_CLEAR_START,
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
      this._dispatch(ClassicTetris3v3.SCORE_CHANGE, {
        type: ClassicTetris3v3.SCORE_CHANGE,
        oldScore: oldScore,
        newScore: this.score
      });

      // entry delay for next piece
      this.areFrames = this._getARE();
      this.gameState = ClassicTetris3v3.STATE_ARE;
    }
  }

  _processBurn() {
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
        this._dispatch(ClassicTetris3v3.LINE_CLEAR_END, {
          type: ClassicTetris3v3.LINE_CLEAR_END,
          linesBurnt: [...this.linesCleared]
        });

        // fire lines clear event
        this._dispatch(ClassicTetris3v3.LINE_CLEAR, {
          type: ClassicTetris3v3.LINE_CLEAR,
          oldLines: oldLines,
          newLines: this.lines
        });

        // fire score change event
        this._dispatch(ClassicTetris3v3.SCORE_CHANGE, {
          type: ClassicTetris3v3.SCORE_CHANGE,
          oldScore: oldScore,
          newScore: this.score
        });

       

        // entry delay for next piece
        this.areFrames = this._getARE();
        this.gameState = ClassicTetris3v3.STATE_ARE;
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
        this.framesTilDrop = this.maxFramesTilDrop
        this.gameState = ClassicTetris3v3.STATE_DROP;

        // fire new piece placed event
        this._dispatch(ClassicTetris3v3.NEXT_PIECE, {
          type: ClassicTetris3v3.NEXT_PIECE,
          piece: this.piece.name,
          nextPiece: this.next[0].name
        });

      } else {
        // can't place piece -it's game over
        this._setPiece();
        this.boardOverLoad = true
      }
      
    }
  }
  
  
  _triggerGameOver() {
    if(this.gameState === ClassicTetris3v3.STATE_GAME_OVER )return;
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
    this.gameState = ClassicTetris3v3.STATE_GAME_OVER;

    // fire game-over animation start event
    this._dispatch(ClassicTetris3v3.GAME_OVER_START, {
      type: ClassicTetris3v3.GAME_OVER_START,
      level: this.level,
      score: this.score,
      lines: this.lines,
      time: this.time
    });
  }

  _processGameOver() {
    if ((this.frameCounter % 6) === 0) {  //4) === 0) {
      ++this.gameOverLine;
      if (this.gameOverLine < this.boardHeight) {
        // paint next row
        for (let i = 0; i < this.boardWidth; ++i) this.board[this.gameOverLine][i] = 7;
      } else {
        // game-over animation is done -stop the game loop
        this.gameLoop = false;
        SendData(this)
        draw._render(this, myCanvas);
        // fire game-over animation end event
        this._dispatch(ClassicTetris3v3.GAME_OVER_END, {
          type: ClassicTetris3v3.GAME_OVER_END,
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
      if (this.gameState === ClassicTetris3v3.STATE_PAUSE) {
        this.gameState = this.previousGameState;

        // reset pointer flags
        this.pointerMoveDownEnabled = false;

        // resume theme song
        if (this.gameTheme) {
          this.gameTheme.play();
        }

        // fire resume event
        this._dispatch(ClassicTetris3v3.GAME_RESUME, {
          type: ClassicTetris3v3.GAME_RESUME,
          level: this.level,
          score: this.score,
          lines: this.lines,
        });

      } else {
        this.previousGameState = this.gameState;
        this.gameState = ClassicTetris3v3.STATE_PAUSE;

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
        this._dispatch(ClassicTetris3v3.GAME_PAUSE, {
          type: ClassicTetris3v3.GAME_PAUSE,
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
  // game rules: https://tetris.wiki/ClassicTetris3v3_(NES,_Nintendo)
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