const fs = require("fs");

fs.readFile("input.txt", "utf-8", (err: any, data: string) => {
  if (err) {
    return console.log(err);
  }

  const elfFoodPacks = data.split("\n\n");

  console.log("Total elves", elfFoodPacks.length);

  let maxCalories: number | undefined;

  elfFoodPacks.forEach((foodPack: string, id: number) => {
    console.log(`Elf #${id + 1} foods:\n`, foodPack);

    const calorieTotal: number = foodPack
      .split("\n")
      .map((food) => parseInt(food, 10))
      .reduce(
        (caloriesSum: number, currentFoodCal: number) =>
          caloriesSum + currentFoodCal
      );

    console.log(`Elf #${id + 1} calorie total: `, calorieTotal);

    if (!maxCalories || maxCalories < calorieTotal) {
      maxCalories = calorieTotal;
    }
  });

  console.log("Max calories carried by any elf: ", maxCalories);
});
