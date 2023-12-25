const nlp = require("compromise");

function isPersonName(sentence) {
  const doc = nlp(sentence);

  // Mencari entitas nama orang
  const persons = doc.people().out("array");

  return persons.length > 0;
}

// Contoh penggunaan
const text = "thor";
if (isPersonName(text)) {
  console.log("Nama orang ditemukan.");
} else {
  console.log("Tidak ada nama orang.");
}
