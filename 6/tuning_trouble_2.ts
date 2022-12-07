import getTextInput from "../get_text_input";

const DISTINCT_CHAR_COUNT = 14;

const findStartOfPacket = (data: string): number => {
  for (let idx = 0; idx + DISTINCT_CHAR_COUNT - 1 < data.length; idx++) {
    const lastIdxOfSubstr = idx + DISTINCT_CHAR_COUNT;
    const substr = data.substring(idx, lastIdxOfSubstr);

    const uniqueLetters: { [letter: string]: number } = {};

    for (const letter of substr) {
      if (letter in uniqueLetters) break;
      uniqueLetters[letter] = 1;
    }

    if (Object.keys(uniqueLetters).length === DISTINCT_CHAR_COUNT) {
      return lastIdxOfSubstr;
    }
  }

  return -1;
};

const data = getTextInput("input.txt");

// When looking through each separate test line in test.txt

// const data = getTextInput("test.txt");
// const lines = data.split("\n");
// for (const line of lines) {
//   const idx = findStartOfPacket(line);
//   console.log(idx);
// }

console.log(findStartOfPacket(data));
