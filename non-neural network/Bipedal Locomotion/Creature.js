function Creature(dna) {

  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }

  this.maxtorque = 200;
  this.fitness = 0;
  this.crash = false;

  this.draw = function() {

    this.limbs = new Limbs();

    this.joints = new Joints(this.limbs, this.maxtorque);
  }

  this.move = function() {

    for (var i = 0; i < this.joints.allJoints.length; i++) {
      this.joints.allJoints[i].SetMotorSpeed(this.dna.genes[i][counter / 25]);
    }
  }

  this.calcFitness = function() {
    var d = this.limbs.torso.GetPosition();
    if (d.x > 0) {
      this.fitness = d.x;
    } else {
      this.fitness = 0.1;
    }
  }

  this.crashed = function() {
    var p = this.limbs.torso.GetPosition();
    if (p.y > 12) {
      return true;
    } else {
      return false;
    }
  }
}
