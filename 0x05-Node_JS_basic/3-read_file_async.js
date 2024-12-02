const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    const students = {};
    let totalStudents = 0;

    fs.readFile(path, 'utf-8', (error, fileContents) => {
      if (error) {
        // Handle error by rejecting the promise
        reject(new Error('Cannot load the database'));
      } else {
        // Process the file contents if no error
        const lines = fileContents.split('\n');
        const dataLines = lines.slice(1); // Skip the header

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

        // Resolve the promise after successful processing
        resolve();
      }
    });
  });
}

module.exports = countStudents;
