class profession extends EnergyBar{
  static COST = {
    Attacker: 5,
    Defender: 7,
    Magician: 10
  }
  constructor(config, bar, energy){
    super(bar, energy, profession.COST[config.profession])
    this.pro = config.profession
    this.action = false
  }
  changeProfession(config) {
    this.pro = config.profession
    console.log('change to '+this.pro)
    this.costEnergy = profession.COST[this.pro]
    this.resetCnt()
  }
  act() {
    this.action = true
  }
}
