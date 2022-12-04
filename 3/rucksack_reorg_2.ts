import getTextInput from "../get_text_input";

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

const data = getTextInput("input.txt");

const rucksacks = data.split("\n");

let prioritiesSum = 0;

let groupItemsMap: { [key: string]: number[] } = {};

rucksacks.forEach((rucksack, idx) => {
  // Are we in a new 3 elf group of rucksacks?
  if (idx % 3 === 0) {
    groupItemsMap = {};
  }

  // Items found in the rucksack
  const rucksackMap: { [key: string]: number } = {};

  for (const item of rucksack) {
    if (item in groupItemsMap) {
      if (!(item in rucksackMap)) {
        groupItemsMap[item].push(idx);
      }
    } else {
      groupItemsMap[item] = [idx];
    }

    rucksackMap[item] = idx;

    if (groupItemsMap[item].length === 3) {
      console.log(`Item found in all 3 groups: ${item}`);
      prioritiesSum += getCharPriority(item);
      break;
    }
  }
});

console.log(prioritiesSum);
