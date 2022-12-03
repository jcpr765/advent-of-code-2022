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

const myMovesMap: { [key: string]: number } = {
  X: Moves.Rock,
  Y: Moves.Paper,
  Z: Moves.Scissors,
};

const play = (elfMove: number, myMove: number) => {
  const { Rock, Paper, Scissors } = Moves;

  if (elfMove === myMove) {
    return Results.Draw;
  }

  const IWin =
    (myMove === Rock && elfMove === Scissors) ||
    (myMove == Paper && elfMove === Rock) ||
    (myMove === Scissors && elfMove === Paper);

  if (IWin) {
    return Results.Win;
  }

  return Results.Loss;
};

fs.readFile("input.txt", "utf-8", (err, data: string) => {
  if (err) {
    return console.log(err);
  }

  const games = data.split("\n");

  let myTotalScore: number = 0;

  for (const game of games) {
    let elfMove: string | number;
    let myMove: string | number;

    [elfMove, myMove] = game.split(" ");

    elfMove = elfMovesMap[elfMove] as number;
    myMove = myMovesMap[myMove] as number;

    myTotalScore += play(elfMove, myMove) + myMove;
  }

  console.log(`Total score: ${myTotalScore}`);
});
