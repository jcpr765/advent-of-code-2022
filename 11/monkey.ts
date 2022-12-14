import getTextInput from "../get_text_input";

let data = getTextInput("input.txt");

data = data.replaceAll("\n\n", "\n").replaceAll("  ", "");

interface Monkey {
  id: number;
  items: number[];
  operation: (old: number) => number;
  divisibleBy: number;
  trueMonkeyId: number;
  falseMonkeyId: number;
  totalItemCount: number;
}

const opMap = (operation: string, operand: string): ((x: number) => number) => {
  const operandIsOld = operand === "old";

  switch (operation) {
    case "+":
      return (x: number) => x + (operandIsOld ? x : parseInt(operand));
    case "-":
      return (x: number) => x - (operandIsOld ? x : parseInt(operand));
    case "*":
      return (x: number) => x * (operandIsOld ? x : parseInt(operand));
    case "/":
      return (x: number) => x / (operandIsOld ? x : parseInt(operand));
    default:
      // Just a random number so I can know something's wrong
      return (x: number) => 841;
  }
};

const buildMonkey = (info: string[], idx: number): Monkey => {
  const [, , ...startingItems] = info[1].split(" ");
  // console.log(startingItems);

  const items = startingItems.map((item) => parseInt(item));

  const [, , , , op, operand] = info[2].split(" ");

  const operation = opMap(op, operand);

  const [, , , divisor] = info[3].split(" ");
  const [, , , , , trueMonkey] = info[4].split(" ");
  const [, , , , , falseMonkey] = info[5].split(" ");

  return {
    id: idx,
    items,
    operation,
    divisibleBy: parseInt(divisor),
    trueMonkeyId: parseInt(trueMonkey),
    falseMonkeyId: parseInt(falseMonkey),
    totalItemCount: 0,
  };
};

const doMonkeyRound = (monkeys: Monkey[]) => {
  monkeys.forEach((monkey: Monkey, idx) => {
    const { operation, divisibleBy, trueMonkeyId, falseMonkeyId } = monkey;
    monkey.totalItemCount += monkey.items.length;
    while (monkey.items.length > 0) {
      // console.log(`Monkey ${idx}`);
      const item = monkey.items.shift() as number;
      // console.log(`  Monkey inspects an item with a worry level of ${item}.`);
      let worryLevel = operation(item);
      // console.log(`    Worry level is ${worryLevel}`);
      worryLevel = Math.floor(worryLevel / 3);

      const toMonkeyId =
        worryLevel % divisibleBy === 0 ? trueMonkeyId : falseMonkeyId;

      monkeys[toMonkeyId].items.push(worryLevel);
      // console.log(
      //   `    Item with worry level ${worryLevel} is thrown to monkey ${toMonkeyId}.`
      // );
    }
  });
};

const monkeyInfo = data.split("\n");
const monkeys: Monkey[] = [];

for (let i = 0; i < monkeyInfo.length; i += 6) {
  monkeys.push(buildMonkey(monkeyInfo.slice(i, i + 6), i));
}

// for (const monkey of monkeys) {
//   console.log(monkey.id);
//   console.log(monkey.items);
//   console.log(monkey.operation);
//   console.log(monkey.divisibleBy);
//   console.log(monkey.trueMonkeyId);
//   console.log(monkey.falseMonkeyId);
// }

let rounds = 20;
while (rounds-- > 0) {
  doMonkeyRound(monkeys);
}

const [most, secondMost] = monkeys
  .map((monkey) => monkey.totalItemCount)
  .sort((a, b) => b - a)
  .slice(0, 2);

console.log(most * secondMost);
