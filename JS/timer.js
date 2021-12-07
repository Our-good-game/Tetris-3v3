class  timecount{
    constructor(canvas){
      this.GameCountTime = 120;
      this.run = false
      this.pause=true
      this.loop=true
      this.canvas = canvas;
      this.context = this.canvas.getContext('2d');
      draw._rendertime(this,this.GameCountTime)
    }
    async running (){
      if (this.run) return;
      this.run = true;
      while(this.loop){
        if(this.pause){this.GameCountTime-=0.2;}
        if(this.GameCountTime <= 0.4)this.loop=false
        await this.secondcount();
        draw._rendertime(this,this.GameCountTime)
      }
      this.loop=true;
      this.run=false;
    }
    settime(trigger){
      this.pause=trigger;
      this.running()
    }
    resettime(){
      this.loop=false;
      this.running();
      this.GameCountTime = 120;
    }
    secondcount() {return new Promise(resolve => { setTimeout( () => {resolve();}, 200 );});}
}