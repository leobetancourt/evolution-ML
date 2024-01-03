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
  this.calfATouch = false;
  this.calfBTouch = false;
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

    //Body Angle of torso
    this.bodyAngle = this.limbs.torso.GetAngle();
    this.inputs.push(this.bodyAngle);

    //2 touch sensors of feet
    this.cATouch = -1;
    if (this.calfATouch) {
      this.cATouch = 1;
    } else {
      this.cATouch = -1;
    }

    this.cBTouch = -1;
    if (this.calfBTouch) {
      this.calfBTouch = 1;
    } else {
      this.calfBTouch = -1;
    }

    this.inputs.push(this.cATouch);
    this.inputs.push(this.cBTouch);

    for (var i = 0; i < this.joints.allJoints.length; i++) {
      this.inputs.push(this.joints.allJoints[i].GetJointAngle());
    }

    this.motorspeeds = this.dna.calculateOutputs(this.inputs);
    for (var i = 0; i < this.joints.allJoints.length; i++) {
      this.joints.allJoints[i].SetMotorSpeed(this.motorspeeds[i]);
    }
  }

  this.calcFitness = function() {
    var d = this.limbs.torso.GetPosition();
    if (d.x > 0) {
      var distance = d.x - 9;
      this.fitness = distance ** 2;
    } else {
      this.health -= 5;
    }
  }

  this.checkSpeed = function() {
    var speed = this.limbs.torso.GetLinearVelocity();
    if (speed.x < 2 && counter > 150) {
      this.health = this.health - 0.5;
    }
    if (this.health < 0) {
      this.tooSlow = true;
    }
  }
}
