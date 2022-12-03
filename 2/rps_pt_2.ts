import fs from "fs";

enum Moves {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

enum Results {
  Loss = 0,
  Draw = 3,
  Win = 6,
}

const elfMovesMap: { [key: string]: number } = {
  A: Moves.Rock,
  B: Moves.Paper,
  C: Moves.Scissors,
};

const desiredResultsMap: { [key: string]: number } = {
  X: Results.Loss,
  Y: Results.Draw,
  Z: Results.Win,
};

const loseMap: { [key: number]: number } = {
  [Moves.Rock]: Moves.Scissors,
  [Moves.Paper]: Moves.Rock,
  [Moves.Scissors]: Moves.Paper,
};

const winMap: { [key: number]: number } = {
  [Moves.Rock]: Moves.Paper,
  [Moves.Paper]: Moves.Scissors,
  [Moves.Scissors]: Moves.Rock,
};

const play = (elfMove: number, desiredResult: number): number => {
  // Return resulting points from play

  let myMove: number;

  if (desiredResult == Results.Loss) {
    myMove = loseMap[elfMove];
  } else if (desiredResult == Results.Win) {
    myMove = winMap[elfMove];
  } else {
    myMove = elfMove;
  }

  return desiredResult + myMove;
};

fs.readFile("input.txt", "utf-8", (err, data: string) => {
  if (err) {
    return console.log(err);
  }

  const games = data.split("\n");

  let myTotalScore: number = 0;

  for (const game of games) {
    let elfMove: string | number;
    let desiredResult: string | number;

    [elfMove, desiredResult] = game.split(" ");

    elfMove = elfMovesMap[elfMove] as number;
    desiredResult = desiredResultsMap[desiredResult] as number;

    myTotalScore += play(elfMove, desiredResult);
  }

  console.log(`Total score: ${myTotalScore}`);
});
