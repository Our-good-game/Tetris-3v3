class profession {
  static COST = {
    Attacker: 5,
    Defender: 7,
    Magician: 10
  }
  constructor(config){
    this.pro = config.profession
    this.costEnergy = profession.COST[this.pro]
    this.action = false
  }
  changeProfession(config) {
    this.pro = config.profession
    console.log('change to '+this.pro)
    this.costEnergy = profession.COST[this.pro]
  }
  act() {
    this.action = true
  }
}
