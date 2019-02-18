function makeTasksArray(data, currentStudent) {
  return data.map((object) => {
    if (currentStudent === object.studentNickName) return object.taskName;
    return false;
  }).filter(task => task !== false);
}


function makeTableData(data) {
  const students = {};

  data.forEach((row) => {
    const currentStudent = row.studentNickName;
    if (!students.currentStudent) {
      Object.assign(students, { [currentStudent]: makeTasksArray(data, currentStudent) });
    }
  });

  return students;
}

module.exports = makeTableData;
