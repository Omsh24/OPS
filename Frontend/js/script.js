import maze from "./maze.js";

class ExampleScene extends Phaser.Scene {
  ball;
  gridSize = 10; // Size of each grid cell
  cols = 48; // Number of columns (480 / 10)
  rows = 32; // Number of rows (320 / 10)
  playerGridX = 1; // Starting grid position X
  playerGridY = 1; // Starting grid position Y
  targetGridX = 1; // Target grid position X
  targetGridY = 1; // Target grid position Y
  cursors;
  currentDirection = null; // Current movement direction: 'up', 'down', 'left', 'right', or null
  moveSpeed = 50; // Pixels per second
  isMoving = false; // Whether player is currently moving between cells

  // Maze layout: 1 = wall, 0 = path
  // This is a simple maze pattern - you can customize it
  // Doubled size: 32 rows x 48 columns
  maze = maze;

  preload() {
    this.load.image("ball", "img/ball.png");
    this.load.image("paddle", "img/paddle.png");
  }

  create() {
    // Create the maze walls
    this.createMaze();

    // Create the player (ball) at starting position
    const startX = this.playerGridX * this.gridSize + this.gridSize / 2;
    const startY = this.playerGridY * this.gridSize + this.gridSize / 2;
    this.ball = this.add.sprite(startX, startY, "ball");
    this.ball.setOrigin(0.5, 0.5);
    this.ball.setDisplaySize(8, 8);
    
    // Initialize target position
    this.targetGridX = this.playerGridX;
    this.targetGridY = this.playerGridY;

    // Set up keyboard controls
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // Also support WASD keys
    this.wasd = this.input.keyboard.addKeys('W,S,A,D');
  }

  createMaze() {
    // Draw walls based on the maze array
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.maze[row][col] === 1) {
          // Create a wall tile
          const wallX = col * this.gridSize + this.gridSize / 2;
          const wallY = row * this.gridSize + this.gridSize / 2;
          
          // Use paddle image as wall (scaled to fit grid)
          const wall = this.add.sprite(wallX, wallY, "paddle");
          wall.setOrigin(0.5, 0.5);
          wall.setDisplaySize(this.gridSize, this.gridSize);
          wall.setTint(0xff0000); // Red color (use hex color codes)
        }
      }
    }
  }

  update(time, delta) {
    // Convert delta from milliseconds to seconds for smooth movement
    const deltaSeconds = delta / 1000;
    
    // Get current pixel position
    const currentTargetX = this.targetGridX * this.gridSize + this.gridSize / 2;
    const currentTargetY = this.targetGridY * this.gridSize + this.gridSize / 2;
    
    // Check if we've reached the target position (with small threshold)
    const distanceX = Math.abs(this.ball.x - currentTargetX);
    const distanceY = Math.abs(this.ball.y - currentTargetY);
    const threshold = 1; // pixels
    
    if (distanceX < threshold && distanceY < threshold) {
      // Reached target, update grid position
      this.playerGridX = this.targetGridX;
      this.playerGridY = this.targetGridY;
      this.ball.x = currentTargetX;
      this.ball.y = currentTargetY;
      this.isMoving = false;
    }
    
    // Check for new direction input
    let newDirection = null;
    
    // Up arrow or W
    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      newDirection = 'up';
    }
    // Down arrow or S
    else if (this.cursors.down.isDown || this.wasd.S.isDown) {
      newDirection = 'down';
    }
    // Left arrow or A
    else if (this.cursors.left.isDown || this.wasd.A.isDown) {
      newDirection = 'left';
    }
    // Right arrow or D
    else if (this.cursors.right.isDown || this.wasd.D.isDown) {
      newDirection = 'right';
    }

    // Update direction if a new key is pressed and we're not moving
    if (newDirection !== null && !this.isMoving) {
      this.currentDirection = newDirection;
      
      // Try to start moving in the new direction
      let canMove = false;
      let nextGridX = this.playerGridX;
      let nextGridY = this.playerGridY;
      
      switch (this.currentDirection) {
        case 'up':
          if (this.canMoveTo(this.playerGridX, this.playerGridY - 1)) {
            nextGridY = this.playerGridY - 1;
            canMove = true;
          }
          break;
        case 'down':
          if (this.canMoveTo(this.playerGridX, this.playerGridY + 1)) {
            nextGridY = this.playerGridY + 1;
            canMove = true;
          }
          break;
        case 'left':
          if (this.canMoveTo(this.playerGridX - 1, this.playerGridY)) {
            nextGridX = this.playerGridX - 1;
            canMove = true;
          }
          break;
        case 'right':
          if (this.canMoveTo(this.playerGridX + 1, this.playerGridY)) {
            nextGridX = this.playerGridX + 1;
            canMove = true;
          }
          break;
      }
      
      if (canMove) {
        this.targetGridX = nextGridX;
        this.targetGridY = nextGridY;
        this.isMoving = true;
      } else {
        this.currentDirection = null;
      }
    }
    
    // Continue moving in current direction if key is still held
    if (this.currentDirection !== null && !this.isMoving) {
      let canMove = false;
      let nextGridX = this.playerGridX;
      let nextGridY = this.playerGridY;
      
      switch (this.currentDirection) {
        case 'up':
          if (this.canMoveTo(this.playerGridX, this.playerGridY - 1)) {
            nextGridY = this.playerGridY - 1;
            canMove = true;
          } else {
            this.currentDirection = null;
          }
          break;
        case 'down':
          if (this.canMoveTo(this.playerGridX, this.playerGridY + 1)) {
            nextGridY = this.playerGridY + 1;
            canMove = true;
          } else {
            this.currentDirection = null;
          }
          break;
        case 'left':
          if (this.canMoveTo(this.playerGridX - 1, this.playerGridY)) {
            nextGridX = this.playerGridX - 1;
            canMove = true;
          } else {
            this.currentDirection = null;
          }
          break;
        case 'right':
          if (this.canMoveTo(this.playerGridX + 1, this.playerGridY)) {
            nextGridX = this.playerGridX + 1;
            canMove = true;
          } else {
            this.currentDirection = null;
          }
          break;
      }
      
      if (canMove) {
        this.targetGridX = nextGridX;
        this.targetGridY = nextGridY;
        this.isMoving = true;
      }
    }
    
    // Smoothly interpolate towards target position
    if (this.isMoving) {
      const targetX = this.targetGridX * this.gridSize + this.gridSize / 2;
      const targetY = this.targetGridY * this.gridSize + this.gridSize / 2;
      
      const distanceX = targetX - this.ball.x;
      const distanceY = targetY - this.ball.y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      if (distance > threshold) {
        // Move towards target
        const moveDistance = this.moveSpeed * deltaSeconds;
        const moveRatio = Math.min(1, moveDistance / distance);
        
        this.ball.x += distanceX * moveRatio;
        this.ball.y += distanceY * moveRatio;
      }
    }
  }

  canMoveTo(gridX, gridY) {
    // Check bounds
    if (gridX < 0 || gridX >= this.cols || gridY < 0 || gridY >= this.rows) {
      return false;
    }
    // Check if the target cell is a wall
    return this.maze[gridY][gridX] === 0;
  }
}

const config = {
  type: Phaser.CANVAS,
  width: 480,
  height: 320,
  scene: ExampleScene,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: '#800080',
};

const game = new Phaser.Game(config);