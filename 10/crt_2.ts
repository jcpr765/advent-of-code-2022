import getTextInput from "../get_text_input";

const data = getTextInput("input.txt");

let cycle = 1;
let x = 1;

enum Command {
  NOOP = "noop",
  ADDX = "addx",
}

const xPerCycle: { [key: number]: number } = {};

const instructions = data.split("\n");

const logCycle = (cycle: number, x: number) => {
  xPerCycle[cycle] = x;
};

for (const instruction of instructions) {
  const [command, num] = instruction.split(" ");

  if (command === Command.ADDX) {
    logCycle(cycle++, x);
    logCycle(cycle++, x);
    x += parseInt(num);
  } else {
    logCycle(cycle++, x);
  }
}

const paintCRTRow = (start: number): string => {
  let row = "";
  for (let i = 0; i < 40; i++) {
    const spriteMiddle = xPerCycle[i + start];

    row += Math.abs(i - spriteMiddle) <= 1 ? "#" : ".";
  }
  return row;
};

const paintCRT = () => {
  for (let i = 1; i <= 201; i += 40) {
    console.log(paintCRTRow(i));
  }
};

paintCRT();
