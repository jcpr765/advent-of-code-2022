import getTextInput from "../get_text_input";

const data = getTextInput("input.txt");

let cycle = 1;
let x = 1;

enum Command {
  NOOP = "noop",
  ADDX = "addx",
}

const valuePerCycle: { [key: number]: number } = {};

const instructions = data.split("\n");

const logCycle = (cycle: number, x: number) => {
  valuePerCycle[cycle] = x * cycle;
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

let sum = 0;

for (let c = 20; c <= Object.keys(valuePerCycle).length; c += 40) {
  sum += valuePerCycle[c];
  console.log(`${c}: ${valuePerCycle[c]}`);
}

console.log(sum);
