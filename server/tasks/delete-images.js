const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, './../../uploads'), (err, files) => {
  files.forEach((file) => {

    const absolutePath = path.join(__dirname, './../../uploads/', file);
    fs.unlinkSync(absolutePath);

  });

  console.log('Done deleting uploaded images');
});