
function Population() {
  this.creatures = [];
  this.popsize = 30;
  this.count = 0;
  this.clicked = false;
  this.newdata = false;
  this.creatureData = [];
  this.bestCreature = 0;
  for (let i = 0; i < this.popsize; i++) {
    this.creatures[i] = new Creature(this.count);
    this.count++;
  }

  this.evaluate = function() {

    var maxfit = 0;

    for (var i = 0; i < this.popsize; i++) {
      this.creatures[i].calcFitness();

      if (this.creatures[i].fitness > maxfit) {
        maxfit = this.creatures[i].fitness;
      }
    }

    for (var i = 0; i < this.popsize; i++) {
      this.creatures[i].fitness /= maxfit;
    }

    this.matingpool = [];
    for (var i = 0; i < this.popsize; i++) {
      var n = this.creatures[i].fitness * 100;
      for (var j = 0; j < n; j++) {
        this.matingpool.push(this.creatures[i]);
      }
    }
  }

  this.selection = function() {

    var newCreatures = [];
    this.count = 0;
    for (var i = 0; i < this.popsize; i++) {
      var indexA = Math.floor(Math.random() * (this.matingpool.length));
      var parentA = this.matingpool[indexA].dna;

      var indexB = Math.floor(Math.random() * (this.matingpool.length));
      while (this.matingpool[indexA] === this.matingpool[indexB] && this.popsize === 20) {
        indexB = Math.floor(Math.random() * (this.matingpool.length));
      }
      var parentB = this.matingpool[indexB].dna;

      var child = parentA.crossover(parentB);

      newCreatures[i] = new Creature(this.count, child);
      this.count++;
    }

    this.creatures = newCreatures;
  }

  this.draw = function() {
    if (!this.clicked && !this.newdata) {
      for (var i = 0; i < this.popsize; i++) {
        this.creatures[i].draw();
      }
    } else if (!this.clicked && this.newdata) {
      for (var i = 0; i < this.creatureData.length; i++) {
        this.creatures[i] = this.creatureData[i];
        this.creatures[i].diedAlready = false;
        this.creatures[i].tooSlow = false;
        this.creatures[i].crash = false;
        this.creatures[i].fitness = 0;
        this.creatures[i].health = 100;

      }
      this.popsize = 30;
      this.newdata = false;
      for (var i = 0; i < this.popsize; i++) {
        this.creatures[i].draw();
      }
    } else if (this.clicked && !this.newdata) {

      for (var i = 0; i < this.popsize; i++) {
        this.creatures[i].draw();
      }
    } else if (this.clicked && this.newdata) {
      for (var i = 0; i < this.popsize; i++) {
        this.creatures[i].draw();
      }
    }
  }

  this.update = function() {
    for (var i = this.creatures.length - 1; i >= 0; i--) {
      this.creatures[i].checkSpeed();

      if (this.creatures[i].crash && this.creatures[i].diedAlready === false) {
        //Destroy Joints
        for (var j = 0; j < this.creatures[i].joints.allJoints.length; j++) {
          world.DestroyJoint(this.creatures[i].joints.allJoints[j]);
        }
        //Destroy Bodies
        world.DestroyBody(this.creatures[i].limbs.torso);
        world.DestroyBody(this.creatures[i].limbs.thighA);
        world.DestroyBody(this.creatures[i].limbs.thighB);
        world.DestroyBody(this.creatures[i].limbs.calfA);
        world.DestroyBody(this.creatures[i].limbs.calfB);
        world.DestroyBody(this.creatures[i].limbs.thighA2);
        world.DestroyBody(this.creatures[i].limbs.calfA2);
        world.DestroyBody(this.creatures[i].limbs.thighB2);
        world.DestroyBody(this.creatures[i].limbs.calfB2);
        if (!this.creatures[i].diedAlready) {
          deathcount++;
          this.creatures[i].diedAlready = true;
        }
      } else {
        this.creatures[i].move();
      }
    }
  }

  this.deletePopulation = function() {
    for (var i = this.popsize - 1; i >= 0; i--) {
      for (var j = 0; j < this.creatures[i].joints.allJoints.length; j++) {
        world.DestroyJoint(this.creatures[i].joints.allJoints[j]);
      }

      world.DestroyBody(this.creatures[i].limbs.torso);
      world.DestroyBody(this.creatures[i].limbs.thighA);
      world.DestroyBody(this.creatures[i].limbs.thighB);
      world.DestroyBody(this.creatures[i].limbs.calfA);
      world.DestroyBody(this.creatures[i].limbs.calfB);
      world.DestroyBody(this.creatures[i].limbs.thighA2);
      world.DestroyBody(this.creatures[i].limbs.calfA2);
      world.DestroyBody(this.creatures[i].limbs.thighB2);
      world.DestroyBody(this.creatures[i].limbs.calfB2);
    }

  }

  this.moveCamera = function() {
    var maxfitness = 0;
    var maxcreature = 0;

    for (var i = 0; i < this.creatures.length; i++) {
      this.creatures[i].calcFitness();

      if (this.creatures[i].fitness > maxfitness) {
        maxfitness = this.creatures[i].fitness;
        maxcreature = i;
        this.bestCreature = i;
      }
    }

    var creaturepos = this.creatures[maxcreature].limbs.torso.GetPosition();
    if ((creaturepos.x * 30) > (window.innerWidth / 2)) {
      ctx.translate((-creaturepos.x * SCALE) + (window.innerWidth / 2), 0);
    }
  }

  this.preserveBest = function() {
    if (this.clicked && !this.newdata) {
      for (var i = 0; i < this.popsize; i++) {
        this.creatureData[i] = this.creatures[i];
      }
      this.newdata = true;
      for (var i = this.popsize - 1; i >= 0; i--) {
        if (i !== this.bestCreature) {
          world.DestroyBody(this.creatures[i].limbs.torso);
          world.DestroyBody(this.creatures[i].limbs.thighA);
          world.DestroyBody(this.creatures[i].limbs.thighB);
          world.DestroyBody(this.creatures[i].limbs.calfA);
          world.DestroyBody(this.creatures[i].limbs.calfB);
          world.DestroyBody(this.creatures[i].limbs.thighA2);
          world.DestroyBody(this.creatures[i].limbs.calfA2);
          world.DestroyBody(this.creatures[i].limbs.thighB2);
          world.DestroyBody(this.creatures[i].limbs.calfB2);
          this.creatures.splice(i, 1);
        }
      }
      this.popsize = 1;
    }
  }
}
