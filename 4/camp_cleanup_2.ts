import getTextInput from "../get_text_input";

const pairsHaveAnyOverlap = (pairOne: string, pairTwo: string): boolean => {
  const [startOne, endOne] = pairOne.split("-");

  const [startTwo, endTwo] = pairTwo.split("-");

  const s1 = parseInt(startOne),
    e1 = parseInt(endOne),
    s2 = parseInt(startTwo),
    e2 = parseInt(endTwo);

  const oneOverlapsTwo = (s1 >= s2 && s1 <= e2) || (e1 >= s2 && e1 <= e2);
  const twoOverlapsOne = (s2 >= s1 && s2 <= e1) || (e2 >= s1 && e2 <= e1);

  return oneOverlapsTwo || twoOverlapsOne;
};

const data = getTextInput("input.txt");

const pairs = data.split("\n");

let overlaps = 0;

for (const pair of pairs) {
  const [pairOne, pairTwo] = pair.split(",");

  if (pairsHaveAnyOverlap(pairOne, pairTwo)) {
    overlaps += 1;
  }
}

console.log(overlaps);
