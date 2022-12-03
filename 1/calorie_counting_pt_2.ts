import fs from "fs";

fs.readFile("input.txt", "utf-8", (err: any, data: string) => {
  if (err) {
    return console.log(err);
  }

  const elfFoodPacks = data.split("\n\n");

  console.log("Total elves", elfFoodPacks.length);

  let caloriesPerElf: number[] = [];

  elfFoodPacks.forEach((foodPack: string, id: number) => {
    // console.log(`Elf #${id + 1} foods:\n`, foodPack);

    const calorieTotal: number = foodPack
      .split("\n")
      .map((food) => parseInt(food, 10))
      .reduce(
        (caloriesSum: number, currentFoodCal: number) =>
          caloriesSum + currentFoodCal
      );

    console.log(`Elf #${id + 1} calorie total: `, calorieTotal);

    caloriesPerElf.push(calorieTotal);
  });

  caloriesPerElf.sort((a, b) => b - a);

  const sumOfTop3: number = caloriesPerElf
    .slice(0, 3)
    .reduce((caloriesSum, currentTotal) => caloriesSum + currentTotal);

  console.log("Total calories of the top 3 elves: ", sumOfTop3);
});
