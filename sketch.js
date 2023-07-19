let population;
let target;
let counter;
let obstacles;
let lifeP, genP, fitP;
let sliderLifespan, sliderMutationRate, sliderX, sliderY, sliderW, sliderH;
let x, y, w, h, s;
let sBox;
let lifeSpan, mutateRate;
let runningBox;
let running;
let topContainer, midContainer, bottomContainer;

//runs once at the start of the program, helps instantiate variables
function setup() {
  createCanvas(500, 500);
  population = new Population(250, 100);
  population.init();
  target = new Target(250, 20, 30);
  obstacles = [];
  x = 250;
  y = 250;
  w = 100;
  h = 100;
  s = "Circle";
  obstaclesSetup();
  counter = 0;
  setupHTMLElements();
  running = false;
}

//runs every frame
function draw() {
  background(0, 0, 0, 255);

  //update the variables
  sliderUpdate();
  population.lifespan = lifeSpan;
  population.mutateRate = mutateRate;
  runningBox.changed(toggleSimulation);
  sBox.changed(selectShape);
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
  topContainer = createDiv();
  lifeP.html("Time left: " + (lifeSpan - counter));
  genP.html("Generation: " + population.generation);
  fitP.html("Max fitness: " + population.maxFitness * 10);
  let fitnessColor = map(population.maxFitness, 0, 1, 0, 255);
  fitP.style("color", "rgb(0," + fitnessColor + ",0,255)");
}

// Setup the HTML elements
function setupHTMLElements() {
  runningBox = createCheckbox("Running ", false);
  sBox = createRadio();
  sBox.option("Circle");
  sBox.option("Rectangle");
  sBox.selected("Circle")
  runningBox.style("color", "rgb(255,20,20,255)");
  lifeP = createP();
  genP = createP();
  fitP = createP();
  sliderLifespan = createSlider(100, 1000, 100);
  sliderMutationRate = createSlider(0, 1, 0.01, 0.001);
  obstacleBars();
}

// Setup the obstacles
function obstaclesSetup() {
  obstacles.push(new Obstacle(x, y, w, h, 135, 206, 235, s));
  //obstacles.push(new Obstacle(200, 250, 350, 50, 135, 206, 235, "c"));
  //obstacles.push(new Obstacle(100, 100, 400, 50, 135, 206, 235, "r"));
}

// Setup the obstacle bars
function obstacleBars() {
  sliderX = createSlider(0, 500, 250);
  sliderY = createSlider(0, 500, 250);
  sliderW = createSlider(0, 400, 100);
  sliderH = createSlider(0, 400, 100);
}

// Update the sliders
function  sliderUpdate() {
  lifeSpan = sliderLifespan.value();
  mutateRate = sliderMutationRate.value();
  obstacles[0].vec.x = sliderX.value();
  obstacles[0].vec.y = sliderY.value();
  obstacles[0].w = sliderW.value();
  obstacles[0].h = sliderH.value();
}

function selectShape() {
  s=sBox.value();
  obstacles = [];
  obstaclesSetup();
}