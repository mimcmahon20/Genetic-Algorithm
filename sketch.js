let w, h;
let population;
let target;
let counter;
let obstacles;
let lifeP, genP, fitP;
let sliderLifespan, sliderMutationRate;
let lifeSpan, mutateRate;
let runningBox;
let running;

//runs once at the start of the program, helps instantiate variables
function setup() {
  createCanvas(500, 500);
  population = new Population(250, 100);
  population.init();

  target = new Target(250, 20, 30);
  obstacles = [];
  obstaclesSetup();
  counter = 0;
  setupHTMLElements();
  running = false;
}

//runs every frame
function draw() {
  background(220);
  lifeSpan = sliderLifespan.value();
  mutateRate = sliderMutationRate.value();
  population.lifespan = lifeSpan;
  population.mutateRate = mutateRate;
  runningBox.changed(toggleSimulation);

  if (running) {
    runSimulation();
    counter++;
  } else {
    population.draw();
    target.draw();
    obstacles.forEach((obs) => obs.draw());
  }

  generateHTMLElements();
}

// Toggle the simulation on and off
function toggleSimulation() {
  if (runningBox.checked()) {
    running = true;
    runningBox.style("color", "rgb(20,255,20,255)");
  } else {
    running = false;
    runningBox.style("color", "rgb(205,20,20,255)");
  }
}

// Run the simulation
function runSimulation() {
  if (counter == lifeSpan) {
    population.evaluate();
    population.selection();
    counter = 0;
  }
  population.update();
  population.draw();
  target.draw();
  obstacles.forEach((obs) => obs.draw());
}

// Generate the HTML elements
function generateHTMLElements() {
  push();
  lifeP.html("Time left: " + (lifeSpan - counter));
  genP.html("Generation: " + population.generation);
  fitP.html("Max fitness: " + population.maxFitness * 10);
  let fitnessColor = map(population.maxFitness, 0, 1, 0, 255);
  fitP.style("color", "rgb(0," + fitnessColor + ",0,255)");
}

// Setup the HTML elements
function setupHTMLElements() {
  runningBox = createCheckbox("Running ", false);
  runningBox.style("color", "rgb(255,20,20,255)");
  lifeP = createP();
  genP = createP();
  fitP = createP();
  sliderLifespan = createSlider(100, 1000, 100);
  sliderMutationRate = createSlider(0, 1, 0.01, 0.001);
}

// Setup the obstacles
function obstaclesSetup() {
  obstacles.push(new Obstacle(200, 250, 350, 50, 135, 206, 235, "c"));
  //obstacles.push(new Obstacle(100, 100, 400, 50, 135, 206, 235, "r"));

}
