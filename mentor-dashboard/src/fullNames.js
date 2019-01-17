// =============================== Third Doc ==================

// const fullNameWorkBook = XLSX.readFile('src/data/Mentor-students pairs.xlsx');
// const fullNameRowsQuantity = 791;
// const firstfullNameRowNumber = 2;
// const fullNameSheetTitle = 'pairs';

// const getFullName = (sheet, currentRow) => {
//   const fieldMapping = {
//     fullName: 'A',
//     studentNickName: 'B',
//   };

//   const fullName = {
//     name: sheet[fieldMapping.fullName + currentRow].v,
//     taskStatus: sheet[fieldMapping.studentNickName + currentRow].v,
//   };

//   return fullName;
// };

// const getFullNames = (sheet) => {
//   const rows = [];
//   for (let i = firstfullNameRowNumber; i <= fullNameRowsQuantity; i++) {
//     rows.push(i);
//   }

//   return rows.map(row => getFullName(sheet, row));
// };

// const FullNames = getFullNames(fullNameWorkBook.Sheets[fullNameSheetTitle]);
// console.log(FullNames);
