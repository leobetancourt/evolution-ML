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
    this.torso = createLimb(1, 10, 0.2, 70, 12, 100, 75, torsoa, ground, false);
    this.thighA = createLimb(1, 10, 0.2, 8, 40, 100, 75, thigha, ground, false);
    this.thighB = createLimb(1, 10, 0.2, 8, 40, 100, 75, thighb, ground, false);

    this.jointa = createJoint(this.torso, this.thighA, new b2Vec2(70 / SCALE, 0 / SCALE), new b2Vec2(0 / SCALE, -40 / SCALE));
    this.jointa.EnableMotor(true);
    this.jointa.SetMaxMotorTorque(this.maxtorque);
    this.jointa.EnableLimit(true);
    this.jointa.SetLimits(-45 * dtog, 45 * dtog);

    this.jointb = createJoint(this.torso, this.thighB, new b2Vec2(-70 / SCALE, 0 / SCALE), new b2Vec2(0 / SCALE, -40 / SCALE));
    this.jointb.EnableMotor(true);
    this.jointb.SetMaxMotorTorque(this.maxtorque);
    this.jointb.EnableLimit(true);
    this.jointb.SetLimits(-45 * dtog, 45 * dtog);
  }

  this.move = function() {

    this.jointa.SetMotorSpeed(this.dna.genesa[counter]);
    this.jointb.SetMotorSpeed(this.dna.genesb[counter]);
  }

  this.calcFitness = function() {
    var d = this.torso.GetPosition();

    this.fitness = d.x;
  }

  this.crashed = function() {
    var p = this.torso.GetPosition();
    if (p.y > 16) {
      return true;
    } else {
      return false;
    }
  }
}
