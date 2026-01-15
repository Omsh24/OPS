// Maze configuration for Pacman game
// 1 = wall, 0 = empty space
// Dimensions: 28 rows x 32 columns

export const maze = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,0,0,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,0,1,0,1,1,0,0,0,0,1,1,0,1,0,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,1,0,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,0,1,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,1],
  [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,0,0,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

// Helper function to get the value at a specific position
export const getMazeValue = (row, col) => {
  if (row < 0 || row >= maze.length || col < 0 || col >= maze[0].length) {
    return 1; // Out of bounds is considered a wall
  }
  return maze[row][col];
};

// Helper function to check if a position is a wall
export const isWall = (row, col) => {
  return getMazeValue(row, col) === 1;
};

// Helper function to check if a position is empty
export const isEmpty = (row, col) => {
  return getMazeValue(row, col) === 0;
};

// Helper function to check if a row has wrap-around (0s on both ends)
export const hasWrapAround = (row) => {
  if (row < 0 || row >= MAZE_ROWS) return false;
  // Check if both leftmost (col 0) and rightmost (col 31) are empty
  return maze[row][0] === 0 && maze[row][MAZE_COLS - 1] === 0;
};

// Helper function to get wrapped column position
export const getWrappedCol = (row, col) => {
  if (!hasWrapAround(row)) {
    // No wrap-around, but handle out of bounds
    if (col < 0) return 0;
    if (col >= MAZE_COLS) return MAZE_COLS - 1;
    return col;
  }
  
  // Wrap from left edge to right edge
  if (col < 0) {
    return MAZE_COLS - 1;
  }
  // Wrap from right edge to left edge
  if (col >= MAZE_COLS) {
    return 0;
  }
  return col;
};

// Maze dimensions
export const MAZE_ROWS = 28;
export const MAZE_COLS = 32;
