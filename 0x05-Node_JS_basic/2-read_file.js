const fs = require('fs');

function countStudents(path) {
  const students = {};
  let totalStudents = 0;

  try {
    const fileContents = fs.readFileSync(path, 'utf-8');
    const lines = fileContents.split('\n');

    // Skip the header line (first line)
    const dataLines = lines.slice(1);

    dataLines.forEach((line) => {
      if (line.trim() !== '') {
        const [firstName, , , field] = line.split(',');

        if (firstName !== '' && field !== '') {
          totalStudents += 1;

          if (students[field]) {
            students[field].push(firstName);
          } else {
            students[field] = [firstName];
          }
        }
      }
    });

    console.log(`Number of students: ${totalStudents}`);

    Object.entries(students).forEach(([field, names]) => {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    });
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
