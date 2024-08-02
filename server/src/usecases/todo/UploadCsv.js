const TodoRepository = require('../../infrastructure/data/TodoRepository');
const csvParser = require('csv-parser');
const fs = require('fs');
const { Parser } = require('json2csv');

class UploadCsv {
  async execute(filePath) {
    const results = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          fs.unlinkSync(filePath);

          try {
            await TodoRepository.createMany(results);
            resolve(results);
          } catch (error) {
            reject(new Error('Error saving todos to the database'));
          }
        })
        .on('error', (error) => {
          reject(new Error('Error processing file'));
        });
    });
  }
}

module.exports = new UploadCsv();
