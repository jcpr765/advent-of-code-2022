import getTextInput from "../get_text_input";

const data = getTextInput("input.txt");

const scenicScoreUp = (forest: number[][], x: number, y: number): number => {
  let viewScore = 0;
  const tree = forest[y][x];
  for (let i = y - 1; i >= 0; i--) {
    viewScore++;
    const treeAbove = forest[i][x];
    if (treeAbove >= tree) {
      break;
    }
  }
  return viewScore;
};

const scenicScoredDown = (forest: number[][], x: number, y: number): number => {
  let viewScore = 0;
  const tree = forest[y][x];
  for (let i = y + 1; i < forest.length; i++) {
    viewScore++;
    const treeBelow = forest[i][x];
    if (treeBelow >= tree) {
      break;
    }
  }
  return viewScore;
};

const scenicScoreLeft = (forest: number[][], x: number, y: number): number => {
  let viewScore = 0;
  const tree = forest[y][x];
  for (let i = x - 1; i >= 0; i--) {
    viewScore++;
    const treeLeft = forest[y][i];
    if (treeLeft >= tree) {
      break;
    }
  }
  return viewScore;
};

const scenicScoreRight = (forest: number[][], x: number, y: number): number => {
  let viewScore = 0;
  const tree = forest[y][x];
  for (let i = x + 1; i < forest[0].length; i++) {
    viewScore++;
    const treeRight = forest[y][i];
    if (treeRight >= tree) {
      break;
    }
  }
  return viewScore;
};

const scenicScore = (forest: number[][], x: number, y: number): number => {
  return (
    scenicScoreUp(forest, x, y) *
    scenicScoredDown(forest, x, y) *
    scenicScoreLeft(forest, x, y) *
    scenicScoreRight(forest, x, y)
  );
};

const treeRows = data.split("\n");

const forest: number[][] = new Array(treeRows.length);

const forestWidth = treeRows[0].length;

treeRows.forEach((treeRow, idx) => {
  forest[idx] = treeRow.split("").map((num) => parseInt(num));
});

let highestScenicScore = 0;

for (let y = 1; y < forest.length - 1; y++) {
  for (let x = 1; x < forestWidth - 1; x++) {
    const score = scenicScore(forest, x, y);

    if (score > highestScenicScore) {
      highestScenicScore = score;
    }
  }
}

console.log(highestScenicScore);
