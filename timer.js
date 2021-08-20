class  timecount{
    GameCountTime = 120;
    temp_sec = 0.017;
    run = false
    pause=true;
    loop=true;
    async running (){
        if (this.run) return;
        this.run = true;
        while(this.loop){
            if(this.pause){this.GameCountTime-=0.2;console.log(this.GameCountTime)}
            if(this.GameCountTime <= 0.4)this.loop=false
            await this.secondcount();
        }
        this.loop=true;
        this.run=false;
    }
    settime(trigger){
        this.pause=trigger;
        this.running()
    }
    resettime(){
        this.run=false;
        this.loop=false;
        this.running();
        this.GameCountTime = 120;
    }
    secondcount() { 
        return new Promise(resolve => {
            setTimeout(() => {
            resolve();
            }, 200);
        });
    }
}