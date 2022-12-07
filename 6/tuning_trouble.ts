import getTextInput from "../get_text_input";

/*
  I'll try to write my thoughts a bit more for this one:

  1) I bet I could do the string eval easier with regex somehow but my regex is not good.
  Will make another version that tries it but I'd need to google around and wanna
  try with no help first.

  2) Will read through the string by looking at each possible 4 len substring and looking
    for duplicate characters. On the first one I find I can break from the loop and return the position

    How will I check for repeats? 

    Well, for each 4 letter substring, I can go through the letters and add them to an object.
    If I have 4 keys in the object by the end of the iteration, then I know it was 4 unique letters.

*/

const findStartOfPacket = (data: string): number => {
  for (let idx = 0; idx + 3 < data.length; idx++) {
    const lastIdxOfSubstr = idx + 4;
    const substr = data.substring(idx, lastIdxOfSubstr);

    const uniqueLetters: { [letter: string]: number } = {};

    for (const letter of substr) {
      if (letter in uniqueLetters) break;
      uniqueLetters[letter] = 1;
    }

    if (Object.keys(uniqueLetters).length === 4) {
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
