class Attacker {
  constructor() {
    this.costEnergy = 5;
  }
  action() {
    console.log ("I am attacker");
    socket.emit ('attack', config);
  }
}

class Defender {
  constructor() {
    this.costEnergy = 7;
  }
  action() {
    console.log ("I am defender");
    socket.emit ('defend', config);
  }
}

class Magician {
  constructor() {
    this.costEnergy = 10;
  }
  action() {
    console.log ("I am magician");
  }
}