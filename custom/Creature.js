function Creature(userd, dna) {

  if (dna === undefined) {
    this.dna = new DNA();
  } else {
    this.dna = dna;
  }

  this.userdata = userd;
  this.maxtorque = 400;
  this.fitness = 0;
  this.crash = false;
  this.legATouch = -1;
  this.legBTouch = -1;
  this.legCTouch = -1;
  this.health = 100;
  this.diedAlready = false;
  this.tooSlow = false;
  this.joints;
  this.limbs;

  this.draw = function() {

    this.limbs = new Limbs(this.userdata);

    this.joints = new Joints(this.limbs, this.maxtorque);
  }

  this.move = function() {
    this.inputs = [];

    //Bias
    this.bias = 2;
    this.inputs.push(this.bias);

    //3 touch sensors

    this.inputs.push(this.legATouch);
    this.inputs.push(this.legBTouch);
    this.inputs.push(this.legCTouch);

    for (var i = 0; i < this.joints.allJoints.length; i++) {
      this.inputs.push(this.joints.allJoints[i].GetJointAngle());
    }

    this.motorspeeds = this.dna.calculateOutputs(this.inputs);
    for (var i = 0; i < this.joints.allJoints.length; i++) {
      this.joints.allJoints[i].SetMotorSpeed(this.motorspeeds[i]);
    }
  }

  this.calcFitness = function() {
    var d = this.limbs.legC.GetPosition();
    if (d.x > 0) {
      var distance = d.x - 11;
      this.fitness = distance ** 2;
    } else {
      this.health -= 5;
    }
  }

  this.checkSpeed = function() {
    var speed = this.limbs.legC.GetLinearVelocity();
    if (/*speed.x < 1 && counter > 150*/false) {
      this.health = this.health - 0.5;
    }
    if (this.health < 0) {
      this.tooSlow = true;
    }
  }
}
