class Population {
  constructor(size, lifespan) {
    if (size) {
      this.size = size;
    } else {
      this.size = 10;
    }
    this.rockets = [];
    this.matingPool = [];
    this.lifespan = lifespan;
    this.generation = 1;
    this.maxFitness = 0;
    this.mutateRate = 0.01;
    this.averageFitness = 0;
  }

  // Evaluate the fitness of the population
  evaluate() {
    // Finding the best fitness of this generation, and the number of successes

    let sumFitness = 0;
    let maxFitness = 0.0001;
    this.rockets.forEach((rocket) => {
      rocket.calcFitness();
        sumFitness += rocket.fitness;
      if (rocket.fitness > maxFitness) {
        maxFitness = rocket.fitness;
        this.maxFitness = maxFitness;
      }
    });
    //Calculating the average fitness of the generation
    this.averageFitness = sumFitness / this.size;

    //Normalizing the fitness of the generation
    this.rockets.forEach((rocket) => {
      rocket.fitness /= maxFitness;
    });

    //clears the mating pool from past generations
    this.matingPool = [];
    for (let i = 0; i < this.size; i++) {
      let n = this.rockets[i].fitness * 10;
      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.rockets[i]);
      }
    }
  }

  //simulating natural selection, pick 2 parents from the mating pool and create a child from them (crossover DNA function)
  selection() {
    if(this.matingPool.length == 0){
        this.init();
    } else {
        let newRockets = [];
        for (let i = 0; i < this.size; i++) {
          let randA = random(this.matingPool).DNA;
          let randB = random(this.matingPool).DNA;
          let child = randA.crossover(randB);
          child.mutate(this.mutateRate);
          newRockets[i] = new Rocket(createVector(250, 480), this.lifespan);
          newRockets[i].updateDNA(child);
        }
        this.generation++;
        this.rockets = newRockets;
    }

  }

  // Create a population of rockets
  init() {
    for (let i = 0; i < this.size; i++) {
      push();
      this.rockets.push(new Rocket(createVector(250, 480), this.lifespan));
      pop();
    }
  }

  // Run the population of rockets
  update() {
    this.rockets.forEach((rocket) => {
      rocket.update();
    });
  }

  // Render the population of rockets
  draw() {
    this.rockets.forEach((rocket) => {
      rocket.draw();
    });
  }

  resetPopulation() {
    this.rockets = [];
    this.matingPool = [];
    this.generation = 1;
    this.maxFitness = 0;
  }
}
