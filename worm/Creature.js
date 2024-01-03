function Creature(userd, dna) {

  if (dna === undefined) {
    this.dna = new DNA();
  } else {
    this.dna = dna;
  }

  this.userdata = userd;
  this.maxtorque = 150;
  this.fitness = 0;
  this.health = 100;
  this.diedAlready = false;
  this.tooSlow = false;
  this.headTouch = -1;
  this.legATouch = -1;
  this.legBTouch = -1;
  this.legCTouch = -1;
  this.legDTouch = -1;
  this.legETouch = -1;
  this.joints;
  this.limbs;
  this.inputs;

  this.draw = function() {

    this.limbs = new Limbs(this.userdata);

    this.joints = new Joints(this.limbs, this.maxtorque);
  }

  this.move = function() {
    this.inputs = [];

    //Bias
    this.bias = 1;
    this.inputs.push(this.bias);

    //Body Angle of torso
    this.bodyAngle = this.limbs.legB.GetAngle();
    this.inputs.push(this.bodyAngle);

    //5 touch sensors of feet
    this.inputs.push(this.headTouch);
    this.inputs.push(this.legATouch);
    this.inputs.push(this.legBTouch);
    this.inputs.push(this.legCTouch);
    this.inputs.push(this.legDTouch);
    this.inputs.push(this.legETouch);

    for (var i = 0; i < this.joints.allJoints.length; i++) {
      this.inputs.push(this.joints.allJoints[i].GetJointAngle());
    }


    this.motorspeeds = this.dna.calculateOutputs(this.inputs);
    for (var i = 0; i < this.joints.allJoints.length; i++) {
      this.joints.allJoints[i].SetMotorSpeed(this.motorspeeds[i]);
    }
  }

  this.calcFitness = function() {
    var d = this.limbs.legB.GetPosition();
    if (d.x > 0) {
      var distance = d.x - 11.6;
      this.fitness = distance ** 2;
    } else {
      this.health -= 5;
    }
  }

  this.checkSpeed = function() {
    var speed = this.limbs.legB.GetLinearVelocity();

    if (speed.x < 1 && counter > 150) {
      this.health = this.health - 0.5;
    }
    if (this.health < 0) {
      this.crash = true;
    }
  }
}
