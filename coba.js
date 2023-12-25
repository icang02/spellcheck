const fs = require("fs");

// input new word
const inputArray = ["perusahaan", "mengatur", "kehadiran", "dipertimbangkan"];

const combineArray = [...inputArray, ...require("./kamus/kamus")].sort((a, b) => a.localeCompare(b));

const inputArrayUnique = [...new Set(combineArray)];

const kamusJson = JSON.stringify(inputArrayUnique, null, 2);

fs.writeFileSync("inputKamus.js", `module.exports = ${kamusJson}`, "utf-8");

setTimeout(() => {
  fs.writeFileSync("kamus/kamus.js", `module.exports = ${kamusJson}`, "utf-8");

  console.log("success...");
}, 2000);
