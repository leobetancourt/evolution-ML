function Population() {
  this.creatures = [];
  this.popsize = 20;
  this.maxfit = 0;

  for (var i = 0; i < this.popsize; i++) {
    this.creatures[i] = new Creature();
  }

  this.evaluate = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.creatures[i].calcFitness();
      if (this.creatures[i].crashed()) {
        this.creatures[i].fitness /= 1000;
      }
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
    for (var i = 0; i < this.creatures.length; i++) {
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

  this.run = function() {
    for (var i = 0; i < this.popsize; i++) {
      this.creatures[i].draw();
    }
  }

  this.update = function() {
    for (var i = 0; i < this.creatures.length; i++) {
      if (this.creatures[i].crashed() === false) {
        this.creatures[i].move();
      } else if (this.creatures[i].crashed() === true || this.creatures[i].crash === true) {
        this.creatures[i].crash = true;
        }
      }
    }

    this.deletePopulation = function() {
      for (var i = 0; i < this.popsize; i++) {
        world.DestroyJoint(this.creatures[i].jointa);
        world.DestroyJoint(this.creatures[i].jointb);

        world.DestroyBody(this.creatures[i].torso);
        world.DestroyBody(this.creatures[i].thighA);
        world.DestroyBody(this.creatures[i].thighB);
      }

    }

  }
