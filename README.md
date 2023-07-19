# Genetic Algorithm Rocket Simulator Project

## Introduction

This project is a genetic algorithm rocket simulator built using the p5.js library. The objective of the simulation is for rockets (nodes) to find the target by optimizing their path over generations. The fitness of each rocket is determined by its raw distance to the target. The simulation allows the rockets to navigate through obstacles and borders. Users can interact with the simulator through HTML elements to control various aspects of the simulation, such as lifespan, mutation rate, and obstacle position and shape.

## Getting Started

To run the genetic algorithm rocket simulator, follow these steps:

1. Open the index.html file in a web browser.
2. The simulation canvas will be displayed, and below it, you'll find HTML elements to interact with the simulation.

## Simulator Components

### 1. Population

The `Population` class represents a population of rockets. It manages the rockets' lifecycle, including their generation, selection, and mutation. The population size can be set by the user.

### 2. Target

The `Target` class represents the target that the rockets need to reach. The target's position can be modified, and it will be displayed as a circle on the canvas.

### 3. Obstacles

Obstacles can be placed on the canvas to add complexity to the simulation. They are represented by rectangles or circles. The user can interactively adjust the obstacle's position, width, and height using HTML sliders.

### 4. Simulation Control

The following HTML elements control the simulation:

- **Running Checkbox**: Allows the user to start and stop the simulation. When checked, the simulation will run, and rockets will move. When unchecked, the simulation will pause, and rockets will stay in their current positions.
- **Shape Radio Buttons**: These radio buttons let the user choose between a circle or a rectangle shape for the obstacle.

### 5. HTML Elements

The project uses HTML elements (created with p5.js functions) to display information and control the simulation:

- `lifeP`: A paragraph displaying the remaining time left for each generation of rockets.
- `genP`: A paragraph displaying the current generation number.
- `fitP`: A paragraph displaying the maximum fitness achieved by a rocket in the current generation.

Sliders are used to control the following parameters:

- `sliderLifespan`: Sets the lifespan of each generation of rockets.
- `sliderMutationRate`: Sets the mutation rate for the genetic algorithm.
- `sliderX`, `sliderY`, `sliderW`, `sliderH`: Sliders to modify the position and dimensions of the obstacle.

## Simulation Flow

1. **Setup**: When the program starts, it initializes the canvas and sets up the initial variables, such as population size, target position, and obstacle location and shape.

2. **Draw**: This function runs continuously and updates the simulation elements. If the simulation is running, it calls the `runSimulation` function in each frame.

3. **Toggle Simulation**: The user can toggle the simulation on and off using the "Running" checkbox. When the simulation is running, rockets move, and the counter keeps track of the current generation's lifespan.

4. **Run Simulation**: The `runSimulation` function handles the rocket's movement and evolution. When the generation's lifespan (counter) is reached, it evaluates the rockets' fitness, selects the best-performing ones, and creates a new generation through crossover and mutation.

5. **Generate HTML Elements**: This function updates the HTML elements with relevant simulation information, such as time left in the generation, current generation number, and maximum fitness achieved.

6. **Setup HTML Elements**: This function creates and sets up the HTML elements used for controlling the simulation and obstacle settings.

7. **Obstacles Setup**: The obstacles are set up initially with default positions, dimensions, and shape. This function is called during the setup phase.

8. **Obstacle Bars**: This function creates sliders to control the position and dimensions of the obstacle. Users can interactively adjust the obstacle's properties.

9. **Slider Update**: The `sliderUpdate` function updates the simulation parameters (lifespan, mutation rate, and obstacle properties) based on the values of the corresponding sliders.

10. **Select Shape**: The `selectShape` function allows the user to change the shape of the obstacle (circle or rectangle) by selecting the appropriate radio button.

## Conclusion

The genetic algorithm rocket simulator is an interactive and educational tool that demonstrates the concept of genetic algorithms and how they can be applied to optimize solutions in a dynamic environment. By adjusting the simulation parameters and interacting with the obstacles, users can observe how the rockets evolve over generations to find the optimal path towards the target. This project serves as an excellent demonstration of genetic algorithms and their potential applications in various problem-solving scenarios.
