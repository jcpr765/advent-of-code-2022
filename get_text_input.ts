import fs from "fs";

const getTextInput = (path: string) =>
  fs.readFileSync(path, { encoding: "utf-8" });

export default getTextInput;
