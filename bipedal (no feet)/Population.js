function Population() {
  this.creatures = [];
  this.popsize = 30;
  this.count = 0;

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
      // while (this.matingpool[indexA] === this.matingpool[indexB]) {
      //   indexB = Math.floor(Math.random() * (this.matingpool.length));
      // }
      var parentB = this.matingpool[indexB].dna;
      console.log(this.matingpool[indexA], this.matingpool[indexB]);

      var child = parentA.crossover(parentB);

      newCreatures[i] = new Creature(this.count, child);
      this.count++;
    }

    this.creatures = newCreatures;
  }

  this.draw = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.creatures[i].draw();
    }
  }

  this.update = function() {
    for (var i = 0; i < this.creatures.length; i++) {

      this.creatures[i].checkSpeed();

      if (this.creatures[i].crash || this.creatures[i].tooSlow === true) {

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

        if (!this.creatures[i].diedAlready) {
          deathcount++;
          this.creatures[i].diedAlready = true;
        }
        this.creatures[i].crash = false;
      } else {
        this.creatures[i].move();
      }
    }
  }

  this.deletePopulation = function() {
    for (var i = 0; i < this.popsize; i++) {
      for (var j = 0; j < this.creatures[i].joints.allJoints.length; j++) {
        world.DestroyJoint(this.creatures[i].joints.allJoints[j]);
      }

      world.DestroyBody(this.creatures[i].limbs.torso);
      world.DestroyBody(this.creatures[i].limbs.thighA);
      world.DestroyBody(this.creatures[i].limbs.thighB);
      world.DestroyBody(this.creatures[i].limbs.calfA);
      world.DestroyBody(this.creatures[i].limbs.calfB);
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
      }
    }

    var creaturepos = this.creatures[maxcreature].limbs.torso.GetPosition();
    if ((creaturepos.x * 30) > (window.innerWidth / 2)) {
      ctx.translate((-creaturepos.x * SCALE) + (window.innerWidth / 2), 0);
    }
  }
}
