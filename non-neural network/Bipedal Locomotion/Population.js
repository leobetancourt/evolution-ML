function Population() {
  this.creatures = [];
  this.popsize = 20;
  this.maxfit = 0;

  for (var i = 0; i < this.popsize; i++) {
    this.creatures[i] = new Creature();
  }

  this.evaluate = function() {
    var maxfit = 0;
    for (var i = 0; i < this.popsize; i++) {
      this.creatures[i].calcFitness();

      if (this.creatures[i].fitness > maxfit) {
        maxfit = this.creatures[i].fitness;
      }

      if (this.creatures[i].crashed()) {
	this.creatures[i].fitness /= 10;
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
    for (var i = 0; i < this.popsize; i++) {
      var indexA = Math.floor(Math.random() * (this.matingpool.length));
      var parentA = this.matingpool[indexA].dna;
      var indexB = Math.floor(Math.random() * (this.matingpool.length));
      var parentB = this.matingpool[indexB].dna;
      var child = parentA.crossover(parentB);
      child.mutation();

      newCreatures[i] = new Creature(child);
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
      if (this.creatures[i].crashed()) {

        /* this.creatures[i].limbs.torso.SetActive(false);
        this.creatures[i].limbs.thighA.SetActive(false);
        this.creatures[i].limbs.thighB.SetActive(false);
        this.creatures[i].limbs.calfA.SetActive(false);
        this.creatures[i].limbs.calfB.SetActive(false);
        this.creatures[i].limbs.footA.SetActive(false);
        this.creatures[i].limbs.footB.SetActive(false); */

        world.DestroyBody(this.creatures[i].limbs.torso);
        world.DestroyBody(this.creatures[i].limbs.thighA);
        world.DestroyBody(this.creatures[i].limbs.thighB);
        world.DestroyBody(this.creatures[i].limbs.calfA);
        world.DestroyBody(this.creatures[i].limbs.calfB);
        world.DestroyBody(this.creatures[i].limbs.footA);
        world.DestroyBody(this.creatures[i].limbs.footB);

        if (!this.creatures[i].crash) {
            deathcount++;
            this.creatures[i].crash = true;
        }

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
        world.DestroyBody(this.creatures[i].limbs.footA);
        world.DestroyBody(this.creatures[i].limbs.footB);
      }

    }

  }
