import getTextInput from "../get_text_input";

const data = getTextInput("input.txt");

const coveredUp = (forest: number[][], x: number, y: number) => {
  const tree = forest[y][x];
  for (let i = y - 1; i >= 0; i--) {
    const treeAbove = forest[i][x];
    if (treeAbove >= tree) {
      return true;
    }
  }
  return false;
};

const coveredDown = (forest: number[][], x: number, y: number) => {
  const tree = forest[y][x];
  for (let i = y + 1; i < forest.length; i++) {
    const treeBelow = forest[i][x];
    if (treeBelow >= tree) {
      return true;
    }
  }
  return false;
};

const coveredLeft = (forest: number[][], x: number, y: number) => {
  const tree = forest[y][x];
  for (let i = x - 1; i >= 0; i--) {
    const treeLeft = forest[y][i];
    if (treeLeft >= tree) {
      return true;
    }
  }
  return false;
};

const coveredRight = (forest: number[][], x: number, y: number) => {
  const tree = forest[y][x];
  for (let i = x + 1; i < forest[0].length; i++) {
    const treeRight = forest[y][i];
    if (treeRight >= tree) {
      return true;
    }
  }
  return false;
};

const covered = (forest: number[][], x: number, y: number) => {
  return (
    coveredUp(forest, x, y) &&
    coveredDown(forest, x, y) &&
    coveredLeft(forest, x, y) &&
    coveredRight(forest, x, y)
  );
};

const treeRows = data.split("\n");

const forest: number[][] = new Array(treeRows.length);

const forestWidth = treeRows[0].length;

treeRows.forEach((treeRow, idx) => {
  forest[idx] = treeRow.split("").map((num) => parseInt(num));
});

// Starting off with the edges
let visibleTrees = treeRows.length * 2 + (forestWidth - 2) * 2;

for (let y = 1; y < forest.length - 1; y++) {
  for (let x = 1; x < forestWidth - 1; x++) {
    const treeIsCovered = covered(forest, x, y);

    if (!treeIsCovered) {
      visibleTrees++;
    }
  }
}

console.log(visibleTrees);
