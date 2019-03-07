const reedRowFromExcelSheet = (sheet, currentRow, fieldMap) => {
  const mappingArray = Object.entries(fieldMap);
  const row = {};

  mappingArray.forEach((currentFieldarray) => {
    const key = currentFieldarray[0];
    const currentcolumn = currentFieldarray[1];
    if (!sheet[currentcolumn + currentRow]) row[key] = 'blank cell';
    else row[key] = sheet[currentcolumn + currentRow].v;
  });

  return row;
};

exports.getArrayFromExcelSheet = (sheet, firstRowNumber, lastRowNumber, fieldMap) => {
  const rows = [];
  for (let i = firstRowNumber; i <= lastRowNumber; i += 1) {
    rows.push(i);
  }

  return rows.map(currentRow => reedRowFromExcelSheet(sheet, currentRow, fieldMap));
};
