class EnergyBar {
  constructor(bar, energy) {
    this.bar =  bar;
    this.energy = energy
    bar.style.top = window.innerHeight * 0.45 + "px";
    bar.style.left = window.innerWidth * 0.32 + "px";
    console.log (bar.style.top);
  }    

  modifyEnergy (lines) {
    energy.style.height = (lines % 10) * 10 + '%';
  }
}