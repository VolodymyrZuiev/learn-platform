// generate-structure.js
import fs from "fs";
import path from "path";

const tutorialsDir = "./tutorials";
const outputFile = "./structure.json";

function getStructure(dir) {
  const result = {};
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      result[item.name] = getStructure(fullPath);
    } else if (item.name.endsWith(".pdf")) {
      if (!result._files) result._files = [];
      result._files.push(item.name);
    }
  }
  return result;
}

const structure = getStructure(tutorialsDir);
fs.writeFileSync(outputFile, JSON.stringify(structure, null, 2));
console.log("✅ structure.json создан успешно!");
