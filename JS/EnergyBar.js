class EnergyBar {
  constructor(bar, energy) {
    this.bar =  bar;
    this.energy = energy
    bar.style.top = window.innerHeight * 0.45 + "px";
    bar.style.left = window.innerWidth * 0.32 + "px";
  }    

  modifyEnergy () {
    if (gamecore.burnOn >= myProfession.costEnergy) {
      myProfession.act();
      gamecore.burnOn %= myProfession.costEnergy;
    }
    energy.style.height = (gamecore.burnOn * (100 / myProfession.costEnergy)) + '%';
    console.log (energy.style.height);
  }
}