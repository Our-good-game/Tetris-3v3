class EnergyBar {
  constructor(bar, energy) {
    this.bar =  bar;
    this.energy = energy
    bar.style.top = window.innerHeight * 0.45 + "px";
    bar.style.left = window.innerWidth * 0.32 + "px";
    // console.log (bar.style.top);
  }    

  modifyEnergy () {
    if (gamecore.burnOn >= config.profession.costEnergy) {
      config.profession.action();
      console.log (gamecore.burnOn);
      gamecore.burnOn %= config.profession.costEnergy;
      console.log (gamecore.burnOn);
    }
    energy.style.height = (gamecore.burnOn * (100 / config.profession.costEnergy)) + '%';
    console.log (energy.style.height);
    // console.log (gamecore.burnOn);

  }
}