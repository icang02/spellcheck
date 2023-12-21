export function damerauLevenshteinDistance(str1, str2) {
  let lenStr1 = str1.length + 1;
  let lenStr2 = str2.length + 1;

  // Inisialisasi matriks dengan nilai 0
  let matrix = [];
  for (let i = 0; i < lenStr1; i++) {
    matrix[i] = [];
    for (let j = 0; j < lenStr2; j++) {
      matrix[i][j] = 0;
    }
  }

  // Inisialisasi baris pertama dan kolom pertama
  for (let i = 0; i < lenStr1; i++) {
    matrix[i][0] = i;
  }
  for (let j = 0; j < lenStr2; j++) {
    matrix[0][j] = j;
  }

  // Mengisi matriks
  for (let i = 1; i < lenStr1; i++) {
    for (let j = 1; j < lenStr2; j++) {
      let cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // Deletion
        matrix[i][j - 1] + 1, // Insertion
        matrix[i - 1][j - 1] + cost // Substitution
      );

      if (i > 1 && j > 1 && str1[i - 1] === str2[j - 2] && str1[i - 2] === str2[j - 1]) {
        matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + cost); // Transposition
      }
    }
  }

  return matrix[lenStr1 - 1][lenStr2 - 1];
}
