import readDatabase from '../utils';

export default class StudentsController {
  static async getAllStudents(request, response) {
    try {
      const data = await readDatabase(process.argv[2]);
      const fields = Object.keys(data);

      let message = 'This is the list of our students\n';
      fields.forEach((field) => {
        const students = data[field];
        message += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
      });

      response.status(200).send(message.trim());
    } catch (error) {
      response.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(request, response) {
    const major = request.params.major;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
    } else {
      try {
        const data = await readDatabase(process.argv[2]);
        const students = data[major] || [];
        response.status(200).send(`List: ${students.join(', ')}`);
      } catch (error) {
        response.status(500).send('Cannot load the database');
      }
    }
  }
}
