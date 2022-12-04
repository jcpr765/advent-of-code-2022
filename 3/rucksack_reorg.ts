import getTextInput from "../get_text_input";

const data = getTextInput("input.txt");

const rucksacks = data.split("\n");

const a = "a".charCodeAt(0);
const z = "z".charCodeAt(0);
const A = "A".charCodeAt(0);
const Z = "Z".charCodeAt(0);

const isLowerCase = (charCode: number): boolean => {
  return charCode >= a && charCode <= z;
};

const getCharPriority = (char: string): number => {
  const charCode = char.charCodeAt(0);

  return isLowerCase(charCode) ? charCode - a + 1 : charCode - A + 27;
};

let prioritiesSum = 0;

for (const rucksack of rucksacks) {
  const middle = rucksack.length / 2;

  const firstCompartment = rucksack.slice(0, middle);

  const secondCompartmnet = rucksack.slice(middle);

  const firstCompartmentMap: { [key: string]: number } = {};

  for (const item of firstCompartment) {
    firstCompartmentMap[item] = 1;
  }

  for (const item of secondCompartmnet) {
    if (item in firstCompartmentMap) {
      prioritiesSum += getCharPriority(item);
      break;
    }
  }
}

console.log(prioritiesSum);
