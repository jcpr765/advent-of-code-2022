import getTextInput from "../get_text_input";

const TOTAL_SPACE_AVAILABLE = 70000000;
const UPDATE_SPACE_NEEDED = 30000000;

interface Files {
  [filename: string]: number;
}

interface Directory {
  parent: Directory | null;
  files: Files;
  subdirectories: { [dirName: string]: Directory };
}

enum Command {
  CD = "cd",
  LS = "ls",
}

enum LSDefaultTarget {
  Root = "/",
  Back = "..",
}

const root: Directory = {
  parent: null,
  files: {},
  subdirectories: {},
};

let currentDir = root;

const processCommand = (terminalLine: string) => {
  const [, command, target] = terminalLine.split(" ") as [
    string,
    Command,
    string
  ];

  if (command === Command.CD) changeDirectory(target);
};

const changeDirectory = (target: string) => {
  const { Root, Back } = LSDefaultTarget;
  switch (target) {
    case Root:
      currentDir = root;
      return;
    case Back:
      currentDir = currentDir.parent ? currentDir.parent : root;
      return;
    default:
      currentDir = currentDir.subdirectories[target];
      return;
  }
};

const processLSOutput = (terminalLine: string) => {
  if (terminalLine.startsWith("dir")) {
    const [, target] = terminalLine.split(" ");

    if (!(target in currentDir.subdirectories)) {
      currentDir.subdirectories[target] = {
        parent: currentDir,
        files: {},
        subdirectories: {},
      };
    }
  } else {
    const [size, filename] = terminalLine.split(" ");

    if (!(filename in currentDir.files)) {
      currentDir.files[filename] = parseInt(size);
    }
  }
};

const terminalOutput = getTextInput("input.txt");

for (const terminalLine of terminalOutput.split("\n")) {
  if (terminalLine.startsWith("$")) {
    processCommand(terminalLine);
  } else {
    processLSOutput(terminalLine);
  }
}

// We've now built the whole tree. We just need the sizes

const dirSizes: { [dirName: string]: number } = {};

const getSizeofDir = (dir: Directory, dirName = "/"): number => {
  let sum = 0;

  for (const filename in dir.files) {
    sum += dir.files[filename];
  }

  for (const subDir in dir.subdirectories) {
    sum += getSizeofDir(
      dir.subdirectories[subDir],
      `${dirName === "/" ? "" : dirName}/${subDir}`
    );
  }

  dirSizes[dirName] = sum;

  return sum;
};

getSizeofDir(root);

for (const dirName in dirSizes) {
  console.log(`${dirName}: ${dirSizes[dirName]}`);
}

const sizeOccupied = dirSizes["/"];

const spaceAvailable = TOTAL_SPACE_AVAILABLE - sizeOccupied;

let smallestDeletion = sizeOccupied;

for (const dirName in dirSizes) {
  const directorySize = dirSizes[dirName];
  if (
    spaceAvailable + directorySize >= UPDATE_SPACE_NEEDED &&
    directorySize < smallestDeletion
  ) {
    smallestDeletion = directorySize;
  }
}

console.log(smallestDeletion);
