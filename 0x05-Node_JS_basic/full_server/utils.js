import fs from 'fs';

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    const students = {};

    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      }
      const lines = data.split('\n');
      const dataLines = lines.slice(1);

      dataLines.forEach((line) => {
        if (line.trim() !== '') {
          const [firstName, , , field] = line.split(',');

          if (firstName && field) {
            if (!students[field]) {
              students[field] = [];
            }
            students[field].push(firstName);
          }
        }
      });

      resolve(students);
    });
  });
}

export default readDatabase;
