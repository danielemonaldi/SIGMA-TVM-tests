const { uploadTestReport } = require('./utility.js');

const filePath = process.argv[2];

if (!filePath) {
  console.error('You must specify the path to the report file as an argument.');
  process.exit(1);
}

uploadTestReport(filePath);