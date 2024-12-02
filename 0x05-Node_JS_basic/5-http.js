const http = require('http');
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

        let result = `Number of students: ${totalStudents}\n`;

        Object.entries(students).forEach(([field, names]) => {
          result += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
        });

        // Resolve the promise after successful processing
        resolve(result.trim());
      }
    });
  });
}

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.writeHead(200);
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.writeHead(200);
    res.write('This is the list of our students\n');

    const databaseFile = process.argv[2];

    countStudents(databaseFile)
      .then((data) => {
        res.end(data);
      })
      .catch((error) => {
        res.end(error.message);
      });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

app.listen(1245);

module.exports = app;
