class Items {
  static ITEMS = [
    {id: 0, name: 'LockSpace',       url:"picture/Item/SpaceChain.png"},
    {id: 1, name: 'Defense',         url:'picture/Item/defense.png'},
    {id: 2, name: 'HardHoldOn',      url:"picture/Item/CompulsoryHold.png"},
    {id: 3, name: 'LeftRightChange', url:"picture/Item/MoveChange.png"},
    {id: 4, name: 'BlockPreview',    url:"picture/Item/shadow.png"},
    {id: 5, name: 'ChangeTetris',    url:"picture/Item/PieceChange.png"},
    {id: 6, name: 'LockTetris',      url:"picture/Item/PieceChain.png"},
  ]
  constructor(){
    this.getItem = undefined
    this.itemNumber = -1
  
    this.defense = false
    this.itemLeftRightChange = false
    this.itemBlockPreview = false
    this.itemLockTetris = false
    this.itemLockSpace = false
    this.itemHoldOn = false
    this.itemChangeTetris = false;
  }
  _itemExecute(){
    console.log(this.getItem, this.itemNumber)
    if(this.defense !== true){
      switch(this.getItem){
        case 'LockSpace':       this.setItemLockSpace(); break;
        case 'HardHoldOn':      this.setHardHoldOn(); break;
        case 'LeftRightChange': this.setLeftRightChange(); break;
        case 'BlockPreview':    this.setBlockPreview(); break;
        case 'ChangeTetris':    this.setChangeOpponentTetris(); break;
        case 'LockTetris':      this.setLockOpponentTetris(); break;
        // case 'Defense':         this.defense = true; break;
      }
    }
    else {
      this.defense = false;
      console.log ("防禦成功");
    }
  }
  
  setItemLockSpace() { 
    this.itemLockSpace = true;
    setTimeout( () => {
      this.itemLockSpace = false;
    }, 10000 );
  }
  
  setHardHoldOn() {
    this.itemHoldOn = true
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
    this.itemChangeTetris = true;
  }
  
  setLockOpponentTetris() { 
    this.itemLockTetris = true;
    setTimeout( () => {
      this.itemLockTetris = false;
    }, 3000 );
  }
  _randomAItem(){
    this.itemNumber = Math.floor(Math.random() * Items.ITEMS.length)
  }
  _getItem() {
    this.changeItemIcon();
  }

  changeItemIcon(pos, num) {
    let itemIcon = pos;
    let delayTime = 0;
    let interval;
    let finalNum = num
    let NumberTmp = this.randomIcon(-1)
    let t = this
    changeIcon()
    // Function that run at irregular intervals
    function changeIcon() {
      // Clears the previous setInterval timer
      clearInterval(interval);
      if (delayTime < 1000) {
        t.takingItemSound.currentTime = 0;
        t.takingItemSound.play();
        NumberTmp = t.randomIcon(NumberTmp)
        itemIcon.src = Items.ITEMS[NumberTmp].url;
      }
      else if (delayTime == 1000){
        t.takeEndItemSound.currentTime = 0;
        t.takeEndItemSound.play();
        itemIcon.src = Items.ITEMS[finalNum].url;
      }
      else {return 0;}
      
      delayTime += 200;
      interval = setInterval(changeIcon, delayTime);
    }
    
  }
  randomIcon(tmp) {
    let random = tmp
    while (random === tmp) {
      random = Math.floor(Math.random() * Items.ITEMS.length);
    }return random;
  }
  // itemdelay() {return new Promise(resolve => { });}
}