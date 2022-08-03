class profession extends EnergyBar{
  static COST = {
    Attacker: 7,
    Defender: 8,
    Magician: 10
  }
  constructor(config, bar, energy){
    super(bar, energy, profession.COST[config.profession])
    this.pro = config.profession
    this.action = false
    this.attack_sound = new Audio ("audio/attack_sound.wav");
    this.defence_sound = new Audio ("audio/defence_sound.wav");
    this.magician_sound = new Audio ("audio/magician_sound.wav");
    this.attack_sound.volume = 0.5;
    this.defence_sound.volume = 0.5;
    this.magician_sound.volume = 0.5;
  }
  changeProfession(config) {
    this.pro = config.profession
    if (this.pro == "Attacker") {
      this.attack_sound.currentTime = 0;
      this.attack_sound.play();
    } else if (this.pro == "Defender") {
      this.defence_sound.currentTime = 0;
      this.defence_sound.play();
    } else {
      this.magician_sound.currentTime = 0;
      this.magician_sound.play();
    }
    console.log('change to '+this.pro)
    this.costEnergy = profession.COST[this.pro]
    this.resetCnt()
  }
  act() {
    this.action = true
  }
}
