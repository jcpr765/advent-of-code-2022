/*
If the head is ever two steps directly up, down, left, or right from the tail, the tail 
must also move one step in that direction so it remains close enough:

Otherwise, if the head and tail aren't touching and aren't in the same row or column,
the tail always moves one step diagonally to keep up:

*/
import getTextInput from "../get_text_input";

interface Coords {
  x: number;
  y: number;
}

enum Directions {
  North = "U",
  East = "R",
  South = "D",
  West = "L",
  NorthEast = "NE",
  NorthWest = "NW",
  SouthEast = "SE",
  SouthWest = "SW",
}

const markAsVisited = (x: number, y: number) => {
  const position = `${y},${x}`;
  if (!(position in visitedByTail)) {
    visitedByTail[position] = 1;
    // console.log("Marking a new spot as visited");
  }
};

const move = (direction: string, knot: Coords, shouldMark: boolean = false) => {
  // console.log(`Moving ${shouldMark ? "tail" : "head"} ${direction}`);

  let x = knot.x,
    y = knot.y;

  switch (direction) {
    case Directions.North:
      y -= 1;
      break;
    case Directions.East:
      x += 1;
      break;
    case Directions.South:
      y += 1;
      break;
    case Directions.West:
      x -= 1;
      break;
    case Directions.NorthEast:
      y -= 1;
      x += 1;
      break;
    case Directions.NorthWest:
      y -= 1;
      x -= 1;
      break;
    case Directions.SouthEast:
      y += 1;
      x += 1;
      break;
    case Directions.SouthWest:
      y += 1;
      x -= 1;
      break;
  }

  knot.x = x;
  knot.y = y;

  // console.log(`New position is (${y},${x})`);

  if (shouldMark) {
    markAsVisited(x, y);
  }
};

const adjustTail = () => {
  if (knotsAreTouching()) {
    return;
  }

  const xDistance = head.x - tail.x;
  const yDistance = head.y - tail.y;

  const isDirectDistance = xDistance === 0 || yDistance === 0;
  let direction: string = "";
  if (isDirectDistance) {
    direction = xDistance
      ? xDistance > 0
        ? "R"
        : "L"
      : yDistance > 0
      ? "D"
      : "U";
  } else {
    if (xDistance > 0 && yDistance > 0) {
      direction = "SE";
    } else if (xDistance > 0 && yDistance < 0) {
      direction = "NE";
    } else if (xDistance < 0 && yDistance > 0) {
      direction = "SW";
    } else if (xDistance < 0 && yDistance < 0) {
      direction = "NW";
    }
  }

  move(direction, tail, true);
};

const knotsAreTouching = () => {
  return Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1;
};

const data = getTextInput("input.txt");

const head: Coords = { y: 25, x: 25 };
const tail: Coords = { y: 25, x: 25 };

const visitedByTail: { [key: string]: number } = { [`25,25`]: 1 };

const movements = data.split("\n");

for (const movement of movements) {
  const [direction, amount] = movement.split(" ");

  for (let i = 0; i < parseInt(amount); i++) {
    move(direction, head);
    adjustTail();
  }
}

console.log(Object.keys(visitedByTail).length);
