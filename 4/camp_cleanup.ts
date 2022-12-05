import getTextInput from "../get_text_input";

const isEitherPairFullyContained = (
  pairOne: string,
  pairTwo: string
): boolean => {
  const [startOne, endOne] = pairOne.split("-");

  const [startTwo, endTwo] = pairTwo.split("-");

  const s1 = parseInt(startOne),
    e1 = parseInt(endOne),
    s2 = parseInt(startTwo),
    e2 = parseInt(endTwo);

  const isOneInTwo = s1 >= s2 && e1 <= e2;
  const isTwoInOne = s2 >= s1 && e2 <= e1;

  return isOneInTwo || isTwoInOne;
};

const data = getTextInput("input.txt");

const pairs = data.split("\n");

let totalFullyContainedPairs = 0;

for (const pair of pairs) {
  const [pairOne, pairTwo] = pair.split(",");

  if (isEitherPairFullyContained(pairOne, pairTwo)) {
    totalFullyContainedPairs += 1;
  }
}

console.log(totalFullyContainedPairs);
