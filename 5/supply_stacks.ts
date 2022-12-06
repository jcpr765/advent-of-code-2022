import getTextInput from "../get_text_input";

const buildStacks = (info: string[]): string[][] => {
  const stacks: string[][] = [];

  const emptySlot = "NIL";

  const numOfStacks = info[0].length / 3;

  for (let i = 0; i < numOfStacks; i++) stacks.push([]);

  for (let i = info.length - 1; i >= 0; i--) {
    const line = info[i];

    for (let x = 0; x < line.length; x += 3) {
      let item = line.substring(x, x + 3);

      if (item !== emptySlot) {
        item = item.replace("[", "").replace("]", "");

        const stackIdx = x / 3;

        stacks[stackIdx].push(item);
      }
    }
  }

  return stacks;
};

const move = (stacks: string[][], fromIdx: number, toIdx: number) => {
  const block: string = stacks[fromIdx].pop() as string;
  stacks[toIdx].push(block);
};

const processInstruction = (stacks: string[][], instruction: string) => {
  let [, amt, , from, , to] = instruction.split(" ");

  let amount = parseInt(amt),
    fromIdx = parseInt(from) - 1,
    toIdx = parseInt(to) - 1;

  while (amount-- > 0) {
    move(stacks, fromIdx, toIdx);
  }
};

const data = getTextInput("input.txt");

let [initialStacks, allInstructions] = data.split("\n\n");

// Replacing all empty slots / spaces with something I can track a little easier
initialStacks = initialStacks.replaceAll("    ", "NIL").replaceAll(" ", "");

let info = initialStacks.split("\n");

info = info.slice(0, -1);

const stacks = buildStacks(info);

const instructions = allInstructions.split("\n");

for (const instruction of instructions) {
  processInstruction(stacks, instruction);
}

let topOfEachStack = "";

for (const stack of stacks) {
  topOfEachStack = topOfEachStack + stack.pop();
}

console.log(topOfEachStack);
