class EnergyBar {
  constructor(bar, energy, cost) {
    this.bar =  bar;
    this.energy = energy
    bar.style.top = window.innerHeight * 0.45 + "px";
    bar.style.left = window.innerWidth * 0.32 + "px";
    this.cnt = 0
    this.costEnergy = cost
  }    

  modifyEnergy (burnOn) {
    this.cnt += burnOn
    if (this.cnt >= this.costEnergy) {
      this.act();
      this.cnt %= this.costEnergy
    }
    energy.style.height = (this.cnt * (100 / this.costEnergy)) + '%';
  }
  resetCnt(){
    this.cnt = 0
    this.modifyEnergy (0)
  }
}